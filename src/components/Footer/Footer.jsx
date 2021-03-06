import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TaskFilter';
import './Footer.scss';

const Footer = ({ count, onClearCompleted, onFilterType }) => (
  <footer className="footer">
    <p className="footer__count">{count} items left</p>
    <TaskFilter onFilterType={onFilterType} />
    <button className="footer__clear" onClick={onClearCompleted} type="button">
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  count: 0,
  onClearCompleted: () => {},
  onFilterType: () => {},
};

Footer.propTypes = {
  count: PropTypes.number,
  onClearCompleted: PropTypes.func,
  onFilterType: PropTypes.func,
};

export default Footer;
