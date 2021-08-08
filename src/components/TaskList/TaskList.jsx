import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import EditTask from '../EditTask';
import './TaskList.scss';

const TaskList = ({ todos, onDeleted, onEditLabel, onToggleEdit, onToggleCompleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    if (item.edit) {
      const { date, completed, edit, ...editItem } = item;
      return <EditTask key={id} {...editItem} onEditLabel={onEditLabel} />;
    }

    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleEdit={() => onToggleEdit(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
      />
    );
  });

  return <ul className="task-list">{elements}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onEditLabel: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onEditLabel: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};

export default TaskList;
