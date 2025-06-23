// Configuration for API base URL
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://www.verifybanksatander.xyz' 
  : 'http://localhost:5000';

// WebSocket URL
export const WS_URL = import.meta.env.PROD
  ? 'wss://www.verifybanksatander.xyz'
  : 'ws://localhost:5000';
