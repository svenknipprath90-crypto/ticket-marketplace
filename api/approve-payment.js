const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { paymentId, action } = req.body;
    const apiKey = "s6afxximhrdrhci5jayyntvewmkddzictz0h5pis8bq1pxsofr8vthnllt9yvh9k";
    
    const targetAction = action === 'complete' ? 'complete' : 'approve';
    
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/${targetAction}`,
      {},
      { headers: { 'Authorization': `Key ${apiKey}` } }
    );

    res.status(200).json({ status: "success", data: response.data });
  } catch (error) {
    res.status(200).json({ status: "info", message: error.message });
  }
};
