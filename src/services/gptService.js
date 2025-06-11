import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Add this to your .env file

export const summarizeOpportunity = async (opportunity, userProfile, language) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Bharat Voice Sahayak, an AI assistant that explains opportunities to people in simple language. Explain in ${language}.`
          },
          {
            role: 'user',
            content: `Simplify and explain this opportunity in a conversational way for a ${userProfile.age}-year-old ${userProfile.occupation} with education level ${userProfile.education}:\n\nTitle: ${opportunity.title}\n\nDescription: ${opportunity.description}\n\nDeadline: ${opportunity.deadline}\n\nExplain why this might be relevant to them based on their interests: ${userProfile.interests.join(', ')}`
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Sorry, I could not generate a summary at this time.';
  }
};