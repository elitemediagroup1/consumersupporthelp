const Anthropic = require('@anthropic-ai/sdk');

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
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
    const systemPrompt = `You are a helpful pest control advisor for consumersupporthelp.com. 
You help homeowners identify pests and understand their next steps.
Rules:
- Keep responses under 80 words
- Start with "Based on your description..." 
- Identify the likely pest if possible
- Give one specific actionable next step
- Mention getting a professional quote naturally at the end
- Never guarantee outcomes
- Never name specific companies
- Do not mention diseases by name — say "can pose health risks"
- Be calm and helpful, not alarming
- If city is provided, reference local housing or climate context briefly
City context: ${city || 'not specified'}
Service: ${service || 'pest control'}`;
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 150,
      system: systemPrompt,
      messages: [{ role: 'user', content: message }]
    });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: response.content[0].text
      })
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Service unavailable' })
    };
  }
};
