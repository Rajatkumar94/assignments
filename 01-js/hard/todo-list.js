/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.Todo = [];
  }

  add(todo) {
    this.Todo.push(todo);
  }

  get(indexOfTodo) {
    return this.Todo[indexOfTodo - 1];
  }
}

let list = new Todo();

list.add("buy milk");

console.log(list.get(1));

module.exports = Todo;
