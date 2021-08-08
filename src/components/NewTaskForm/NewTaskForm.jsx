import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.scss';

class NewTaskForm extends Component {
  static defaultProps = {
    onAdd: () => {},
  };

  static propTypes = {
    onAdd: PropTypes.func,
  };

  state = {
    label: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const { label } = this.state;

    if (label.trim().length >= 3) {
      onAdd(label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-task-form"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}

export default NewTaskForm;
