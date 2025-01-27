import React, { FC, useEffect, useState } from 'react';
import './Logs.css';
import LogsService from './LogsService';
import { Log } from './Log.model';

interface LogsProps {}

const Logs: FC<LogsProps> = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(false);

  const fetchLogs = async () => {
    try {
      const logsData = await LogsService.getAllLogs();
      setLogs(logsData);
    } catch (err) {
      setError('Error fetching logs. Please try again later.');
    }
  };

  useEffect(() => {
    if (isAutoRefreshing) {
      const interval = setInterval(() => {
        fetchLogs();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAutoRefreshing]);

  const toggleAutoRefresh = () => {
    setIsAutoRefreshing((prev) => !prev);
  };

  return (
    <div className="Logs">
      <h1>Logs</h1>
      <div className="controls">
        <button onClick={fetchLogs}>Refresh</button>
        <button className={`auto-refresh-button ${isAutoRefreshing ? 'active' : ''}`} onClick={toggleAutoRefresh}>
          {isAutoRefreshing ? (
            <span className="loading-icon">🔄</span>
          ) : (
            <span className="loading-icon">⏸️</span>
          )}
          Auto Refresh
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="logs-container">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} className="log-card">
              <h3>{log.title}</h3>
              <p>{log.body}</p>
              <small>{new Date(log.dateTime).toLocaleString(undefined, { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}</small>
            </div>
          ))
        ) : (
          <p>No logs available.</p>
        )}
      </div>
    </div>
  );
};

export default Logs;