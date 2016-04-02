(function(angular) {
  var todoApp = angular.module("todoApp");
  //定义一个服务
  todoApp.service('Storage', ['$window', function($window) {
    var storage = $window.localStorage;

    function getId() {
      return Math.random()
    };
    var todos = JSON.parse(storage.getItem('my_todos') ||'[]');

    this.save = function() {
    	console.log(1)
      storage.setItem('my_todos', JSON.stringify(todos));
    };
    this.get = function() {
      return todos;
    };

    this.add = function(input) {
      todos.push({ id: getId(), text: input, completed: false });
      this.save();
    };

    this.remove = function(current) {
      var index = todos.indexOf(current);
      todos.splice(index, 1);
      //todos.splice(todos.indexOf(current), 1);
      this.save();
    };
    this.hasCompleted = function() {
      return todos.some(todo => todo.completed);
    };
    this.clearCompleted = function() {
      //定义一个空数组
      var unCompleteds = [];
      todos.forEach(todo => {
        if (!todo.completed) {
          //未完成的添加到数组里
          unCompleteds.push(todo);
        }
      });
      //重新定义todos数组的内容
      todos = unCompleteds;
      return todos;
    };
    this.allCompleted = function(checked) {
      todos.forEach(todo => {
        todo.completed = checked;
      });
    }
  }])
})(angular);
