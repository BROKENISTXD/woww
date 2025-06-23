import io from 'socket.io-client';

const URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

export const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
} as any);

// Add authentication token when connecting
socket.on('connect', () => {
  const token = localStorage.getItem('token');
  if (token) {
    socket.emit('authenticate', { token });
  }
});

export default socket;
