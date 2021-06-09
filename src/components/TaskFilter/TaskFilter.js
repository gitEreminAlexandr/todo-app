import React, {Component} from 'react';

import './TaskFilter.scss';



export default class TaskFilter extends Component {

  static defaultProps = {
    onFilterType: () => {}
  };

  onFilterActive = (e) => {
    const value = e.target.innerHTML.toLowerCase();
    this.props.onFilterType(value);

    const el = document.querySelectorAll('.task-filter__button');
    el.forEach(item => {
      item.classList.remove('active')
    });
    
    e.target.className += ' active';
  };

  render() {
    
    return (
      <ul className='task-filter' 
        onClick={this.onFilterActive}>
        <li className='task-filter__item task-filter__all'>
          <button className='task-filter__button active'>All</button>
        </li>
        <li className='task-filter__item task-filter__active'>
          <button className='task-filter__button'>Active</button>
        </li>
        <li className='task-filter__item task-filter__completed'>
          <button className='task-filter__button'>Completed</button>
        </li>
      </ul>
    );
  }
};