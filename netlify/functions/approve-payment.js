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
    // Wir schauen, ob wir nur genehmigen oder direkt abschließen sollen
    const action = body.action || 'approve'; 
    
    const apiKey = "s6afxximhrdrhci5jayyntvewmkddzictz0h5pis8bq1pxsofr8vthnllt9yvh9k";

    console.log(`${action.toUpperCase()} für ID: ${paymentId}`);

    // Pi API Aufruf (entweder /approve oder /complete)
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/${action}`,
      {},
      { headers: { 'Authorization': `Key ${apiKey}` } }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Success", action: action, data: response.data })
    };
  } catch (error) {
    console.error("Fehler:", error.response ? error.response.data : error.message);
    return {
      statusCode: 200, // Wir bleiben bei 200, um den Browser-Prozess nicht zu killen
      headers,
      body: JSON.stringify({ error: "Operation failed" })
    };
  }
};
