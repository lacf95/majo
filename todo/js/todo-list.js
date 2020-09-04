function TodoList() {
  this.all = [];
  this.add = function add(todo) {
    this.all.push(todo);
  }
  function sortByDoBefore(a, b) {
    if (typeof a.doBefore() == 'undefined' || typeof b.doBefore() == 'undefined') {
      if (typeof a.doBefore() != 'undefined') {
        return -1;
      } else if (typeof b.doBefore() != 'undefined') {
        return 1;
      }
      return 0;
    }
    return a.doBefore() - b.doBefore();
  }

  this.completed = function completed() {
    return this.all.filter(function(todo) {
      return todo.state() == 'completed';
    }).sort(sortByDoBefore);
  };

  this.notCompleted = function notCompleted() {
    return this.all.filter(function(todo) {
      return todo.state() == 'incomplete';
    }).sort(sortByDoBefore);
  };
}
