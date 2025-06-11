import axios from 'axios';

const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY; // Add this to your .env file

// Map of Indian languages to voice IDs (you'll need to find appropriate voice IDs from ElevenLabs)
const languageVoiceMap = {
  'Hindi': 'voice_id_for_hindi',
  'Telugu': 'voice_id_for_telugu',
  'Tamil': 'voice_id_for_tamil',
  // Add more languages as needed
};

// Default voice if language not found
const DEFAULT_VOICE_ID = 'default_voice_id';

export const textToSpeech = async (text, language) => {
  try {
    const voiceId = languageVoiceMap[language] || DEFAULT_VOICE_ID;
    
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        responseType: 'arraybuffer'
      }
    );

    // Convert the response to a blob and create an audio URL
    const blob = new Blob([response.data], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(blob);
    return audioUrl;
  } catch (error) {
    console.error('Error calling ElevenLabs API:', error);
    return null;
  }
};