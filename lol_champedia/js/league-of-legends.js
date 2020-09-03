function matches(b) {
  return function(a) {
    return a.toUpperCase().search(b.toUpperCase()) > -1;
  }
}

function equals(b) {
  return function(a) {
    return a == b;
  }
}

function listSelector(method) {
  return function(list, property, func) {
    return list[method](function(element) {
      if (Array.isArray(element[property])) {
        return element[property].some(function(e) {
          return func(e);
        });
      }
      return func(element[property]);
    });
  }
}

function LeagueOfLegends(champList) {
  this.champList = [];
  // Champions list
  // http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json

  this.search = function search(query, subject = 'name') {
    return listSelector('find')(this.champList, subject, matches(query));
  };

  this.filter = function filter(query, subject = 'name') {
    return listSelector('filter')(this.champList, subject, matches(query));
  }

  // Aatrox big image can be found at
  // http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg
  // Thumbnail image can be found at
  // http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/Aatrox.png
  this.champDetails = function champDetails(champ) {
    return {
      id: champ.id,
      name: champ.name,
      title: champ.title,
      info: champ.info,
      description: champ.blurb,
      roles: champ.tags,
      thumbnail: `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champ.id}.png`,
      image: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`
    };
  };

  this.init = function init(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json", false);
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
       this.champList = Object.values(JSON.parse(xhttp.responseText).data).map(this.champDetails);
      }
    }.bind(this);
    xhttp.send();
  };

  if (champList) {
    this.champList = champList;
  } else {
    this.init();
  }
}
