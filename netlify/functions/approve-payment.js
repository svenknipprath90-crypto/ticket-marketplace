const axios = require('axios');

exports.handler = async (event) => {
    // Netlify Functions brauchen diese Header für CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' };
    }

    const { paymentId, action, txid } = JSON.parse(event.body);
    const apiKey = process.env.PI_API_KEY;

    try {
        if (action === 'approve') {
            await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {}, {
                headers: { Authorization: `Key ${apiKey}` }
            });
            return { statusCode: 200, headers, body: JSON.stringify({ message: "Approved" }) };
        } 
        
        if (action === 'complete') {
            await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/complete`, { txid }, {
                headers: { Authorization: `Key ${apiKey}` }
            });
            return { statusCode: 200, headers, body: JSON.stringify({ message: "Completed" }) };
        }
    } catch (error) {
        console.error("Pi API Error:", error.response ? error.response.data : error.message);
        return { 
            statusCode: 500, 
            headers, 
            body: JSON.stringify({ error: "Fehler bei Pi API", details: error.message }) 
        };
    }
};
