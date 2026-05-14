const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const body = JSON.parse(event.body);
    const message = body.message;
    const city = body.city || 'not specified';

    if (!message || message.length < 3) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message too short' })
      };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    const systemPrompt = 'You are a helpful pest control advisor for consumersupporthelp.com. Help homeowners identify pests and next steps. Keep responses under 80 words. Start with Based on your description. Identify the likely pest. Give one actionable next step. Mention getting a professional quote. Never guarantee outcomes. Never name companies. Do not name diseases. Be calm and helpful. City context: ' + city;

    const requestBody = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      system: systemPrompt,
      messages: [{ role: 'user', content: message }]
    });

    const result = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch(e) {
            reject(new Error('Parse error'));
          }
        });
      });

      req.on('error', reject);
      req.write(requestBody);
      req.end();
    });

    if (!result.content || !result.content[0]) {
      console.error('API response:', JSON.stringify(result));
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'Unexpected API response' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: result.content[0].text
      })
    };
  } catch (error) {
    console.error('Function error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Service unavailable' })
    };
  }
};
