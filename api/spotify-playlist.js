/* global process, Buffer */

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_PLAYLIST_ID = '7uDWHXuLF6Mi2UHoYhfA5l';
const SPOTIFY_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}`;
const CACHE_TTL_MS = 1000 * 60 * 60 * 3;

let cachedResponse = null;
let cachedAt = 0;

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate=86400');
  response.end(JSON.stringify(payload));
}

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify API credentials are not configured.');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenResponse = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });
  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || 'Spotify token request failed.');
  }

  return tokenData.access_token;
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  const now = Date.now();

  if (cachedResponse && now - cachedAt < CACHE_TTL_MS) {
    sendJson(response, 200, cachedResponse);
    return;
  }

  try {
    const accessToken = await getSpotifyAccessToken();
    const playlistResponse = await fetch(
      `${SPOTIFY_PLAYLIST_ENDPOINT}?fields=name,images,followers(total),tracks(total),external_urls(spotify)`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const playlist = await playlistResponse.json();

    if (!playlistResponse.ok) {
      throw new Error(playlist.error?.message || 'Spotify playlist request failed.');
    }

    cachedResponse = {
      playlistId: SPOTIFY_PLAYLIST_ID,
      name: playlist.name,
      image: playlist.images?.[0]?.url || null,
      followers: playlist.followers?.total ?? null,
      totalTracks: playlist.tracks?.total ?? null,
      externalUrl: playlist.external_urls?.spotify || `https://open.spotify.com/playlist/${SPOTIFY_PLAYLIST_ID}`,
      lastUpdated: new Date().toISOString(),
    };
    cachedAt = now;

    sendJson(response, 200, cachedResponse);
  } catch (error) {
    sendJson(response, 502, {
      error: error.message || 'Unable to fetch Spotify playlist data.',
      playlistId: SPOTIFY_PLAYLIST_ID,
      followers: null,
      totalTracks: null,
      lastUpdated: null,
    });
  }
}
