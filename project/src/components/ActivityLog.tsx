import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search, 
  XCircle 
} from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: Date;
  action: string;
  status: 'success' | 'warning' | 'error' | 'info';
  admin: string;
  ip: string;
  details?: Record<string, unknown>;
}

interface ActivityLogProps {
  className?: string;
  maxItems?: number;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ className = '', maxItems = 10 }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters] = useState({
    status: 'all' as const,
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: new Date(),
        action: 'User login',
        status: 'success',
        admin: 'admin@example.com',
        ip: '192.168.1.1',
        details: { method: 'email', device: 'Chrome on Windows' }
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        action: 'Password reset requested',
        status: 'warning',
        admin: 'user@example.com',
        ip: '192.168.1.2'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        action: 'Failed login attempt',
        status: 'error',
        admin: 'unknown',
        ip: '10.0.0.1',
        details: { reason: 'Invalid credentials', attempts: 3 }
      }
    ];

    // Simulate API call
    const timer = setTimeout(() => {
      setLogs(mockLogs);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredLogs = logs
    .filter(log => {
      const matchesSearch = 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.includes(searchTerm);

      const matchesFilter = 
        filters.status === 'all' || log.status === filters.status;

      return matchesSearch && matchesFilter;
    })
    .slice(0, maxItems);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) return `${interval}y`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval}mo`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}d`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}h`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}m`;
    return `${Math.floor(seconds)}s`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full divide-y divide-gray-200">
          {filteredLogs.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <li key={log.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getStatusIcon(log.status)}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {log.action}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{log.admin}</span>
                        <span className="mx-1">•</span>
                        <span>{log.ip}</span>
                        <span className="mx-1">•</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 text-gray-400 mr-1" />
                          {formatTimeAgo(log.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-4 text-center text-sm text-gray-500">
              No activity logs found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
