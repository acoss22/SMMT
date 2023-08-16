import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './dailytasks.module.scss';
import { RootState } from 'store/store';
import { toggleTaskChecked } from '../../../store/reducer';

const DailyTasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const handleTaskToggle = (taskId: string) => {
    dispatch(toggleTaskChecked(taskId)); // Add this dispatch to toggle isChecked value
  };

  return (
    <div className={styles['tab2-content']}>
      <h2>Tasks</h2>
      <div className={styles['checkbox-list-content']}>
        {tasks.map(task => (
          <div className={styles['list-item']} key={task.id}>
            <label className={styles['task-checkbox-label']}>
              <input
                type="checkbox"
                className={styles['task-checkbox']}
                checked={task.isChecked}
                onChange={() => handleTaskToggle(task.id)}
              />
              {task.description}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyTasks;
