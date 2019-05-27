(function () {
  class Todo {
    constructor (todos = []) {
      this.todos = todos;
      this.$inputTodo = document.querySelector('.input-todo');
      this.$todos = document.querySelector('.todos');
      this.$completeAll = document.querySelector('.custom-checkbox');
      this.$completedTodos = document.querySelector('.completed-todos');
      this.$activeTodos = document.querySelector('.active-todos');
      this.$clearBtn = document.querySelector('.btn');

      this.$todos.addEventListener('click', this.removeEvent.bind(this));
      this.$inputTodo.addEventListener('keyup', this.addEvent.bind(this));
      this.$todos.addEventListener('change', this.checkEvent.bind(this));
      this.$completeAll.addEventListener('click', this.completeAllEvent.bind(this));
      this.$clearBtn.addEventListener('click', this.allClearEvent.bind(this));
      this.htmlRendering();
    }

    htmlRendering() {
      let html = '';
      this.todos.forEach(({id, content, completed}) => {
        html += `<li id="${id}" class="todo-item"><input class="custom-checkbox" type="checkbox" id="ck-${id}"${completed ? ' checked' : ''}><label for="ck-${id}">${content}</label><i class="remove-todo far fa-times-circle"></i></li>`
      });
      this.$todos.innerHTML = html;
  
      this.$completedTodos.innerHTML = this.countCompletedTodos();
      this.$activeTodos.innerHTML = this.countNotCompletedTodos();
    }
  
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== +id);
    }
  
    gerenateId() {
      return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
    }
  
    addTodo(content) {
      this.todos = [{id: this.gerenateId(), content, completed: false}, ...this.todos];
    }
  
    changeCheck(itemId) {
      this.todos = this.todos.map(todo => todo.id === itemId ? Object.assign({}, todo, {completed: !todo.completed}) : todo);
    }
  
    toggleCompletedAll(checked) {
      this.todos = this.todos.map(val => Object.assign({}, val, {completed: checked}));
    }
  
    countCompletedTodos() {
      return this.todos.filter(val => val.completed).length;
    }
  
    countNotCompletedTodos() {
      return this.todos.filter(val => !val.completed).length;
    }
  
    clearAllDel() {
      this.todos = this.todos.filter(val => !val.completed);
    }

    removeEvent(e) {
      if (!e.target.classList.contains('remove-todo')) return;
      this.removeTodo(e.target.parentNode.id);
      this.htmlRendering();
    }

    addEvent(e) {
      const val = this.$inputTodo.value.trim();
      if (val === '' || e.keyCode !== 13) return;
  
      this.addTodo(val);
      this.$inputTodo.value = '';
      this.$inputTodo.focus();
      this.htmlRendering();
    }

    checkEvent(e) {
      this.changeCheck(+e.target.parentNode.id);
      this.htmlRendering();
    }

    completeAllEvent(e) {
      this.toggleCompletedAll(e.target.checked);
      this.htmlRendering();
    }

    allClearEvent(e) {
      this.clearAllDel();
      this.htmlRendering();
    }
  }

  let todos = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];
  new Todo(todos);

}());