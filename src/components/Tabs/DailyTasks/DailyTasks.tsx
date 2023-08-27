import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./dailytasks.module.scss";
import { RootState } from "store/store";
import { toggleTaskChecked, updateTasks } from "../../../store/reducer"; // Assuming you have an updateTasks action
import { Auth, Logger } from "aws-amplify";
import awsconfig from "../../../aws-exports";

Auth.configure(awsconfig); // Configure Amplify

const logger = new Logger("DailyTasks");

const DailyTasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const handleTaskToggle = (taskId: string) => {
    dispatch(toggleTaskChecked(taskId));
  };

  const fetchUserTasks = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userID = user.username;
  
      // Use Amplify's Auth to get user credentials
      const credentials = await Auth.currentCredentials();
  
      // Use the credentials to make AWS SDK calls
      const AWS = require("aws-sdk");
      const lambda = new AWS.Lambda({
        credentials: Auth.essentialCredentials(credentials),
        region: awsconfig.aws_project_region,
      });
  
      const params = {
        FunctionName: "getTasksByUserID",
        InvocationType: "RequestResponse",
        Payload: JSON.stringify({ userID }),
      };
  
      try {
        const response = await lambda.invoke(params).promise();
        const payloadBlob = response.Payload as Blob;
        const payloadText = await payloadBlob.text();
  
        // Parse the payload as JSON
        const tasksData = JSON.parse(payloadText);
  
        // Assuming tasksData is an array of tasks, update the Redux store with tasks
        dispatch(updateTasks(tasksData)); // Replace with the correct action to update tasks
      } catch (error) {
        logger.error("Error retrieving tasks:", error);
      }
  
    } catch (error) {
      logger.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  return (
    <div className={styles["tab2-content"]}>
      {/* Your task list rendering */}
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.isChecked}
            onChange={() => handleTaskToggle(task.id)}
          />
          <span>{task.description}</span>
        </div>
      ))}
    </div>
  );
};

export default DailyTasks;
