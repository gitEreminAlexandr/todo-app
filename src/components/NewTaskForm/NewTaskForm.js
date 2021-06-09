import React, {Component} from 'react';

import './NewTaskForm.scss';

export default class NewTaskForm extends Component {
  
  static defaultProps = {
    onAdd: () => {}
  };
  
  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label:e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.label.length >= 3) {
      this.props.onAdd(this.state.label);
      this.setState({
        label: ''
      });
    };
  };

  render() {
    return (
      <form onSubmit ={this.onSubmit}>
        <input className='new-task-form' 
        placeholder='What needs to be done?'
        onChange={this.onLabelChange} 
        autoFocus 
        value={this.state.label}/>
      </form>
    );
  };
};