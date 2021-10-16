import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import './Task.scss';

const Task = ({
  id,
  label,
  completed,
  date,
  filterType,
  onDeleted,
  onToggleEdit,
  onToggleCompleted,
  timerTimeMin,
  timerTimeSec,
  onNewTimerTime,
}) => {
  const [timeMin, setTimeMin] = useState(timerTimeMin);
  const [timeSec, setTimeSec] = useState(timerTimeSec);
  const [activTimer, setActivTimer] = useState(false);

  useEffect(() => {
    let interval = null;
    if (activTimer) {
      interval = setInterval(() => {
        if (timeMin === 0 && timeSec <= 0) {
          setActivTimer(false);
        } else {
          setTimeSec(timeSec - 1);
        }
    
        if (timeMin === 0 && timeSec === 1) {
          onNewTimerTime(id, timeMin, timeSec);
          setActivTimer(false);
          setTimeSec(timeSec - 1);
        }
    
        if (timeMin !== 0 && timeSec === 0) {
          setTimeMin(timeMin - 1);
          setTimeSec(59);
        }
      }, 1000);
    }
    if (!activTimer) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activTimer, id, onNewTimerTime, timeMin, timeSec]);



  const playTimer = () => {
    setActivTimer(true);
  };

  const stopTimer = () => {
    if (activTimer) {
      setActivTimer(false);
      onNewTimerTime(id, timeMin, timeSec);
    }
  };

  const classNameTask = classNames({
    task: true,
    'task-completed': completed,
    'task-none': (filterType === 'completed' && !completed) || (filterType === 'active' && completed),
  });

  const time = () => {
    const timeItem = formatDistanceToNow(new Date(date), { addSuffix: true, includeSeconds: true }).split(' ');
    return timeItem.filter((item) => item !== 'less' && item !== 'than').join(' ');
  };

  return (
    <li className={classNameTask}>
      <input className="task__toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
      <label className="task__ladel">
        <p className="task__ladel--description">{label}</p>
      </label>
      <span className="task__timer">
        <button type="button" aria-label="timer play" className="icon icon-play" onClick={() => playTimer()} />
        <button type="button" aria-label="timer pause" className="icon icon-pause" onClick={() => stopTimer()} />
        {timeMin}:{timeSec}
      </span>
      <p className="task__ladel--created">created {time()}</p>
      <button type="button" aria-label="edit" className="task__button edit" onClick={onToggleEdit} />
      <button type="button" aria-label="deleted" className="task__button destroy" onClick={onDeleted} />
    </li>
  );
};

Task.defaultProps = {
  id: 0,
  label: '',
  completed: false,
  date: '',
  filterType: '',
  onDeleted: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
  timerTimeMin: 0,
  timerTimeSec: 0,
  onNewTimerTime: () => {},
};

Task.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  completed: PropTypes.bool,
  date: PropTypes.string,
  filterType: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  timerTimeMin: PropTypes.number,
  timerTimeSec: PropTypes.number,
  onNewTimerTime: PropTypes.func,
};

export default Task;
