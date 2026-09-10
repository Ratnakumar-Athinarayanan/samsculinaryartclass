import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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

        try {
          if (urlObj.pathname === '/api/webinars') {
            const { default: webinarsHandler } = await import('./api/webinars.js');
            return webinarsHandler(req, res);
          }
          if (urlObj.pathname === '/api/registrations') {
            const { default: registrationsHandler } = await import('./api/registrations.js');
            return registrationsHandler(req, res);
          }
          if (urlObj.pathname === '/api/onboarding') {
            const { default: onboardingHandler } = await import('./api/onboarding.js');
            return onboardingHandler(req, res);
          }
          if (urlObj.pathname === '/api/upload') {
            const { default: uploadHandler } = await import('./api/upload.js');
            return uploadHandler(req, res);
          }
        } catch (err) {
          console.error('API middleware error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiDevServerPlugin()],
});
