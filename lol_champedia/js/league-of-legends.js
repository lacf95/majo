function LeagueOfLegends(lang) {
  this.champList = [];
  // Champions list
  // http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json

  this.search = function search(query, subject = 'name') {
    if (subject == 'id') {
      return this.champList.find(function(element) {
        return element.id == query;
      });
    }
  };

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

  this.init();
}
