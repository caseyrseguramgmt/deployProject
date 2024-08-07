import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.listen(3000, () => {
  console.log('Server is running on at http://localhost:3000 ');
});