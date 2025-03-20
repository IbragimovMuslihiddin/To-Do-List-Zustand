import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from '../store/store';
import TodoItem from './TodoItem';

const TodoList: React.FC = observer(() => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [year, setYear] = useState('');

  const handleAddTodo = () => {
    if (name.trim() && surname.trim() && year.trim()) {
      todoStore.addTodo(name, surname, year);
      setName('');
      setSurname('');
      setYear('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>To Do List</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
        style={{
          margin: '5px',
          padding: '10px',
          width: '200px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Фамилия"
        style={{
          margin: '5px',
          padding: '10px',
          width: '200px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Год"
        style={{
          margin: '5px',
          padding: '10px',
          width: '200px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleAddTodo}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Добавить
      </button>

      <h2 style={{ fontFamily: 'sans-serif', color: '#333', marginTop: '20px' }}>
        Активные задачи
      </h2>
      {todoStore.todos.filter((todo) => todo.isActive).map((todo, index) => (
        <TodoItem key={index} index={index} todo={todo} />
      ))}

      <h2 style={{ fontFamily: 'sans-serif', color: '#333', marginTop: '20px' }}>
        Неактивные задачи
      </h2>
      {todoStore.todos.filter((todo) => !todo.isActive).map((todo, index) => (
        <TodoItem key={index} index={index} todo={todo} />
      ))}
    </div>
  );
});

export default TodoList;
