import React, { useState } from 'react';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import './App.scss';

const App = () => {
  const [idTask, setidTask] = useState(1);
  const [todoData, setTodoData] = useState([
    {
      label: 'Completed task',
      date: 'Jun 03 2021 13:18:57',
      completed: true,
      edit: false,
      id: 123,
      timerTimeMin: 0,
      timerTimeSec: 3,
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
  ]);
  const [filterType, setFilterType] = useState('all');

  const onFilterType = (text) => {
    setFilterType(text);
  };

  const onAddItem = (text, time) => {
    const newItemTodo = {
      label: text,
      date: `${new Date()}`,
      completed: false,
      edit: false,
      id: idTask,
      timerTimeMin: time[0],
      timerTimeSec: time[1],
      timerActive: false,
    };

    setidTask((id) => id + 1);

    const newArrTodoData = [...todoData, newItemTodo];
    setTodoData(newArrTodoData);
  };

  const onEditLabel = (id, newLabel) => {
    const newArrEditedLabel = todoData.map((item) => {
      if (item.id === id) {
        return { ...item, label: newLabel, edit: false };
      }
      return item;
    });

    setTodoData(newArrEditedLabel);
  };

  const onDeleteItem = (id) => {
    const newArrTodoData = todoData.filter((item) => item.id !== id);

    setTodoData(newArrTodoData);
  };

  const taskStateChanges = (key, id) => {
    const newArrTodoData = todoData.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: !item[key] };
      }
      return item;
    });

    setTodoData(newArrTodoData);
  };

  const onToggleCompleted = (id) => {
    taskStateChanges('completed', id);
  };

  const onToggleEdit = (id) => {
    taskStateChanges('edit', id);
  };

  const onClearCompleted = () => {
    const newArrTodoData = todoData.filter((item) => !item.completed);

    setTodoData(newArrTodoData);
  };

  const onNewTimerTime = (id, newTimeMin, newTimeSec) => {
    const newArrTodoData = todoData.map((item) => {
      if (item.id === id) {
        return { ...item, timerTimeMin: newTimeMin, timerTimeSec: newTimeSec };
      }
      return item;
    });
    setTodoData(newArrTodoData);
  };

  const complitedCount = todoData.filter((el) => !el.completed).length;

  return (
    <section className="todoapp">
      <Header />
      <Main
        todos={todoData}
        filterType={filterType}
        onAdd={onAddItem}
        onDeleted={onDeleteItem}
        onEditLabel={onEditLabel}
        onToggleEdit={onToggleEdit}
        onToggleCompleted={onToggleCompleted}
        onNewTimerTime={onNewTimerTime}
      />
      <Footer count={complitedCount} onClearCompleted={onClearCompleted} onFilterType={onFilterType} />
    </section>
  );
  // }
};

export default App;
