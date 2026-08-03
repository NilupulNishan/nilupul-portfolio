/* global process, Buffer */

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function localApiRoutes() {
  const routes = {
    '/api/github-contributions': () => import('./api/github-contributions.js'),
    '/api/testimonials': () => import('./api/testimonials.js'),
    '/api/testimonial-delete': () => import('./api/testimonial-delete.js'),
  }

  // Vercel pre-parses request.body for POSTs; this middleware passes the raw Node
  // request straight through, so without this a handler reading request.body works
  // in production and gets undefined locally. GET-only routes never noticed.
  function readJsonBody(request) {
    return new Promise((resolve, reject) => {
      const chunks = []
      request.on('data', (chunk) => chunks.push(chunk))
      request.on('error', reject)
      request.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8')
        if (!raw) {
          resolve(undefined)
          return
        }
        try {
          resolve(JSON.parse(raw))
        } catch {
          reject(new SyntaxError('Request body is not valid JSON.'))
        }
      })
    })
  }

  return {
    name: 'local-api-routes',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = request.url?.split('?')[0]
        const loadRoute = routes[pathname]

        if (!loadRoute) {
          next()
          return
        }

        if (request.method !== 'GET' && request.method !== 'HEAD') {
          const contentType = request.headers['content-type'] || ''
          if (contentType.includes('application/json')) {
            try {
              request.body = await readJsonBody(request)
            } catch {
              // A malformed body is a client error, not a crashed route.
              response.statusCode = 400
              response.setHeader('Content-Type', 'application/json; charset=utf-8')
              response.end(JSON.stringify({ error: 'Request body is not valid JSON.' }))
              return
            }
          }
        }

        try {
          const route = await loadRoute()
          await route.default(request, response)
        } catch (error) {
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.end(JSON.stringify({ error: error.message || 'Local API route failed.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  for (const [key, value] of Object.entries(env)) {
    if (!process.env[key]) {
      process.env[key] = value
    }
  }

  return {
    plugins: [localApiRoutes(), react(), tailwindcss()],
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  }
})
