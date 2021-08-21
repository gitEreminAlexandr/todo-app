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
    timeMin: null,
    timeSec: null,
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onTimeMin = (event) => {
    this.setState({
      timeMin: event.target.value,
    });
  };

  onTimeSec = (event) => {
    this.setState({
      timeSec: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const { label, timeMin, timeSec } = this.state;

    if (label.trim().length >= 3) {
      onAdd(label, [Number(timeMin), Number(timeSec)]);
      this.setState({
        label: '',
        timeMin: null,
        timeSec: null,
      });
    }
  };

  render() {
    const { label, timeMin, timeSec } = this.state;
    return (
      <form className="new-task" onSubmit={this.onSubmit}>
        <input
          className="new-task__form"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          className="new-task__timer timer-min"
          type="number"
          required
          placeholder="Min"
          min="0"
          max="59"
          value={timeMin || ''}
          onChange={this.onTimeMin}
        />
        <input
          className="new-task__timer timer-sec"
          type="number"
          required
          placeholder="Sec"
          min="0"
          max="59"
          value={timeSec || ''}
          onChange={this.onTimeSec}
        />
        <button type="submit" aria-label="submit" />
      </form>
    );
  }
}

export default NewTaskForm;
