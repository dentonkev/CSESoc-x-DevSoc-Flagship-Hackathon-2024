import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { getImageInfo } from './index.js';
import bodyParser from 'body-parser';

const PORT = 3200;
const HOST = 'localhost';

const app = express()

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/photo', async (req, res) => {
  const imageBase64 = req.query.imageBase64;
  const info = await getImageInfo(imageBase64);
  res.send(info);
});

app.post('/photo', async (req, res) => {
  const { imageBase64 } = req.body;
  
  if (!imageBase64) {
    return res.status(400).send('Image base64 data is required.');
  }

  try {
    const info = await getImageInfo(imageBase64);
    res.send(info);
  } catch (error) {
    res.status(500).send('Error processing image.');
  }
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
  res.status(404).send(error);
});

const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});