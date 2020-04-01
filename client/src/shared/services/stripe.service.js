import axios from 'axios';
const API_URL = '/api/stripe/payment-request';
var stripe = window.Stripe('pk_test_7KcdjMytjPnJPbHstpgnC8w800345oH5ss');

export function makeRequest() {
  return (axios.get(`${API_URL}`,
    { headers: { 'Content-Type': 'application/json' } }));
}

export function getClientSecret() {
  return axios.get("/api/stripe/payment/intents")
    .catch(error => {
      console.error(error)
    });
}

export function getPaymentRequest() {
  var paymentRequest = stripe.paymentRequest({
    // requiredShippingContactFields: ['phone'],
    // requiredShippingContactFields: ['email'],
    country: "US",
    currency: "usd",
    total: {
      label: "Trial For 3 Days",
      amount: 100,
    },
    requestPayerName: true,
    requestPayerEmail: true,
  });
  return paymentRequest;
}

export function getPaymentRequestButton(paymentRequest) {
  var elements = stripe.elements();
  var prButton = elements.create('paymentRequestButton', {
    paymentRequest: paymentRequest,
    style: {
      paymentRequestButton: {
        type: 'default',
        theme: 'dark',
        height: '3rem'
      },
    }
  });
  return prButton;
}


export async function processPayment(ev) {
  console.log(ev)
  const res = await getClientSecret()
  const clientSecret = res.data;
  // Confirm the PaymentIntent without handling potential next actions (yet).
  const confirmResult = await stripe.confirmCardPayment(
    clientSecret,
    { payment_method: ev.paymentMethod.id },
    { handleActions: false }
  );
  if (confirmResult.error) {
    // Report to the browser that the payment failed, prompting it to
    // re-show the payment interface, or show an error message and close
    // the payment interface.
    ev.complete('fail');
  } else {
    // Report to the browser that the confirmation was successful, prompting
    // it to close the browser payment method collection interface.
    ev.complete('success');
    // Let Stripe.js handle the rest of the payment flow.
    const result = await stripe.confirmCardPayment(clientSecret);
    if (result.error) {
      throw result.error;
    } else {
      return result;
    }
  }

}

export async function processToken(ev) {
  if (!ev.payerEmail) {
    alert('Unable to fetch email from Stripe, please try after some time');
    return;
  }
  let params = {
    token: ev.token.id,
    email: ev.payerEmail
  };
  // Send the token to your server to charge it!
  const res = await axios.post(`${API_URL}`, params)
  if (res.status === 200) {
    ev.complete('success');
    postback();
  } else {
    ev.complete('fail');
  }
}

async function postback() {
  const cid = new URLSearchParams(document.location.search).get("cid");
  try {
    await axios.get(`https://zerotrackr.com/click.php?cid=${cid}&event3=1"`);
  } catch (error) {
    console.error(error)
  }
}
