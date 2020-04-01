const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser');
const StripeAPI = require('./api/stripe/stripe.controller');
// create new express app and save it as "app"
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
// server configuration
const PORT = 4242;
app.use(cors());
app.use('/api/stripe',StripeAPI);
// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
