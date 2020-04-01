import React from 'react';
import { connect } from 'react-redux';
import './signup.css'

import { getPaymentRequest, getPaymentRequestButton, processToken } from '../../shared/services/stripe.service'
import { useHistory } from "react-router-dom";
import { authenticate } from '../../shared/store/actions'

function Signup({ authenticate }) {
  const history = useHistory();
  const stripePayments = () => {
    const paymentRequest = getPaymentRequest();
    const prButton = getPaymentRequestButton(paymentRequest);
    paymentRequest.canMakePayment().then((result) => {
      if (result) {
        prButton.mount('#payment-request-button');
      } else {
        const paymentButtonRef = document.getElementById('payment-request-button')
        if (paymentButtonRef) {
          paymentButtonRef.classList.add("alert-danger");
          paymentButtonRef.innerHTML = 'The Payment Request requires a saved payment card with browser or Apple Pay or Google Pay.';
        }
      }
    });
    paymentRequest.on('token', (ev) => {
      processToken(ev)
        .then(result => {
          const expiry = new Date(2021, 12, 1);
          authenticate({ expiry: expiry, token: "Test 1234" })
          history.push('/games-list')
        })
        .catch(error => {
          console.error(error);
          alert("Unable to process payment")
        })
    });
    // paymentRequest.on('paymentmethod', (ev) => {
    //   processPayment(ev)
    //     .then(result => {
    //       setState({ isAuthenticated: true });
    //       localStorage.setItem('token', state);
    //       this.props.history.push('/games-list')
    //     })
    //     .catch(error => {
    //       alert("Unable to process payment")
    //     })
    // });

  }
  stripePayments();
  return (
    <div className="signup-component d-flex flex-column align-items-center justify-content-center text-center">
      <div className="title px-5">
        Start Your 3-Day Trial to Access Over 1,000 Games
                  </div>
      <div className="big-logo-container">
        <img src="/icon_2png.png" alt="Mobo-gamez" />
      </div>
      <div className="details my-3">
        Sign-up for the 3-day trial only $1 <br />
        then only $10/week
          </div>
      <div className="d-flex justify-content-center">
        <div id="payment-request-button"></div>
      </div>
    </div>
  )

}

const mapDispatchToProps = dispatch => ({
  authenticate: token => {
    dispatch(authenticate(token));
  }
});

export default connect(null, mapDispatchToProps)(Signup);
