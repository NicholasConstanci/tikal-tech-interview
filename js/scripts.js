const PUBLIC_KEY = "ecbaafe8185124c30545aee7ac706798";
const PRIVATE_KEY = "ed02c56aadea3a29963506da597cc92af7268330";
var url = "https://gateway.marvel.com:443/v1/public/characters";
var ts = new Date().getTime();

var hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

url += "?ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;

function Get(url){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",url,true);
  Httpreq.onload = function (e) {
    if (Httpreq.readyState === 4) {
      if (Httpreq.status === 200) {
        var marvel = JSON.parse(Httpreq.responseText);
      }
    }
  }
  Httpreq.send(null);
}


var newCard = $(".model-card").clone().appendTo("#characters");
//$(newCard).children(".card-image img").attr("src","http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/landscape_incredible.jpg");
console.log($(newCard).children(".hero-pic").attr("src"));
$(newCard).children(".char-name").append("Sylver");
$(newCard).children(".description").text("Os Sylvers são muito fofos, quero abraçar eles OwO");
$(newCard).removeClass("model-card");


//Get(url);



