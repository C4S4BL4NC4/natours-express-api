/* eslint-disable */

import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.10.0/esm/axios.js';
import { showAlert } from './alerts.mjs';

const STRIPE_PUBLIC_KEY =
  'pk_test_51SaNvZA8S1Vq0iQRsLIgkAoL2WJJoRddSgNXbWdYyYVekvVZyCSDXJMfzsrYjvo5AKW0v1x28melJRPUelicRtRB00DlOq64Mn';

const stripe = Stripe(STRIPE_PUBLIC_KEY);

export const bookTour = async (tourId) => {
  try {
    // 1  Get checkout session from endpoint
    const session = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    // console.log(session);
    // 2 Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
