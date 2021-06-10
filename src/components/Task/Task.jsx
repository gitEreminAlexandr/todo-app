/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './Task.scss';

export default function Task({ label, date, completed, edit, onDeleted, onToggleEdit, onToggleCompleted }) {
  if (edit) {
    return (
      <li className="task">
        <form className="task__form">
          <input className="task__input" defaultValue={label} />
        </form>
      </li>
    );
  }

  let className = 'task';
  let checkBox = false;

  if (completed) {
    className += ' completed';
    checkBox = true;
  }

  const time = () => {
    const timeItem = formatDistanceToNow(new Date(date), { addSuffix: true, includeSeconds: true }).split(' ');

    return timeItem.filter((item) => item !== 'less' && item !== 'than').join(' ');
  };

  return (
    <li className={className}>
      <input className="task__toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={checkBox} />
      <label className="task__ladel">
        <p className="task__ladel--description">{label}</p>
        <p className="task__ladel--created">created {time()}</p>
      </label>
      <button className="task__button edit" onClick={onToggleEdit} />
      <button className="task__button destroy" onClick={onDeleted} />
    </li>
  );
}

Task.defaultProps = {
  label: '',
  completed: false,
  edit: false,
  date: '',
  onDeleted: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  completed: PropTypes.bool,
  edit: PropTypes.bool,
  date: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};
