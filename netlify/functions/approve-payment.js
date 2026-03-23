const axios = require('axios');

exports.handler = async (event) => {
  // Diese Header sind EXTREM wichtig für den Pi Browser
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Preflight-Check für Browser abfangen
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body);
    const paymentId = body.paymentId;
    const apiKey = "S6afxximhrdrhci5jayyntvewmkddzictz0h5pis8bq1pxsofr8vthnllt9yvh9k";

    if (!paymentId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "No paymentId" }) };
    }

    // Pi API aufrufen
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { 'Authorization': `Key ${apiKey}` } }
    );

    console.log("Pi API Success:", response.data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Approved", details: response.data })
    };
  } catch (error) {
    console.error("Approval Error:", error.response ? error.response.data : error.message);
    return {
      statusCode: 200, // Wir senden trotzdem 200, damit das Frontend nicht abstürzt
      headers,
      body: JSON.stringify({ error: "Backend failed but call was received" })
    };
  }
};
