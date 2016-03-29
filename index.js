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


app.post('/invoice', function (req, res) {
  qbo.createInvoice(req.body, function invoiceCreated() {
    res.sendStatus(201);
  });
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});