import io from 'socket.io-client';
import { WS_URL } from '../config';

export const socket = io(WS_URL, {
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
