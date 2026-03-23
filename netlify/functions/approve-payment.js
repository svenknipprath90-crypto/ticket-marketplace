const axios = require('axios');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body);
    const paymentId = body.paymentId;
    const apiKey = "S6afxximhrdrhci5jayyntvewmkddzictz0h5pis8bq1pxsofr8vthnllt9yvh9k";

    // Bestätigung an Pi senden
    await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {}, {
      headers: { 'Authorization': `Key ${apiKey}` }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Approved" })
    };
  } catch (error) {
    console.error("Error approving payment:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
