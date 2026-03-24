const axios = require('axios');

exports.handler = async (event) => {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Preflight (wichtig für CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { paymentId, action, txid } = JSON.parse(event.body);

    const apiKey = process.env.PI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Missing API Key' })
      };
    }

    // ✅ APPROVE PAYMENT
    if (action === 'approve') {
      await axios.post(
        `https://api.minepi.com/v2/payments/${paymentId}/approve`,
        {},
        {
          headers: {
            Authorization: `Key ${apiKey}`
          }
        }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Payment approved' })
      };
    }

    // ✅ COMPLETE PAYMENT
    if (action === 'complete') {
      await axios.post(
        `https://api.minepi.com/v2/payments/${paymentId}/complete`,
        { txid },
        {
          headers: {
            Authorization: `Key ${apiKey}`
          }
        }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Payment completed' })
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid action' })
    };

  } catch (error) {
    console.error('PI ERROR:', error.response?.data || error.message);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.response?.data || error.message
      })
    };
  }
};
