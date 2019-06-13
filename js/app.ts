interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

class Todos {
  todos: Todo[] = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'JS', completed: false }
  ];
  $todos: HTMLUListElement = document.querySelector('.todos');
  $inputTodo: HTMLInputElement = document.querySelector('.input-todo');
  $completeAll: HTMLInputElement = document.querySelector('.custom-checkbox');
  $clearBtn: HTMLButtonElement = document.querySelector('.clear-completed > .btn');
  $completedTodos: HTMLSpanElement = document.querySelector('.completed-todos');
  $activeTodos: HTMLElement = document.querySelector('.active-todos');
  $nav: HTMLUListElement = document.querySelector('.nav');
  navState: string = 'all';

  constructor() {
    this.$inputTodo.addEventListener('keyup', this.addEvent.bind(this));
    this.$todos.addEventListener('click', this.removeEvent.bind(this));
    this.$todos.addEventListener('change', this.toggleEvent.bind(this));
    this.$completeAll.addEventListener('click', this.completeAllEvent.bind(this));
    this.$clearBtn.addEventListener('click', this.allClearEvent.bind(this));
    this.$nav.addEventListener('click', this.navEvent.bind(this));

    this.render();
  }

  render(): void {
    let html: string = '';
    const _todos: Todo[] = this.todos.filter(todo => {
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

  gerenateId(): number {
    return this.todos.length ? Math.max(...this.todos.map((todo: Todo) => todo.id)) + 1 : 1;
  }

  addTodo(content: string): void {
    this.todos = [{id: this.gerenateId(), content, completed: false}, ...this.todos];
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map((todo: Todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  }

  toggleCompletedAll(checked: boolean): void {
    this.todos = this.todos.map((todo: Todo) => ({ ...todo, completed: checked }));
  }

  clearAllDel(): void  {
    this.todos = this.todos.filter((todo: Todo) => !todo.completed);
  }

  countCompletedTodos(): string {
    return this.todos.filter(val => val.completed).length + '';
  }

  countNotCompletedTodos(): string {
    return this.todos.filter(val => !val.completed).length + '';
  }


  addEvent(e: KeyboardEvent): void {
    const val: string = this.$inputTodo.value.trim();
    if (val === '' || e.keyCode !== 13) return;

    this.addTodo(val);
    this.$inputTodo.value = '';
    this.$inputTodo.focus();
    this.render();
  }

  removeEvent(e: MouseEvent): void {
    const target: HTMLSpanElement = <HTMLSpanElement>e.target;
    if (!target.classList.contains('remove-todo')) return;
    this.removeTodo(+target.parentElement.id);
    this.render();
  }

  toggleEvent(e: Event): void {
    const target: HTMLElement = <HTMLElement>e.target;
    this.toggleTodo(+target.parentElement.id);
    this.render();
  }

  completeAllEvent(e: MouseEvent): void {
    const target: HTMLInputElement = <HTMLInputElement>e.target;
    this.toggleCompletedAll(target.checked);
    this.render();
  }

  allClearEvent(e: MouseEvent): void {
    this.clearAllDel();
    this.render();
  }

  navEvent(e: MouseEvent): void {
    const target: HTMLLIElement = <HTMLLIElement>e.target;
    if (target.nodeName !== 'LI') return;
    Array.prototype.slice.apply(this.$nav.children).forEach(navItem => {
      if (navItem === target) navItem.classList.add('active');
      else navItem.classList.remove('active');
    });
    this.navState = target.id;
    this.render();
  }
}

const todos: Todos = new Todos();