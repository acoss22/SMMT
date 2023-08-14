import React from 'react';
import styles from './dailytasks.module.scss';

interface TasksProps {
  postTweetDaily: boolean;
  setPostTweetDaily: (value: boolean) => void;
}

const Tasks: React.FC<TasksProps> = ({ postTweetDaily, setPostTweetDaily }) => {
  return (
    <div className={styles['tab2-content']}>
      <h2>Tasks</h2>
      <label className={styles['task-checkbox-label']}>
        <input
          type="checkbox"
          className={styles['task-checkbox']}
          checked={postTweetDaily}
          onChange={e => setPostTweetDaily(e.target.checked)}
        />
        Post 1 tweet daily
      </label>
    </div>
  );
};

export default Tasks;
