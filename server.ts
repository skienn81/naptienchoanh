import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// In Cloud Run inside AI Studio container, internal NGINX reverse-proxy listens on 8080
// and forwards all client traffic to localhost:3000.
// If PORT is 8080 (Cloud Run env), we bind to 3000 to avoid EADDRINUSE crash.
const port = process.env.PORT && process.env.PORT !== '8080' ? Number(process.env.PORT) : 3000;

app.use(express.json());

// Health check endpoint for Cloud Run container probes
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist folder with proper cache
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1h',
  index: 'index.html'
}));

// All other GET requests serve index.html for SPA routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${port}`);
});

server.on('error', (err: any) => {
  console.error('Server listen error:', err);
});

