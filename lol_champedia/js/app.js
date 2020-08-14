var lolClient = new LeagueOfLegends();
var championTemplate = document.getElementById('champ-template').content;
var championDetailTemplate = document.getElementById('champ-detail-template').content;
var championsContainers;
var groupedChampionsContainers;
var champList = document.getElementById('champ-list');
var activeChamp = document.querySelector('.champ-active');


function createChampClone(champion, template) {
  var clone = template.cloneNode(true);
  clone = document.importNode(clone, true);

  clone.querySelector('.id').value = champion.id;
  clone.querySelector('.champ-thumbnail').src = champion.thumbnail;
  clone.querySelector('.champ-thumbnail-name').innerHTML = champion.name;
  return clone;
};

championsContainers = lolClient.champList.map(function(champion) {
  return createChampClone(champion, championTemplate);
});

groupedChampionsContainers = championsContainers.reduce(function(arr, node) {
  if (arr[arr.length -1].length < 7) {
    arr[arr.length -1].push(node);
  } else {
    arr.push([node]);
  }
  return arr;
}, [[]]);

groupedChampionsContainers.forEach(function(nodeList) {
  var row = document.createElement('div');
  row.classList.add('row');
  nodeList.forEach(function(node) {
    row.appendChild(node);
  });
  champList.appendChild(row);
});

[].slice.call(document.querySelectorAll('.champ')).forEach(function(element) {
  element.onclick = function(){
    var previousActive = document.querySelector('.champ-active');
    if (previousActive) {
      previousActive.classList.remove('champ-active')
    }
    element.classList.add('champ-active');
    var champion = lolClient.search(element.querySelector('.id').value, 'id');
    var previousDetailActive = champList.querySelector('.champ-detail');
    if (previousDetailActive) {
      champList.removeChild(previousDetailActive);
    }
    element.parentElement.after(createChampDetailClone(champion, championDetailTemplate));
  };
});

function createChampDetailClone(champion, template) {
  var clone = template.cloneNode(true);
  clone = document.importNode(clone, true);
  clone.querySelector('.champ-splash').src = champion.image;
  clone.querySelector('.champ-name').innerHTML = champion.name;
  clone.querySelector('.champ-title').innerHTML = champion.title;
  clone.querySelector('.champ-blurb').innerHTML = champion.description;
  clone.querySelector('.roles').innerHTML = null;
  champion.roles.forEach(function(role) {
    var roleContainer = document.createElement('span');
    roleContainer.classList.add('role');
    roleContainer.innerHTML = role;
    clone.querySelector('.roles').appendChild(roleContainer);
  });
  clone.querySelector('.attack-info').innerHTML = `Attack: ${champion.info.attack}`;
  clone.querySelector('.defense-info').innerHTML = `Defense: ${champion.info.defense}`;
  clone.querySelector('.magic-info').innerHTML = `Magic: ${champion.info.magic}`;
  clone.querySelector('.difficulty-info').innerHTML = `Difficulty: ${champion.info.difficulty}`;

  return clone;
}
