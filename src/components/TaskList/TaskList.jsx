import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';

import './TaskList.scss';

export default function TaskList({ todos, onDeleted, onToggleEdit, onToggleCompleted }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

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
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};
