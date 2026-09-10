import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webinarsHandler from './api/webinars.js';
import registrationsHandler from './api/registrations.js';
import onboardingHandler from './api/onboarding.js';
import uploadHandler from './api/upload.js';

function apiDevServerPlugin() {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        req.query = Object.fromEntries(urlObj.searchParams.entries());

        let statusCode = 200;
        res.status = (code) => {
          statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.statusCode = statusCode;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
          const chunks = [];
          req.on('data', (chunk) => { chunks.push(chunk); });
          await new Promise((resolve) => req.on('end', resolve));
          const bodyBuffer = Buffer.concat(chunks).toString('utf-8');
          try {
            req.body = bodyBuffer ? JSON.parse(bodyBuffer) : {};
          } catch (e) {
            req.body = {};
          }
        }

        if (urlObj.pathname === '/api/webinars') {
          return webinarsHandler(req, res);
        }
        if (urlObj.pathname === '/api/registrations') {
          return registrationsHandler(req, res);
        }
        if (urlObj.pathname === '/api/onboarding') {
          return onboardingHandler(req, res);
        }
        if (urlObj.pathname === '/api/upload') {
          return uploadHandler(req, res);
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiDevServerPlugin()],
});
