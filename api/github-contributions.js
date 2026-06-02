/* global process */

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'NilupulNishan';
const CACHE_TTL_MS = 1000 * 60 * 60 * 3;

let cachedResponse = null;
let cachedAt = 0;

const contributionQuery = `
  query GitHubContributions($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      createdAt
      contributionsCollection(from: $from, to: $to) {
        restrictedContributionsCount
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          months {
            name
            year
            firstDay
            totalWeeks
          }
          weeks {
            firstDay
            contributionDays {
              date
              weekday
              contributionCount
              color
            }
          }
        }
        commitContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
            owner {
              login
            }
          }
          contributions {
            totalCount
          }
        }
        pullRequestContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
            owner {
              login
            }
          }
          contributions {
            totalCount
          }
        }
        pullRequestReviewContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
            owner {
              login
            }
          }
          contributions {
            totalCount
          }
        }
      }
    }
  }
`;

async function fetchContributionRange(token, from, to) {
  const githubResponse = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'nilupul-nishan-portfolio',
    },
    body: JSON.stringify({
      query: contributionQuery,
      variables: {
        username: GITHUB_USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  const result = await githubResponse.json();

  if (!githubResponse.ok || result.errors?.length) {
    throw new Error(result.errors?.[0]?.message || 'GitHub contribution request failed.');
  }

  const user = result.data?.user || null;
  const collection = user?.contributionsCollection || null;
  const calendar = collection?.contributionCalendar || null;

  if (!user || !collection || !calendar) {
    throw new Error('Contribution calendar was not returned by GitHub.');
  }

  return {
    user,
    collection,
    calendar,
  };
}

async function fetchFullContributionTotal(token, createdAt, to) {
  const createdDate = new Date(createdAt);
  const ranges = [];
  let rangeEnd = new Date(to);

  while (rangeEnd > createdDate) {
    const rangeStart = new Date(rangeEnd);
    rangeStart.setFullYear(rangeStart.getFullYear() - 1);

    if (rangeStart < createdDate) {
      rangeStart.setTime(createdDate.getTime());
    }

    ranges.push({ from: rangeStart, to: rangeEnd });
    rangeEnd = rangeStart;
  }

  const yearlyContributionCounts = [];
  let totalContributions = 0;

  for (const range of ranges) {
    const { calendar } = await fetchContributionRange(token, range.from, range.to);
    totalContributions += calendar.totalContributions || 0;
    yearlyContributionCounts.push({
      from: range.from.toISOString(),
      to: range.to.toISOString(),
      totalContributions: calendar.totalContributions || 0,
    });
  }

  return {
    totalContributions,
    yearlyContributionCounts: yearlyContributionCounts.reverse(),
  };
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate=86400');
  response.end(JSON.stringify(payload));
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    sendJson(response, 503, {
      error: 'GITHUB_TOKEN is not configured.',
      totalContributions: null,
      contributionCalendar: null,
      lastUpdated: null,
    });
    return;
  }

  const now = Date.now();

  if (cachedResponse && now - cachedAt < CACHE_TTL_MS) {
    sendJson(response, 200, cachedResponse);
    return;
  }

  try {
    const to = new Date();
    const from = new Date(to);
    from.setFullYear(from.getFullYear() - 1);

    const { user, collection, calendar } = await fetchContributionRange(token, from, to);
    const fullContributionSummary = await fetchFullContributionTotal(token, user.createdAt, to);

    if (process.env.NODE_ENV !== 'production') {
      const repoBreakdown = {
        commits: collection.commitContributionsByRepository?.map((item) => ({
          repository: item.repository.nameWithOwner,
          owner: item.repository.owner.login,
          count: item.contributions.totalCount,
        })) || [],
        pullRequests: collection.pullRequestContributionsByRepository?.map((item) => ({
          repository: item.repository.nameWithOwner,
          owner: item.repository.owner.login,
          count: item.contributions.totalCount,
        })) || [],
        reviews: collection.pullRequestReviewContributionsByRepository?.map((item) => ({
          repository: item.repository.nameWithOwner,
          owner: item.repository.owner.login,
          count: item.contributions.totalCount,
        })) || [],
      };

      console.info('GitHub contribution repositories for NilupulNishan:', repoBreakdown);
    }

    cachedResponse = {
      username: GITHUB_USERNAME,
      totalContributions: fullContributionSummary.totalContributions,
      lastYearContributions: calendar.totalContributions,
      publicContributions: fullContributionSummary.totalContributions,
      restrictedContributionsCount: collection.restrictedContributionsCount,
      totals: {
        commits: collection.totalCommitContributions,
        issues: collection.totalIssueContributions,
        pullRequests: collection.totalPullRequestContributions,
        pullRequestReviews: collection.totalPullRequestReviewContributions,
      },
      contributionCalendar: calendar,
      range: {
        accountCreatedAt: user.createdAt,
        from: from.toISOString(),
        to: to.toISOString(),
      },
      yearlyContributionCounts: fullContributionSummary.yearlyContributionCounts,
      lastUpdated: new Date().toISOString(),
    };
    cachedAt = now;

    sendJson(response, 200, cachedResponse);
  } catch (error) {
    sendJson(response, 502, {
      error: error.message || 'Unable to fetch GitHub contribution data.',
      totalContributions: null,
      contributionCalendar: null,
      lastUpdated: null,
    });
  }
}
