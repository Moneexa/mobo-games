var express = require('express');
var config = require('./stripe.config.json');
const stripe = require('stripe')(config.private_key);

var router = express.Router();
router.get('/payment/intents', createPaymentIntent);
router.post('/payment-request', createSubscription)

stripe.applePayDomains.create({
  domain_name: 'mobovault.com'
});

async function createPaymentIntent(req, res) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: config.line_item_details.amount,
      currency: 'usd',
    });
    res.status(200).send(paymentIntent.client_secret);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

async function createSubscription(req, res) {
  const token = req.body.token;
  const email = req.body.email;
  if (!token && !email) return res.status(400).send("Token and email is requried");
  stripe.customers.create({
    description: 'My Test Customer (created for API docs)',
    source: token,
    email: email
  }, function (err, customer) {
    if (err) return res.status(500).send("Unable to create a customer");
    stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [{ plan: 'plan_GiqL6pBuHASVgd' }],
        cancel_at_period_end: true
      },
      function (err, subscription) {
        if (err) return res.status(500).send("Unable to create a trial");
        // now we are going for weekly subscription
        stripe.subscriptions.create(
          {
            customer: customer.id,
            items: [{ plan: 'plan_GiqMoJPFZ0Cgl5' }],
            trial_period_days: 3
          },
          function (err, subscription) {
            if (err) return res.status(500).send("Unable to create a Weekly subscription");
            return res.status(200).send("Successfull")
          }
        );
      }
    );
  })
}
// stripe.tokens.create(
//   {
//     card: {
//       number: '4242424242424242',
//       exp_month: 2,
//       exp_year: 2021,
//       cvc: '314',
//     },
//   },
//   function(err, token) {
//     console.log(token)
//   }
// );
// async function createCheckoutSession(req, res) {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         name: config.line_item_details.name,
//         description: config.line_item_details.description,
//         // images: config.line_item_details.images,
//         amount: 100,
//         currency: config.line_item_details.currency,
//         quantity: config.line_item_details.quantity,
//       }],
//       success_url: 'http://45.76.237.179/login?session_id={CHECKOUT_SESSION_ID}',
//       cancel_url: 'http://45.76.237.179/signup',
//     });
//     res.send(session);
//   } catch (err) {
//     console.error(err)
//     res.status(500).send("Something went wrong while creating the session");
//   }

// }



module.exports = router;
