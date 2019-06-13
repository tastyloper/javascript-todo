var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Todos = /** @class */ (function () {
    function Todos() {
        this.todos = [
            { id: 1, content: 'HTML', completed: true },
            { id: 2, content: 'CSS', completed: true },
            { id: 3, content: 'JS', completed: false }
        ];
        this.$todos = document.querySelector('.todos');
        this.$inputTodo = document.querySelector('.input-todo');
        this.$completeAll = document.querySelector('.custom-checkbox');
        this.$clearBtn = document.querySelector('.clear-completed > .btn');
        this.$completedTodos = document.querySelector('.completed-todos');
        this.$activeTodos = document.querySelector('.active-todos');
        this.$nav = document.querySelector('.nav');
        this.navState = 'all';
        this.$inputTodo.addEventListener('keyup', this.addEvent.bind(this));
        this.$todos.addEventListener('click', this.removeEvent.bind(this));
        this.$todos.addEventListener('change', this.toggleEvent.bind(this));
        this.$completeAll.addEventListener('click', this.completeAllEvent.bind(this));
        this.$clearBtn.addEventListener('click', this.allClearEvent.bind(this));
        this.$nav.addEventListener('click', this.navEvent.bind(this));
        this.render();
    }
    Todos.prototype.render = function () {
        var _this = this;
        var html = '';
        var _todos = this.todos.filter(function (todo) {
            if (_this.navState === 'active')
                return todo.completed;
            if (_this.navState === 'completed')
                return !todo.completed;
            return true;
        });
        _todos.forEach(function (_a) {
            var id = _a.id, content = _a.content, completed = _a.completed;
            html += "<li id=\"" + id + "\" class=\"todo-item\"><input class=\"custom-checkbox\" type=\"checkbox\" id=\"ck-" + id + "\"" + (completed ? ' checked' : '') + "><label for=\"ck-" + id + "\">" + content + "</label><i class=\"remove-todo far fa-times-circle\"></i></li>";
        });
        this.$todos.innerHTML = html;
        this.$completedTodos.innerHTML = this.countCompletedTodos();
        this.$activeTodos.innerHTML = this.countNotCompletedTodos();
    };
    Todos.prototype.gerenateId = function () {
        return this.todos.length ? Math.max.apply(Math, this.todos.map(function (todo) { return todo.id; })) + 1 : 1;
    };
    Todos.prototype.addTodo = function (content) {
        this.todos = [{ id: this.gerenateId(), content: content, completed: false }].concat(this.todos);
    };
    Todos.prototype.removeTodo = function (id) {
        this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
    };
    Todos.prototype.toggleTodo = function (id) {
        this.todos = this.todos.map(function (todo) { return todo.id === id ? __assign({}, todo, { completed: !todo.completed }) : todo; });
    };
    Todos.prototype.toggleCompletedAll = function (checked) {
        this.todos = this.todos.map(function (todo) { return (__assign({}, todo, { completed: checked })); });
    };
    Todos.prototype.clearAllDel = function () {
        this.todos = this.todos.filter(function (todo) { return !todo.completed; });
    };
    Todos.prototype.countCompletedTodos = function () {
        return this.todos.filter(function (val) { return val.completed; }).length + '';
    };
    Todos.prototype.countNotCompletedTodos = function () {
        return this.todos.filter(function (val) { return !val.completed; }).length + '';
    };
    Todos.prototype.addEvent = function (e) {
        var val = this.$inputTodo.value.trim();
        if (val === '' || e.keyCode !== 13)
            return;
        this.addTodo(val);
        this.$inputTodo.value = '';
        this.$inputTodo.focus();
        this.render();
    };
    Todos.prototype.removeEvent = function (e) {
        var target = e.target;
        if (!target.classList.contains('remove-todo'))
            return;
        this.removeTodo(+target.parentElement.id);
        this.render();
    };
    Todos.prototype.toggleEvent = function (e) {
        var target = e.target;
        this.toggleTodo(+target.parentElement.id);
        this.render();
    };
    Todos.prototype.completeAllEvent = function (e) {
        var target = e.target;
        this.toggleCompletedAll(target.checked);
        this.render();
    };
    Todos.prototype.allClearEvent = function (e) {
        this.clearAllDel();
        this.render();
    };
    Todos.prototype.navEvent = function (e) {
        var target = e.target;
        if (target.nodeName !== 'LI')
            return;
        Array.prototype.slice.apply(this.$nav.children).forEach(function (navItem) {
            if (navItem === target)
                navItem.classList.add('active');
            else
                navItem.classList.remove('active');
        });
        this.navState = target.id;
        this.render();
    };
    return Todos;
}());
var todos = new Todos();
