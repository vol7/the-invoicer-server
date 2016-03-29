require('dotenv').config();
var express = require('express');
var QuickBooks = require('node-quickbooks');
var app = express();

var consumerKey = process.env.CONSUMER_KEY;
var consumerSecret = process.env.CONSUMER_SECRET;
var oauthToken = process.env.OAUTH_TOKEN;
var oauthTokenSecret = process.env.OAUTH_TOKENSECRET;
var realmId = process.env.REALM_ID;

var qbo = new QuickBooks(consumerKey,
                         consumerSecret,
                         oauthToken,
                         oauthTokenSecret,
                         realmId,
                         true, // don't use the sandbox (i.e. for testing)
                         true); // turn debugging on

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "application/json");
  req.accepts('application/json');
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  next();
});


app.post('/invoice', function (req, res) {
  qbo.createInvoice(req.body, function invoiceCreated() {
    res.sendStatus(201);
  });
});

app.get('/customers', function (req, res) {
  qbo.findCustomers(function fetchedCustomers(e, customers) {
    res.send(customers)
  });
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});