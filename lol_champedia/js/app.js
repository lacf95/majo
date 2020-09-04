var champList = window.localStorage.getItem('champList');
var lolClient = new LeagueOfLegends();
if (champList) {
  var champListStorage = JSON.parse(champList);
  if (champListStorage.expiresAt <= Date.now()) {
    var champListStorage = storageExpire(daysInMiliseconds(2));
    stringifyChampList(champListStorage)
  } else {
    var lolClient = new LeagueOfLegends(champListStorage.champList);
  }
} else {
  var champListStorage = storageExpire(120000);
  stringifyChampList(champListStorage)
}

var championsContainers;
var championTemplate = document.getElementById('champ-template').content;
var championDetailTemplate = document.getElementById('champ-detail-template').content;
var champListContainer = document.getElementById('champ-list');

function createChampDetailClone(champion, template) {
  var clone = template.cloneNode(true);
  clone = document.importNode(clone, true);
  var $ = DOMHelper(clone);
  $.setAttribute('.champ-splash', 'src', champion.image);
  $.setHTML('.champ-name', champion.name);
  $.setHTML('.champ-title', champion.title);
  $.setHTML('.champ-blurb', champion.description);
  $.removeHTML('.roles');
  $.setHTML('.attack-info', `Attack: ${champion.info.attack}`);
  $.setHTML('.defense-info', `Defense: ${champion.info.defense}`);
  $.setHTML('.magic-info', `Magic: ${champion.info.magic}`);
  $.setHTML('.difficulty-info', `Difficulty: ${champion.info.difficulty}`);
  champion.roles
    .map(createRole)
    .forEach(appendElement(clone.querySelector('.roles')));
  return clone;
}

function onSelectChamp(element) {
  element.onclick = function(){
    var previousActive = document.querySelector('.champ-active');
    if (previousActive) {
      previousActive.classList.remove('champ-active')
    }
    element.classList.add('champ-active');
    var champion = lolClient.search(element.querySelector('.id').value, 'id');
    var previousDetailActive = champListContainer.querySelector('.champ-detail');
    if (previousDetailActive) {
      champListContainer.removeChild(previousDetailActive);
    }
    element.parentElement.after(createChampDetailClone(champion, championDetailTemplate));
  };
}

function createChampClone(template) {
  return function (champion) {
    var clone = template.cloneNode(true);
    clone = document.importNode(clone, true);
    var $ = DOMHelper(clone);
    $.setAttribute('.id', 'value', champion.id);
    $.setAttribute('.champ-thumbnail', 'src', champion.thumbnail);
    $.setHTML('.champ-thumbnail-name', champion.name);
    return clone;
  };
}

function renderChamps(champList) {
  champListContainer.innerHTML = null;
  champList
    .map(createChampClone(championTemplate))
    .reduce(groupIn(7), [[]])
    .map(createRow)
    .forEach(appendElement(champListContainer));

  nodeListEach(document.querySelectorAll('.champ'), onSelectChamp);
}

var searchButton = document.getElementById('search');

searchButton.onclick = function(){
  var searchSubjectSelect = document.getElementById('search-subject');
  var searchSubject = searchSubjectSelect.options[searchSubjectSelect.selectedIndex].value;
  var searchQuery = document.getElementById('search-query').value;
  renderChamps(lolClient.filter(searchQuery, searchSubject));
}

renderChamps(lolClient.champList);
