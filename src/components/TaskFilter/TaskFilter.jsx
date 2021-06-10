import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskFilter.scss';

export default class TaskFilter extends Component {
  static defaultProps = {
    onFilterType: () => {},
  };

  static propTypes = {
    onFilterType: PropTypes.func,
  };

  onFilterActive = (event) => {
    const { onFilterType } = this.props;
    const targetItem = event.target;
    const value = targetItem.innerHTML.toLowerCase();
    onFilterType(value);

    const el = document.querySelectorAll('.task-filter__button');
    el.forEach((item) => {
      item.classList.remove('active');
    });

    targetItem.className += ' active';
  };

  render() {
    return (
      <ul className="task-filter">
        <li className="task-filter__item task-filter__all">
          <button className="task-filter__button active" onClick={this.onFilterActive} type="button">
            All
          </button>
        </li>
        <li className="task-filter__item task-filter__active">
          <button className="task-filter__button" onClick={this.onFilterActive} type="button">
            Active
          </button>
        </li>
        <li className="task-filter__item task-filter__completed">
          <button className="task-filter__button" onClick={this.onFilterActive} type="button">
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
