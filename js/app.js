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
      this.getTodos();
    }

    getTodos() {
      fetch('http://52.79.226.167:4500/todos/',)
        .then(res => res.json())
        .then(todosFromServer => {
          this.render(todosFromServer);
        })
        .catch(console.error);
    }

    render(todosFromServer) {
      this.todos = todosFromServer;

      let html = '';
      const _todos= todosFromServer.filter(todo => {
        if (this.navState === 'active') return todo.completed;
        if (this.navState === 'completed') return !todo.completed;
        return true;
      });

      _todos.forEach(({id, content, completed}) => {
        html += `<li id="${id}" class="todo-item"><input class="custom-checkbox" type="checkbox" id="ck-${id}"${completed ? ' checked' : ''}><label for="ck-${id}">${content}</label><i class="remove-todo far fa-times-circle"></i></li>`
      });
      this.$todos.innerHTML = html;
  
      this.$completedTodos.innerHTML = _todos.filter(val => val.completed).length;
      this.$activeTodos.innerHTML = _todos.filter(val => !val.completed).length;
    }
  
    removeTodo(id) {
      fetch(`http://52.79.226.167:4500/todos/${id}`,{
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(todosFromServer => {
          this.render(todosFromServer);
        })
        .catch(console.error);
    }

    generateId() {
      return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
    }
  
    addTodo(content) {
      fetch('http://52.79.226.167:4500/todos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.generateId(),
          content,
          completed: false
        })
      }).then(res => res.json())
        .then(todosResult => {
          this.render(todosResult);
        })
        .catch(console.error);
    }
  
    changeCheck(itemId) {
      const { completed } = this.todos.find(todo => todo.id === +itemId);

      fetch(`http://52.79.226.167:4500/todos/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      }).then(res => res.json())
        .then(todosResult => {
          this.render(todosResult);
        })
        .catch(console.error);
    }
  
    toggleCompletedAll(checked) {
      fetch('http://52.79.226.167:4500/todos/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({completed: checked})
      }).then(res => res.json())
        .then(todosResult => {
          this.render(todosResult);
        })
        .catch(console.error);
    }
  
    clearAllDel() {
      fetch('http://52.79.226.167:4500/todos/completed', {
        method: 'DELETE'
      }).then(res => res.json())
        .then(todosResult => {
          this.render(todosResult);
        })
        .catch(console.error);
    }

    navEvent(e) {
      if (e.target.nodeName !== 'LI') return;
      [...this.$nav.children].forEach(navItem => {
        if (navItem === e.target) navItem.classList.add('active');
        else navItem.classList.remove('active');
      });
      this.navState = e.target.id;
      this.getTodos();
    }

    removeEvent(e) {
      if (!e.target.classList.contains('remove-todo')) return;
      this.removeTodo(e.target.parentNode.id);
    }

    addEvent(e) {
      const val = this.$inputTodo.value.trim();
      if (val === '' || e.keyCode !== 13) return;
  
      this.addTodo(val);
      this.$inputTodo.value = '';
      this.$inputTodo.focus();
    }

    checkEvent(e) {
      this.changeCheck(+e.target.parentNode.id);
    }

    completeAllEvent(e) {
      this.toggleCompletedAll(e.target.checked);
    }

    allClearEvent(e) {
      this.clearAllDel();
    }
  }

  new Todo();

}());