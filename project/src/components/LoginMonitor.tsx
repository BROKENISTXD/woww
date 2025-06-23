import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Shield } from 'lucide-react';

interface LoginMonitorProps {
  onNewAttempt: (attempt: any) => void;
}

const LoginMonitor: React.FC<LoginMonitorProps> = ({ onNewAttempt }) => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    successfulLogins: 0,
    failedLogins: 0,
    suspiciousActivities: 0
  });

  // Simulate monitoring activity
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Simulate receiving login attempts
      if (Math.random() > 0.7) {
        const newAttempt = {
          id: Date.now(),
          username: `user${Math.floor(Math.random() * 1000)}@example.com`,
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          timestamp: new Date().toISOString(),
          status: Math.random() > 0.3 ? 'pending' : 'suspicious',
          device: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)] + ' / ' + 
                 ['Windows', 'macOS', 'Linux', 'Android', 'iOS'][Math.floor(Math.random() * 5)]
        };
        
        onNewAttempt(newAttempt);
        
        setStats(prev => ({
          ...prev,
          totalAttempts: prev.totalAttempts + 1,
          suspiciousActivities: newAttempt.status === 'suspicious' ? prev.suspiciousActivities + 1 : prev.suspiciousActivities
        }));
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, [isMonitoring, onNewAttempt]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Login Monitor</h2>
        <div className="flex items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium mr-2 ${isMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {isMonitoring ? 'Active' : 'Paused'}
          </span>
          <button 
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${isMonitoring ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
          >
            {isMonitoring ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg flex items-center">
          <Activity className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-800">Total Attempts</h3>
            <p className="text-2xl font-bold">{stats.totalAttempts}</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg flex items-center">
          <Shield className="h-8 w-8 text-green-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Successful</h3>
            <p className="text-2xl font-bold">{stats.successfulLogins}</p>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg flex items-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Failed</h3>
            <p className="text-2xl font-bold">{stats.failedLogins}</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg flex items-center">
          <AlertTriangle className="h-8 w-8 text-yellow-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Suspicious</h3>
            <p className="text-2xl font-bold">{stats.suspiciousActivities}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Monitoring Status</h3>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${isMonitoring ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <p className="text-sm text-gray-600">
            {isMonitoring 
              ? 'Actively monitoring login attempts. New attempts will appear in real-time.' 
              : 'Monitoring paused. No new login attempts will be detected.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginMonitor;