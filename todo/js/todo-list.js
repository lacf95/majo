function TodoList() {
  this.all = [];

  this.completed = function completed() {
    return this.all;
  };

  this.notCompleted = function completed() {
    return this.all;
  };
}
