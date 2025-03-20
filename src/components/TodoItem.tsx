import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from '../store/store';

interface TodoItemProps {
  todo: { name: string; surname: string; year: string; isActive: boolean };
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = observer(({ todo, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleSave = () => {
    todoStore.editTodo(index, editedTodo);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setEditedTodo({
      ...editedTodo,
      [field]: e.target.value,
    });
  };

  return (
    <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTodo.name}
            onChange={(e) => handleChange(e, 'name')}
            placeholder="Имя"
          />
          <input
            type="text"
            value={editedTodo.surname}
            onChange={(e) => handleChange(e, 'surname')}
            placeholder="Фамилия"
          />
          <input
            type="number"
            value={editedTodo.year}
            onChange={(e) => handleChange(e, 'year')}
            placeholder="Год"
          />
        </div>
      ) : (
        <div>
          <span>{editedTodo.name} {editedTodo.surname} ({editedTodo.year})</span>
          <span style={{ color: editedTodo.isActive ? 'green' : 'red' }}>
            {editedTodo.isActive ? 'Активно' : 'Неактивно'}
          </span>
        </div>
      )}
      
      <div>
        <button onClick={() => todoStore.removeTodo(index)}>Удалить</button>
        <button onClick={() => todoStore.toggleActive(index)}>
          {editedTodo.isActive ? 'Done' : 'Not Done'}
        </button>
        {isEditing ? (
          <button onClick={handleSave}>Сохранить</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
        )}
      </div>
    </div>
  );
});

export default TodoItem;
