const { setupRoutes } = require('./routes');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of the react app were connecting to
    credentials: true,
  })
);

const port = process.env.PORT || 8080;

app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
