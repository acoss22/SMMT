import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import styles from "./activitylogs.module.scss";

// Define the FollowerHistory interface
interface FollowerHistory {
  platform: string;
  prevCount: number;
  count: number;
  timestamp: string;
}

const ActivityLogs: React.FC = () => {
  const followers = useSelector((state: RootState) => state.followers);
  const followerHistory = useSelector(
    (state: RootState) => state.followerHistory
  );

  const [previousCounts, setPreviousCounts] = useState<{
    [platform: string]: {
      currentCount: number;
      history: FollowerHistory[];
    };
  }>({});
  
  useEffect(() => {
    const updatedPreviousCounts = {} as {
      [platform: string]: {
        currentCount: number;
        history: FollowerHistory[];
      };
    };
  
    Object.keys(followers).forEach((platform) => {
      updatedPreviousCounts[platform] = {
        currentCount: Number(followers[platform]) || 0, // Explicitly cast to number and use 0 as the default value
        history: [...(previousCounts[platform]?.history || [])],
      };
    });
  
    setPreviousCounts(updatedPreviousCounts);
  }, [followers, previousCounts]);
  const generateLogMessages = () => {
    const logMessages: string[] = [];

    followerHistory.forEach(({ platform, count, timestamp }) => {
      const { currentCount, history } = previousCounts[platform] || {
        currentCount: 0,
        history: [],
      };

      if (currentCount !== count) {
        const change = count - currentCount;
        const logMessage = `Platform ${platform} went from  ${
          currentCount + change
        } followers to ${currentCount} followers at ${timestamp}`;
        logMessages.push(logMessage);
      }
    });

    return logMessages;
  };

  const logMessages = generateLogMessages();

  return (
    <div className={styles["tab2-content"]}>
      <h2>Activity</h2>
      <div className={styles["checkbox-list-content"]}>
        {logMessages.length > 0 ? (
          logMessages.map((logMessage, index) => (
            <div className={styles["list-item"]} key={index}>
              <p>{logMessage}</p>
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
