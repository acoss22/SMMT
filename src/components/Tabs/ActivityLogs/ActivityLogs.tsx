import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const ActivityLogs: React.FC = () => {
  const followers = useSelector((state: RootState) => state.followers);
  const lastUpdated = useSelector((state: RootState) => state.lastUpdated);
  const followerHistory = useSelector((state: RootState) => state.followerHistory);

  const [previousCounts, setPreviousCounts] = useState<{ [platform: string]: number }>({});

  useEffect(() => {
    // Initialize previous follower counts when component mounts
    setPreviousCounts(followers);
  }, [followers]);

  const generateLogMessages = () => {
    const logMessages: string[] = [];

    // Iterate through follower history and generate log messages
    followerHistory.forEach(({ platform, count, timestamp }) => {
      const prevCount = previousCounts[platform] || 0;
      if (prevCount !== count) {
        const logMessage = `Platform ${platform} went from ${count} followers to ${count - (count - prevCount)} followers at ${timestamp}`;
        logMessages.push(logMessage);
      }
    });

    return logMessages;
  };

  return (
    <div>
      <h2>Activity Logs</h2>
      <div>
        {generateLogMessages().map((logMessage, index) => (
          <p key={index}>{logMessage}</p>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;
