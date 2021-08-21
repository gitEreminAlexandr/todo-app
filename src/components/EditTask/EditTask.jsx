import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EditTask.scss';

class EditTask extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    label: this.props.label,
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { id, onEditLabel } = this.props;
    const { label } = this.state;

    if (label.trim().length >= 3) {
      onEditLabel(id, label);
    }
  };

  render() {
    const { label } = this.state;
    return (
      <li className="edit-task">
        <form className="edit-task__form" onSubmit={this.onSubmit}>
          <input className="edit-task__input" onChange={this.onLabelChange} value={label} />
        </form>
      </li>
    );
  }
}

EditTask.defaultProps = {
  label: '',
  id: 0,
  onEditLabel: () => {},
};

EditTask.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  onEditLabel: PropTypes.func,
};

export default EditTask;
