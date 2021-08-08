import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import './Task.scss';

const Task = ({ label, date, completed, onDeleted, onToggleEdit, onToggleCompleted }) => {
  const classNameTask = classNames({
    task: true,
    'task-completed': completed,
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
        <p className="task__ladel--created">created {time()}</p>
      </label>
      <button type="button" aria-label="edit" className="task__button edit" onClick={onToggleEdit} />
      <button type="button" aria-label="deleted" className="task__button destroy" onClick={onDeleted} />
    </li>
  );
};

Task.defaultProps = {
  label: '',
  completed: false,
  date: '',
  onDeleted: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  completed: PropTypes.bool,
  date: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};

export default Task;
