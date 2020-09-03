function groupIn(size) {
  return function(arr, node) {
    if (arr[arr.length -1].length < size) {
      arr[arr.length -1].push(node);
    } else {
      arr.push([node]);
    }
    return arr;
  }
}

function createRole(role) {
  var roleContainer = document.createElement('span');
  roleContainer.classList.add('role');
  roleContainer.innerHTML = role;
  return roleContainer;
}

function createRow(nodeList) {
  var row = document.createElement('div');
  row.classList.add('row');
  nodeList.forEach(function(node) {
    row.appendChild(node);
  });
  return row;
}

function appendElement(container) {
  return function(element) {
    container.appendChild(element);
  }
}

function nodeListEach(nodeList, func) {
  return [].slice.call(nodeList).forEach(func);
}

function DOMHelper(node) {
  return {
    setAttribute: function(selector, property, value) {
      node.querySelector(selector).setAttribute(property, value);
    },
    setHTML:  function(selector, value) {
      node.querySelector(selector).innerHTML = value;
    },
    removeHTML: function(selector) {
      node.querySelector(selector).innerHTML = null;
    }
  }
}

function daysInMiliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}
