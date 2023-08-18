import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import moment from "moment";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import styles from './analytics.module.scss';
import { FollowerHistory } from '../../../store/reducer';

interface AggregatedData {
  timestamp: string;
  [platform: string]: number | string;
}

const Analytics: React.FC = () => {
  const followerHistory = useSelector(
    (state: RootState) => state.followerHistory
  );

  // Preprocess follower history data
  const aggregatedData: AggregatedData[] = followerHistory.reduce((accumulator, entry) => {
    const timestamp = moment(entry.timestamp, "M/D/YYYY, h:mm:ss A").format("MM/DD/YYYY, hh:mm A");

    const existingData = accumulator.find(data => data.timestamp === timestamp);
    if (existingData) {
      existingData[entry.platform] = entry.count;
    } else {
      const newData: AggregatedData = {
        timestamp,
        [entry.platform]: entry.count,
      };
      accumulator.push(newData);
    }

    return accumulator;
  }, [] as AggregatedData[]);

  return (
    <div className={styles["tab2-content"]}>
      <h2>Follower Count History</h2>
      <div className={styles["chart-container"]}>
        <LineChart width={800} height={400} data={aggregatedData}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Facebook" stroke="#8884d8" />
          <Line type="monotone" dataKey="Instagram" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Twitter" stroke="#ffc658" />
        </LineChart>
      </div>
    </div>
  );
};

export default Analytics;
