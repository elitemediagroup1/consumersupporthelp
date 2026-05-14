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
    const { message, city, service } = JSON.parse(event.body);

    if (!message || message.length < 3) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message too short' })
      };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 150,
        system: 'You are a helpful pest control advisor for consumersupporthelp.com. Help homeowners identify pests and understand next steps. Keep responses under 80 words. Start with Based on your description. Identify the likely pest. Give one actionable next step. Mention getting a professional quote at the end. Never guarantee outcomes. Never name specific companies. Do not mention disease names. Be calm and helpful. City context: ' + (city || 'not specified'),
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: data.content[0].text
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Service unavailable' })
    };
  }
};
