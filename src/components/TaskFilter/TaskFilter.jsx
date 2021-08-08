import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TaskFilter.scss';

const TaskFilter = ({ onFilterType }) => {
  const [activeBtn, setActiveBtn] = useState('all');

  const onFilterActive = (type) => {
    onFilterType(type);
    setActiveBtn(type);
  };

  const classNamesBtnAll = classNames({
    'task-filter__button': true,
    active: activeBtn === 'all',
  });

  const classNamesBtnActive = classNames({
    'task-filter__button': true,
    active: activeBtn === 'active',
  });

  const classNamesBtnCompleted = classNames({
    'task-filter__button': true,
    active: activeBtn === 'completed',
  });

  return (
    <ul className="task-filter">
      <li className="task-filter__item task-filter__all">
        <button className={classNamesBtnAll} onClick={() => onFilterActive('all')} type="button">
          All
        </button>
      </li>
      <li className="task-filter__item task-filter__active">
        <button className={classNamesBtnActive} onClick={() => onFilterActive('active')} type="button">
          Active
        </button>
      </li>
      <li className="task-filter__item task-filter__completed">
        <button className={classNamesBtnCompleted} onClick={() => onFilterActive('completed')} type="button">
          Completed
        </button>
      </li>
    </ul>
  );
};

TaskFilter.defaultProps = {
  onFilterType: () => {},
};

TaskFilter.propTypes = {
  onFilterType: PropTypes.func,
};

export default TaskFilter;

// const onFilterActive = (event) => {
//   const targetItem = event.target;
//   const value = targetItem.innerHTML.toLowerCase();
//   onFilterType(value);

//   const el = document.querySelectorAll('.task-filter__button');
//   el.forEach((item) => {
//     item.classList.remove('active');
//   });

//   targetItem.className += ' active';
// };
