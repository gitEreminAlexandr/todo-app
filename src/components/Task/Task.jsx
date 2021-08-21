/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import './Task.scss';

class Task extends Component {
  state = {
    timeMin: 0,
    timeSec: 0,
    activTimer: false,
  };

  componentDidMount() {
    this.setState({
      timeMin: this.props.timerTimeMin,
      timeSec: this.props.timerTimeSec,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activTimer !== prevState.activTimer) {
      if (this.state.activTimer) {
        this.interval = setInterval(this.timer, 1000);
      }
      if (!this.state.activTimer) {
        this.newTimeItem();
        clearInterval(this.interval);
      }
    }
  }

  componentWillUnmount() {
    this.newTimeItem();
    clearInterval(this.interval);
  }

  timer = () => {
    const { timeMin, timeSec } = this.state;
    const newSec = timeSec - 1;

    if (timeMin === 0 && timeSec === 1) {
      const { id, onNewTimerTime } = this.props;
      onNewTimerTime(id, timeMin, timeSec);
      clearInterval(this.interval);
    }

    if (timeMin !== 0 && timeSec === 0) {
      const newMin = timeMin - 1;
      return this.setState({
        timeMin: newMin,
        timeSec: 59,
      });
    }

    return this.setState({
      timeSec: newSec,
    });
  };

  newTimeItem = () => {
    const { timeMin, timeSec } = this.state;
    const { id, onNewTimerTime } = this.props;
    onNewTimerTime(id, timeMin, timeSec);
  };

  playTimer = () => {
    this.setState({
      activTimer: true,
    });
  };

  stopTimer = () => {
    this.setState({
      activTimer: false,
    });
  };

  time = () => {
    const timeItem = formatDistanceToNow(new Date(this.props.date), { addSuffix: true, includeSeconds: true }).split(
      ' '
    );
    return timeItem.filter((item) => item !== 'less' && item !== 'than').join(' ');
  };

  render() {
    return (
      <li
        className={classNames({
          task: true,
          'task-completed': this.props.completed,
          'task-none':
            (this.props.filterType === 'completed' && !this.props.completed) ||
            (this.props.filterType === 'active' && this.props.completed),
        })}
      >
        <input
          className="task__toggle"
          type="checkbox"
          onClick={this.props.onToggleCompleted}
          defaultChecked={this.props.completed}
        />
        <label className="task__ladel">
          <p className="task__ladel--description">{this.props.label}</p>
        </label>
        <span className="task__timer">
          <button type="button" aria-label="timer play" className="icon icon-play" onClick={this.playTimer} />
          <button type="button" aria-label="timer pause" className="icon icon-pause" onClick={this.stopTimer} />
          {this.state.timeMin}:{this.state.timeSec}
        </span>
        <p className="task__ladel--created">created {this.time()}</p>
        <button type="button" aria-label="edit" className="task__button edit" onClick={this.props.onToggleEdit} />
        <button type="button" aria-label="deleted" className="task__button destroy" onClick={this.props.onDeleted} />
      </li>
    );
  }
}

Task.defaultProps = {
  id: 0,
  label: '',
  completed: false,
  date: '',
  filterType: '',
  onDeleted: () => {},
  onToggleEdit: () => {},
  onToggleCompleted: () => {},
  timerTimeMin: 0,
  timerTimeSec: 0,
  onNewTimerTime: () => {},
};

Task.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  completed: PropTypes.bool,
  date: PropTypes.string,
  filterType: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  timerTimeMin: PropTypes.number,
  timerTimeSec: PropTypes.number,
  onNewTimerTime: PropTypes.func,
};

// const Task = ({ id, label, date, completed, onDeleted, onToggleEdit, onToggleCompleted, timerTimeMin, timerTimeSec, onTimerPlay }) => {

//   const classNameTask = classNames({
//     task: true,
//     'task-completed': this.props.completed,
//   });

//   const time = () => {
//     const timeItem = formatDistanceToNow(new Date(date), { addSuffix: true, includeSeconds: true }).split(' ');
//     return timeItem.filter((item) => item !== 'less' && item !== 'than').join(' ');
//   };
//   return (
//     <li className={classNameTask}>
//       <input className="task__toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
//       <label className="task__ladel">
//         <p className="task__ladel--description">{label}</p>
//       </label>
//       <span className="task__timer">
//         <button type="button" aria-label="timer play" className="icon icon-play" onClick={onTimerPlay}/>
//         <button type="button" aria-label="timer pause" className="icon icon-pause" />
//         {timerTimeMin}:{timerTimeSec}
//       </span>
//       <p className="task__ladel--created">created {time()}</p>
//       <button type="button" aria-label="edit" className="task__button edit" onClick={onToggleEdit} />
//       <button type="button" aria-label="deleted" className="task__button destroy" onClick={onDeleted} />
//     </li>
//   );
// };

// Task.defaultProps = {
//   label: '',
//   completed: false,
//   date: '',
//   onDeleted: () => {},
//   onToggleEdit: () => {},
//   onToggleCompleted: () => {},
//   timerTimeMin: 0,
//   timerTimeSec: 0,
//   onTimerPlay: () => {},
// };

// Task.propTypes = {
//   label: PropTypes.string,
//   completed: PropTypes.bool,
//   date: PropTypes.string,
//   onDeleted: PropTypes.func,
//   onToggleEdit: PropTypes.func,
//   onToggleCompleted: PropTypes.func,
//   timerTimeMin: PropTypes.number,
//   timerTimeSec: PropTypes.number,
//   onTimerPlay: PropTypes.func,
// };

export default Task;
