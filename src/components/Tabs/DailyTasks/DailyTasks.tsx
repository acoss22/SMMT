import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./dailytasks.module.scss";
import { RootState } from "../../../store/store";
import { toggleTaskChecked, updateTasks } from "../../../store/reducer";
import { Auth, Logger } from "aws-amplify";
import awsconfig from "../../../aws-exports";
import AWS from "aws-sdk";

Auth.configure(awsconfig);

const logger = new Logger("DailyTasks");

interface Task {
  id: string;
  description: string;
  isChecked: boolean;
}

const DailyTasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleTaskToggle = (taskId: string) => {
    dispatch(toggleTaskChecked(taskId));
  };

  const fetchUserTasks = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      const userEmail = user.attributes.email;

      // Use Amplify's Auth to get user credentials
      const credentials = await Auth.currentCredentials();

      // Use the credentials to make AWS SDK calls
      const lambda = new AWS.Lambda({
        credentials: Auth.essentialCredentials(credentials),
        region: awsconfig.aws_project_region,
      });

      const params = {
        FunctionName: "getTasksFromUsername",
        InvocationType: "RequestResponse",
        Payload: JSON.stringify({ email: userEmail }),
      };

      try {
        const response = await lambda.invoke(params).promise();

        if (response.Payload !== undefined) {
          const payloadString = response.Payload.toString();

          try {
            const payload = JSON.parse(payloadString); // Parse the JSON string
            const tasksData = JSON.parse(payload.body); // Parse the tasks data from the body

            console.log("parsed tasksData:", tasksData); // Log the parsed tasks data

            if (Array.isArray(tasksData)) {
              dispatch(updateTasks(tasksData));
              setFetchError(null);
            } else {
              setFetchError("Received unexpected data format.");
            }
          } catch (parseError) {
            setFetchError("Error parsing response data.");
          }
        } else {
          setFetchError("Response payload is missing or empty.");
        }
      } catch (error) {
        logger.error("Error retrieving tasks:", error);
        setFetchError("Error retrieving tasks.");
      }
    } catch (error) {
      logger.error("Error fetching user:", error);
      setFetchError("Error fetching user.");
    }

    setIsLoading(false); // Mark loading as complete
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  return (
    <div className={styles["tab2-content"]}>
      <h2>Tasks</h2>
      <div className={styles.tasksContainer}>
        {isLoading ? (
          <div>Loading...</div>
        ) : fetchError ? (
          <div>{fetchError}</div>
        ) : (
          tasks.map(
            (task: Task) => (
              <div key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={() => handleTaskToggle(task.id)}
                />
                <span>{task.description}</span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default DailyTasks;
