import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import EditTask from '../EditTask';
import './TaskList.scss';

const TaskList = ({ todos, onDeleted, filterType, onEditLabel, onToggleEdit, onToggleCompleted, onNewTimerTime }) => {
  const elements = todos.map((item) => {
    const { id } = item;

    if (item.edit) {
      const { date, completed, edit, ...editItem } = item;
      return <EditTask key={id} {...editItem} onEditLabel={onEditLabel} />;
    }

    return (
      <Task
        key={id}
        {...item}
        filterType={filterType}
        onDeleted={() => onDeleted(id)}
        onToggleEdit={() => onToggleEdit(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onNewTimerTime={onNewTimerTime}
      />
    );
  });

  return <ul className="task-list">{elements}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  filterType: 'all',
  onDeleted: () => {},
  onEditLabel: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
  onNewTimerTime: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  filterType: PropTypes.string,
  onDeleted: PropTypes.func,
  onEditLabel: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onNewTimerTime: PropTypes.func,
};

export default TaskList;
