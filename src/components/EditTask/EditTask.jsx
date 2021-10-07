import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditTask.scss';

const EditTask = ({ label, id, onEditLabel }) => {
  const [editLabel, setEditLabel] = useState(label);

  const onLabelChange = (event) => {
    setEditLabel(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (editLabel.trim().length >= 3) {
      onEditLabel(id, editLabel);
    }
  };

  return (
    <li className="edit-task">
      <form className="edit-task__form" onSubmit={onSubmit}>
        <input className="edit-task__input" onChange={onLabelChange} value={editLabel} />
      </form>
    </li>
  );
};

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
