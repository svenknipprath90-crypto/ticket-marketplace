const axios = require('axios');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body);
    const paymentId = body.paymentId;
    
    // DEIN AKTUELLER API-KEY
    const apiKey = "s6afxximhrdrhci5jayyntvewmkddzictz0h5pis8bq1pxsofr8vthnllt9yvh9k";

    console.log("Genehmige Zahlung ID:", paymentId);

    // Pi API Aufruf zum Approve
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { 'Authorization': `Key ${apiKey}` } }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Approved", data: response.data })
    };
  } catch (error) {
    console.error("Fehler:", error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Approval failed" })
    };
  }
};
