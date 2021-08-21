import React, { Component } from 'react';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import './App.scss';

export default class App extends Component {
  id = 0;

  state = {
    todoData: [
      {
        label: 'Completed task',
        date: 'Jun 03 2021 13:18:57',
        completed: true,
        edit: false,
        id: 123,
        timerTimeMin: 0,
        timerTimeSec: 20,
      },
      {
        label: 'Active task',
        date: 'Jun 03 2021 13:18:57',
        completed: false,
        edit: false,
        id: 124,
        timerTimeMin: 1,
        timerTimeSec: 20,
      },
      {
        label: 'Editing task',
        date: 'Jun 03 2021 13:18:57',
        completed: true,
        edit: false,
        id: 125,
        timerTimeMin: 13,
        timerTimeSec: 20,
      },
      {
        label: 'Active 2',
        date: 'Jun 03 2021 13:18:57',
        completed: false,
        edit: false,
        id: 126,
        timerTimeMin: 13,
        timerTimeSec: 20,
      },
      {
        label: 'Completed 3',
        date: 'Jun 03 2021 13:18:57',
        completed: true,
        edit: false,
        id: 127,
        timerTimeMin: 13,
        timerTimeSec: 20,
      },
      {
        label: 'Active 3',
        date: 'Jun 03 2021 13:18:57',
        completed: false,
        edit: false,
        id: 128,
        timerTimeMin: 13,
        timerTimeSec: 20,
      },
    ],
    filterType: 'all',
  };

  onFilterType = (text) => {
    this.setState({
      filterType: text,
    });
  };

  onAddItem = (text, time) => {
    const newItemTodo = {
      label: text,
      date: `${new Date()}`,
      completed: false,
      edit: false,
      id: (this.id += 1),
      timerTimeMin: time[0],
      timerTimeSec: time[1],
      timerActive: false,
    };

    this.setState(({ todoData }) => {
      const newArrTodoData = [...todoData, newItemTodo];

      return {
        todoData: newArrTodoData,
      };
    });
  };

  onEditLabel = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const newArrEditedLabel = todoData.map((item) => {
        if (item.id === id) {
          return { ...item, label: newLabel, edit: false };
        }
        return item;
      });

      return {
        todoData: newArrEditedLabel,
      };
    });
  };

  onDeleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArrTodoData = todoData.filter((item) => item.id !== id);

      return {
        todoData: newArrTodoData,
      };
    });
  };

  taskStateChanges = (key, id) => {
    this.setState(({ todoData }) => {
      const newArrTodoData = todoData.map((item) => {
        if (item.id === id) {
          return { ...item, [key]: !item[key] };
        }
        return item;
      });
      return {
        todoData: newArrTodoData,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.taskStateChanges('completed', id);
  };

  onToggleEdit = (id) => {
    this.taskStateChanges('edit', id);
    return id;
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArrTodoData = todoData.filter((item) => !item.completed);

      return {
        todoData: newArrTodoData,
      };
    });
  };

  onNewTimerTime = (id, newTimeMin, newTimeSec) => {
    this.setState(({ todoData }) => {
      const newArrTodoData = todoData.map((item) => {
        if (item.id === id) {
          return { ...item, timerTimeMin: newTimeMin, timerTimeSec: newTimeSec };
        }
        return item;
      });
      return {
        todoData: newArrTodoData,
      };
    });
  };

  render() {
    const { todoData, filterType } = this.state;
    const complitedCount = todoData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <Header />
        <Main
          todos={todoData}
          filterType={filterType}
          onAdd={this.onAddItem}
          onDeleted={this.onDeleteItem}
          onEditLabel={this.onEditLabel}
          onToggleEdit={this.onToggleEdit}
          onToggleCompleted={this.onToggleCompleted}
          onNewTimerTime={this.onNewTimerTime}
        />
        <Footer count={complitedCount} onClearCompleted={this.onClearCompleted} onFilterType={this.onFilterType} />
      </section>
    );
  }
}
