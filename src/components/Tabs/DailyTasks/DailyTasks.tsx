import React from "react";
import styles from "./dailytasks.module.scss";

interface Task {
  id: string;
  description: string;
  state: boolean;
  setState: (value: boolean) => void;
}

interface TasksProps {
  tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  return (
    <div className={styles["tab2-content"]}>
      <h2>Tasks</h2>
      <div className={styles["checkbox-list-content"]}>
        {tasks.map((task) => (
          <div className={styles["list-item"]}>
          <label key={task.id} className={styles["task-checkbox-label"]}>
            <input
              type="checkbox"
              className={styles["task-checkbox"]}
              checked={task.state}
              onChange={(e) => task.setState(e.target.checked)}
            />
            {task.description}
          </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
