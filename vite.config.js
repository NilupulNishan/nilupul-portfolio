/* global process */

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function localApiRoutes() {
  const routes = {
    '/api/github-contributions': () => import('./api/github-contributions.js'),
    '/api/spotify-playlist': () => import('./api/spotify-playlist.js'),
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
