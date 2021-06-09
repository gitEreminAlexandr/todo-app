import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TaskFilter';

import './Footer.scss';

Footer.defaultProps = {
  count: 0, 
  onClearCompleted: () => {}, 
  onFilterType: () => {}
};

Footer.propTypes = {
  count: PropTypes.number,
  onClearCompleted: PropTypes.func, 
  onFilterType: PropTypes.func
};

export default function Footer({count, onClearCompleted, onFilterType}) {
  
  return (
    <footer className='footer'>
      <p className='footer__count'>{count} items left</p>
      <TaskFilter 
        onFilterType={onFilterType}/>
      <button className='footer__clear'
        onClick={onClearCompleted}>
          Clear completed
      </button>
    </footer>
  );
};