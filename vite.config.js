import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  server: {
    port: 3005,
    host: true
  },
  plugins: [
    {
      name: 'super-admin-api-plugin',
      configureServer(server) {
        const eventsFile = path.resolve(__dirname, 'events.json');

        function readEvents() {
          try {
            if (!fs.existsSync(eventsFile)) return [];
            return JSON.parse(fs.readFileSync(eventsFile, 'utf8'));
          } catch (e) {
            return [];
          }
        }

        function writeEvents(events) {
          try {
            fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2), 'utf8');
            return true;
          } catch (e) {
            return false;
          }
        }

        server.middlewares.use((req, res, next) => {
          // 1. GET /api/events
          if (req.url === '/api/events' && req.method === 'GET') {
            const events = readEvents();
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(events));
          }

          // 2. POST /api/events (Create Event)
          if (req.url === '/api/events' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const newEvent = JSON.parse(body);
                const events = readEvents();
                if (!newEvent.id) newEvent.id = 'custom_' + Date.now();
                newEvent.isDefault = false;
                events.unshift(newEvent);
                writeEvents(events);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, events }));
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to add event' }));
              }
            });
            return;
          }

          // 3. PUT /api/events/:id (Update Event)
          if (req.url.startsWith('/api/events/') && req.method === 'PUT') {
            const id = req.url.split('/api/events/')[1];
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const updatedData = JSON.parse(body);
                const events = readEvents();
                const idx = events.findIndex(e => e.id === id);
                if (idx !== -1) {
                  events[idx] = { ...events[idx], ...updatedData };
                  writeEvents(events);
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, events }));
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to update event' }));
              }
            });
            return;
          }

          // 4. DELETE /api/events/:id (Global Delete for All Users)
          if (req.url.startsWith('/api/events/') && req.method === 'DELETE') {
            const id = req.url.split('/api/events/')[1];
            let events = readEvents();
            events = events.filter(e => e.id !== id);
            writeEvents(events);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, events }));
            return;
          }

          next();
        });
      }
    }
  ]
});
