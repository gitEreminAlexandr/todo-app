import React from 'react';
import Task from '../Task';

import './TaskList.scss';

TaskList.defaultProps = {
  todos: [], 
  onDeleted: () => {}, 
  onToggleEdit: () => {},
  onToggleCompleted: () => {}
};

export default function TaskList({todos, 
                                  onDeleted, 
                                  onToggleEdit,
                                  onToggleCompleted}) {

  const elements = todos.map(item => {
    const {id, ...itemProps} = item;
    
    return (<Task key={id} 
      {...itemProps} 
      onDeleted={() => onDeleted(id)}
      onToggleEdit={() => onToggleEdit(id)}
      onToggleCompleted={() => onToggleCompleted(id)}/>);
  });

  return (
    <ul className='task-list'>
      {elements}
    </ul>
  );
};