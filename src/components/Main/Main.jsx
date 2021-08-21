import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import './Main.scss';

const Main = ({
  todos,
  filterType,
  onAdd,
  onDeleted,
  onEditLabel,
  onToggleEdit,
  onToggleCompleted,
  onNewTimerTime,
}) => (
  <main className="main">
    <NewTaskForm onAdd={onAdd} />
    <TaskList
      todos={todos}
      filterType={filterType}
      onDeleted={onDeleted}
      onEditLabel={onEditLabel}
      onToggleEdit={onToggleEdit}
      onToggleCompleted={onToggleCompleted}
      onNewTimerTime={onNewTimerTime}
    />
  </main>
);

Main.defaultProps = {
  todos: [],
  filterType: 'all',
  onAdd: () => {},
  onDeleted: () => {},
  onEditLabel: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
  onNewTimerTime: () => {},
};

Main.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  filterType: PropTypes.string,
  onAdd: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditLabel: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onNewTimerTime: PropTypes.func,
};

export default Main;
