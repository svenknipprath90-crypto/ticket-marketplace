const axios = require('axios');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    const { paymentId, action, txid } = JSON.parse(event.body);
    const apiKey = process.env.PI_API_KEY;

    try {
        if (action === 'approve') {
            await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {}, {
                headers: { Authorization: `Key ${apiKey}` }
            });
            return { statusCode: 200, body: JSON.stringify({ message: "Approved" }) };
        } else if (action === 'complete') {
            await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/complete`, { txid }, {
                headers: { Authorization: `Key ${apiKey}` }
            });
            return { statusCode: 200, body: JSON.stringify({ message: "Completed" }) };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
