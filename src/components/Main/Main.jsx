import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

import './Main.scss';

export default function Main({ todos, filterType, onAdd, onDeleted, onToggleEdit, onToggleCompleted }) {
  return (
    <main className="main">
      <NewTaskForm onAdd={onAdd} />
      <TaskList
        todos={todos}
        filterType={filterType}
        onDeleted={onDeleted}
        onToggleEdit={onToggleEdit}
        onToggleCompleted={onToggleCompleted}
      />
    </main>
  );
}

Main.defaultProps = {
  todos: [],
  filterType: 'all',
  onAdd: () => {},
  onDeleted: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
};

Main.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  filterType: PropTypes.string,
  onAdd: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};
