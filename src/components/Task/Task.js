import React from 'react';
import {formatDistanceToNow} from 'date-fns';

import './Task.scss';

Task.defaultProps = {
  label: '', 
  completed: false, 
  edit: false, 
  onDeleted: () => {}, 
  onToggleEdit: () => {}, 
  onToggleCompleted: () => {}
};

export default function Task({label,
                              date, 
                              completed, 
                              edit, 
                              onDeleted, 
                              onToggleEdit, 
                              onToggleCompleted}) {

  if (edit) {
    return (
      <li className='task'>
        <form className='task__form'>
          <input className='task__input'
            defaultValue={label}/>
        </form>
      </li>
    );
  };

  let className = 'task';
  let checkBox = false;

  if(completed) {
    className += ' completed'
    checkBox = true;
  }

  let time = (date) => {
    let timeItem = formatDistanceToNow(new Date(date), {addSuffix: true, includeSeconds: true}).split(' ');

    return timeItem.filter(item => { 
      return item !== 'less' && item !== 'than';
    }).join(' ')
  };

  return (
    <li className={className}>
      <input className='task__toggle' type='checkbox' 
        onClick={onToggleCompleted} defaultChecked={checkBox}></input>
      <label className='task__ladel'>
        <p className='task__ladel--description'>{label}</p>
        <p className='task__ladel--created'>created {time(date)}</p>
      </label>
      <button className='task__button edit'
        onClick={onToggleEdit}></button>
      <button className='task__button destroy'
        onClick={onDeleted}></button>
    </li>
  );
};

