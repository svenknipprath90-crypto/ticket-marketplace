const axios = require('axios');

exports.handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers, body: "Method Not Allowed" };
    }

    const { paymentId, action, txid } = JSON.parse(event.body);
    const apiKey = process.env.PI_API_KEY;

    try {
        // 🔥 APPROVE
        if (action === "approve") {
            await axios.post(
                `https://api.minepi.com/v2/payments/${paymentId}/approve`,
                {},
                {
                    headers: { Authorization: `Key ${apiKey}` }
                }
            );

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: "Approved" })
            };
        }

        // 🔥 COMPLETE (WICHTIG FIX)
        if (action === "complete") {
            await axios.post(
                `https://api.minepi.com/v2/payments/${paymentId}/complete`,
                { txid: txid || null },
                {
                    headers: { Authorization: `Key ${apiKey}` }
                }
            );

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: "Completed" })
            };
        }

    } catch (error) {
        console.error("PI ERROR:", error.response?.data || error.message);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.response?.data || error.message
            })
        };
    }
};
