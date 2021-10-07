import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.scss';

const NewTaskForm = ({ onAdd }) => {
  const [label, setLabel] = useState('');
  const [timeMin, setTimeMin] = useState(null);
  const [timeSec, setTimeSec] = useState(null);

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onTimeMin = (event) => {
    setTimeMin(event.target.value);
  };

  const onTimeSec = (event) => {
    setTimeSec(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (label.trim().length >= 3) {
      onAdd(label, [Number(timeMin), Number(timeSec)]);
      setLabel('');
      setTimeMin(null);
      setTimeSec(null);
    }
  };

  return (
    <form className="new-task" onSubmit={onSubmit}>
      <input className="new-task__form" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
      <input
        className="new-task__timer timer-min"
        type="number"
        required
        placeholder="Min"
        min="0"
        max="59"
        value={timeMin || ''}
        onChange={onTimeMin}
      />
      <input
        className="new-task__timer timer-sec"
        type="number"
        required
        placeholder="Sec"
        min="0"
        max="59"
        value={timeSec || ''}
        onChange={onTimeSec}
      />
      <button type="submit" aria-label="submit" />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onAdd: () => {},
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

export default NewTaskForm;
