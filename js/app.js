(function () {
  class Todo {
    constructor (todos = []) {
      this.todos = todos;
      this.navState = 'all';
      this.$inputTodo = document.querySelector('.input-todo');
      this.$nav = document.querySelector('.nav');
      this.$todos = document.querySelector('.todos');
      this.$completeAll = document.querySelector('.custom-checkbox');
      this.$completedTodos = document.querySelector('.completed-todos');
      this.$activeTodos = document.querySelector('.active-todos');
      this.$clearBtn = document.querySelector('.clear-completed > .btn');

      this.$nav.addEventListener('click', this.navEvent.bind(this));
      this.$todos.addEventListener('click', this.removeEvent.bind(this));
      this.$inputTodo.addEventListener('keyup', this.addEvent.bind(this));
      this.$todos.addEventListener('change', this.checkEvent.bind(this));
      this.$completeAll.addEventListener('click', this.completeAllEvent.bind(this));
      this.$clearBtn.addEventListener('click', this.allClearEvent.bind(this));
      this.render();
    }

    render() {
      let html = '';
      const _todos= this.todos.filter(todo => {
        if (this.navState === 'active') return todo.completed;
        if (this.navState === 'completed') return !todo.completed;
        return true;
      });

      _todos.forEach(({id, content, completed}) => {
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

    navEvent(e) {
      if (e.target.nodeName !== 'LI') return;
      [...this.$nav.children].forEach(navItem => {
        if (navItem === e.target) navItem.classList.add('active');
        else navItem.classList.remove('active');
      });
      this.navState = e.target.id;
      this.render();
    }

    removeEvent(e) {
      if (!e.target.classList.contains('remove-todo')) return;
      this.removeTodo(e.target.parentNode.id);
      this.render();
    }

    addEvent(e) {
      const val = this.$inputTodo.value.trim();
      if (val === '' || e.keyCode !== 13) return;
  
      this.addTodo(val);
      this.$inputTodo.value = '';
      this.$inputTodo.focus();
      this.render();
    }

    checkEvent(e) {
      this.changeCheck(+e.target.parentNode.id);
      this.render();
    }

    completeAllEvent(e) {
      this.toggleCompletedAll(e.target.checked);
      this.render();
    }

    allClearEvent(e) {
      this.clearAllDel();
      this.render();
    }
  }

  let todos = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];
  new Todo(todos);

}());