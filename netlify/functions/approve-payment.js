const axios = require('axios');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };

  try {
    const { paymentId, action } = JSON.parse(event.body);
    const apiKey = "s6afxximhrdrhci5jayyntvewmkddzictz0h5pis8bq1pxsofr8vthnllt9yvh9k";
    
    // Wir erzwingen 'complete', wenn wir aufräumen wollen
    const targetAction = action === 'complete' ? 'complete' : 'approve';
    
    console.log(`Sende ${targetAction} für ID: ${paymentId}`);

    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/${targetAction}`,
      {},
      { headers: { 'Authorization': `Key ${apiKey}` } }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "success", data: response.data })
    };
  } catch (error) {
    // Auch wenn es fehlschlägt (weil z.B. schon erledigt), geben wir 200 zurück,
    // damit das Frontend nicht abstürzt
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "info", message: error.message })
    };
  }
};
