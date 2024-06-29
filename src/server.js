import express from 'express';
import morgan from 'morgan';
import { getImageInfo } from './index.js';
import { authenticateUser } from './routes/auth.js';

const PORT = parseInt(process.env.PORT || config.port);
const HOST = process.env.IP || 'localhost';

const app = express()
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/photo', (req, res) => {
  const { name, password } = req.body;
  const userId = authenticateUser(name, password);

  if (!userId) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  return res.json(userId);
});

app.get('/photo', (req, res) => {
  const imageBase64 = req.query.imageBase64;

  const info = getImageInfo(imageBase64);

  return res.json(info);
});

app.use((req, res) => {
  const error = `
    404 Not found - This could be because:
      0. You have defined routes below (not above) this middleware in server.ts
      1. You have not implemented the route ${req.method} ${req.path}
      2. There is a typo in either your test or server, e.g. /posts/list in one
         and, incorrectly, /post/list in the other
      3. You are using ts-node (instead of ts-node-dev) to start your server and
         have forgotten to manually restart to load the new changes
      4. You've forgotten a leading slash (/), e.g. you have posts/list instead
         of /posts/list in your server.ts or test file
  `;
});

const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});