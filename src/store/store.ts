import { makeAutoObservable } from "mobx";

class TodoStore {
  todos: { name: string; surname: string; year: string; isActive: boolean }[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadTodos();
  }

  loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo(name: string, surname: string, year: string) {
    const newTodo = {
      name,
      surname,
      year,
      isActive: true,
    };
    this.todos.push(newTodo);
    this.saveTodos();
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  editTodo(index: number, updatedTodo: { name: string; surname: string; year: string; isActive: boolean }) {
    this.todos[index] = updatedTodo;
    this.saveTodos();
  }

  toggleActive(index: number) {
    const todo = this.todos[index];
    todo.isActive = !todo.isActive;
    this.saveTodos();
  }

  get activeTodos() {
    return this.todos.filter(todo => todo.isActive);
  }

  get inactiveTodos() {
    return this.todos.filter(todo => !todo.isActive);
  }

  searchTodos(query: string) {
    return this.todos.filter(
      (todo) =>
        todo.name.toLowerCase().includes(query.toLowerCase()) ||
        todo.surname.toLowerCase().includes(query.toLowerCase())
    );
  }

  clearTodos() {
    this.todos = [];
    localStorage.removeItem("todos");
  }
}

const todoStore = new TodoStore();
export default todoStore;
