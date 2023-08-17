import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import styles from "./activitylogs.module.scss";

const ActivityLogs: React.FC = () => {
  const followers = useSelector((state: RootState) => state.followers);
  const followerHistory = useSelector(
    (state: RootState) => state.followerHistory
  );
  const [previousCounts, setPreviousCounts] = useState<{
    [platform: string]: number;
  }>({});

  useEffect(() => {
    setPreviousCounts(followers);
  }, [followers]);

  const generateLogMessages = () => {
    const logMessages: string[] = [];

    followerHistory.forEach(({ platform, count, timestamp }) => {
      const prevCount = previousCounts[platform] || 0;
      if (prevCount !== count) {
        const logMessage = `Platform ${platform} went from ${count} followers to ${
          count - (count - prevCount)
        } followers at ${timestamp}`;
        logMessages.push(logMessage);
      }
    });

    return logMessages;
  };

  const logMessages = generateLogMessages();

  return (
    <div className={styles["tab2-content"]}>
      <h2>Activity Logs</h2>
      <div className={styles['checkbox-list-content']}>
        {logMessages.length > 0 ? (
          logMessages.map((logMessage, index) => (
            <div className={styles['list-item']}>
            <p key={index}>{logMessage}</p>
            </div>
          ))
        ) : (
          <>
            <p className={styles.logs}>There is no activity logs yet. </p>
            <p className={styles.logs}>
              {" "}
              Update a follower count to see some activity here.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
