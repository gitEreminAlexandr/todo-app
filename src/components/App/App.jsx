import React, { Component } from 'react';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

import './App.scss';

export default class App extends Component {
  id = 0;

  state = {
    todoData: [
      { label: 'Completed task', date: 'Jun 03 2021 13:18:57', completed: true, edit: false, id: 123 },
      { label: 'Active task', date: 'Jun 03 2021 13:18:57', completed: false, edit: false, id: 124 },
      { label: 'Editing task', date: 'Jun 03 2021 13:18:57', completed: true, edit: true, id: 125 },
      { label: 'Active 2', date: 'Jun 03 2021 13:18:57', completed: false, edit: false, id: 126 },
      { label: 'Completed 3', date: 'Jun 03 2021 13:18:57', completed: true, edit: false, id: 127 },
      { label: 'Active 3', date: 'Jun 03 2021 13:18:57', completed: false, edit: false, id: 128 },
    ],
    filterType: 'all',
  };

  todoList = () => {
    const {todoData, filterType} = this.state;
    return todoData.reduce((acc, item) => {
      if (filterType === 'active' && !item.completed) {
        acc.push(item);
      }

      if (filterType === 'completed' && item.completed) {
        acc.push(item);
      }

      if (filterType === 'all') {
        acc.push(item);
      }
      return acc;
    }, []);
  }

  onFilterType = (text) => {
    this.setState(() => ({
      filterType: text,
    }));
  };

  addItem = (text) => {
    const newItemTodo = {
      label: text,
      date: new Date(),
      completed: false,
      edit: false,
      id: (this.id += 1),
    };

    this.setState(({ todoData }) => {
      const newArrTodoData = [...todoData, newItemTodo];

      return {
        todoData: newArrTodoData,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArrTodoData = todoData.filter((item) => item.id !== id);

      return {
        todoData: newArrTodoData,
      };
    });
  };

  newTodoList = (key, id) => {
    this.setState(({ todoData }) => {
      const newArrTodoData = todoData.map((item) => {
        if (item.id === id) {
          // eslint-disable-next-line no-param-reassign
          item[key] = !item[key];
        }
        return item;
      });

      return {
        todoData: newArrTodoData,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.newTodoList('completed', id);
  };

  onToggleEdit = (id) => {
    this.newTodoList('edit', id);
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

  render() {
    const todoData = this.todoList();

    const complitedCount = todoData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <Header />
        <Main
          todos={todoData}
          filterType={this.filterType}
          onAdd={this.addItem}
          onDeleted={this.deleteItem}
          onToggleEdit={this.onToggleEdit}
          onToggleCompleted={this.onToggleCompleted}
        />
        <Footer count={complitedCount} onClearCompleted={this.onClearCompleted} onFilterType={this.onFilterType} />
      </section>
    );
  }
}
