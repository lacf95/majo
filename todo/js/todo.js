function Todo(name, doBefore, state) {
  var _name = name;
  this.name = function(name) {
    if (typeof name === 'undefined') {
      return _name;
    }
    _name = name;
    updateEditedAt();
    return _name;
  };

  var _doBefore = doBefore;
  this.doBefore = function(doBefore) {
    if (typeof doBefore === 'undefined') {
      return _doBefore;
    }
    _doBefore = doBefore;
    updateEditedAt();
    return _doBefore;
  };

  var _state = state || 'incomplete';
  this.state = function(state) {
    if (typeof state === 'undefined') {
      return _state;
    }
    _state = state;
    updateEditedAt();
    return _state;
  }

  var _editedAt;
  this.editedAt = function(){
    return _editedAt;
  }
  var updateEditedAt = () => {
    _editedAt = Date.now();
  }

  updateEditedAt();
}
