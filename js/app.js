(function () {
  let todos = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];
  const $inputTodo = document.querySelector('.input-todo');
  const $todos = document.querySelector('.todos');
  const $completeAll = document.querySelector('.custom-checkbox');
  const $completedTodos = document.querySelector('.completed-todos');
  const $activeTodos = document.querySelector('.active-todos');
  const $clearBtn = document.querySelector('.btn');

  
  function htmlRendering() {
    let html = '';
    todos.forEach(({id, content, completed}) => {
      html += `<li id="${id}" class="todo-item"><input class="custom-checkbox" type="checkbox" id="ck-${id}"${completed ? ' checked' : ''}><label for="ck-${id}">${content}</label><i class="remove-todo far fa-times-circle"></i></li>`
    });
    $todos.innerHTML = html;

    $completedTodos.innerHTML = countCompletedTodos();
    $activeTodos.innerHTML = countNotCompletedTodos();
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== +id);
  }

  function gerenateId() {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

  function addTodo(content) {
    todos = [{id: gerenateId(), content, completed: false}, ...todos];
  }

  function changeCheck(itemId) {
    todos = todos.map(todo => todo.id === itemId ? Object.assign({}, todo, {completed: !todo.completed}) : todo);
  }

  function toggleCompletedAll(checked) {
    todos = todos.map((val) => Object.assign({}, val, {completed: checked}));
  }

  function countCompletedTodos() {
    return todos.filter((val) => val.completed).length;
  }

  function countNotCompletedTodos() {
    return todos.filter((val) => !val.completed).length;
  }

  function clearAllDel() {
    todos = todos.filter((val) => !val.completed);
  }


  $todos.addEventListener('click', (e) => {
    if (!e.target.classList.contains('remove-todo')) return;
    removeTodo(e.target.parentNode.id);
    htmlRendering();
  });

  $inputTodo.addEventListener('keyup', (e) => {
    const val = $inputTodo.value.trim();
    if (val === '' || e.keyCode !== 13) return;

    addTodo(val);
    $inputTodo.value = '';
    $inputTodo.focus();
    htmlRendering();
  });

  $todos.addEventListener('change', (e) => {
    changeCheck(+e.target.parentNode.id);
    htmlRendering();
  });

  $completeAll.addEventListener('click', (e) => {
    toggleCompletedAll(e.target.checked);
    htmlRendering();
  });

  $clearBtn.addEventListener('click', (e) => {
    clearAllDel();
    htmlRendering();
  });

  htmlRendering();

}());