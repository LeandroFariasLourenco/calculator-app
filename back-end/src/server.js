const dotenv = require('dotenv');

dotenv.config({ path: '.env-local' });

const cors = require('cors');
const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const {
  history,
  calculate,
} = routes;

app.use('/history', history);
app.use('/calculate', calculate);

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
