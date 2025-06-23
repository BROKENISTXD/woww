import React, { useState } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    type: 'warning',
    message: 'Multiple failed login attempts detected from IP 192.168.1.100',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: false
  },
  {
    id: 2,
    type: 'critical',
    message: 'Possible brute force attack detected from IP 192.168.1.101',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: 3,
    type: 'info',
    message: 'System scan completed. No vulnerabilities detected.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true
  }
];

const SecurityAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: number) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => !alert.read);

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-800">Security Alerts</h2>
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'all' 
                ? 'bg-gray-200 text-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'unread' 
                ? 'bg-gray-200 text-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No alerts to display
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg flex items-start justify-between ${
                alert.read ? 'bg-gray-50' : 
                alert.type === 'critical' ? 'bg-red-50' :
                alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {alert.type === 'critical' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                  {alert.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    alert.type === 'critical' ? 'text-red-800' :
                    alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                  }`}>
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!alert.read && (
                  <button 
                    onClick={() => markAsRead(alert.id)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Mark as read"
                  >
                    <span className="sr-only">Mark as read</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}
                <button 
                  onClick={() => dismissAlert(alert.id)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Dismiss"
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecurityAlerts;