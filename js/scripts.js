const PUBLIC_KEY = "ce794e72b9a2015f13142f7b29bd4b62";
const PRIVATE_KEY = "714cb32eba98796680dd5d82cf4b582843d87224";
var url = "https://gateway.marvel.com:443/v1/public/characters";
var defaultSearch = "&series=16410"; //search padrão usada para não iniciar a página sem nenhum resultado
var nullDesc = "No official description!"
//As próximas 3 váriaveis são utilizadas para criar o link usado para se adquirir os dados para a página
var currentTime =  new Date().getTime();
var hash = CryptoJS.MD5(currentTime + PRIVATE_KEY + PUBLIC_KEY).toString();
var initialUrl = url + "?ts=" + currentTime + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;

function Get(url){
  var Httpreq = new XMLHttpRequest(); //Faz request HTML
  Httpreq.open("GET",url,true);
  Httpreq.onload = function (e) {
    if (Httpreq.readyState === 4) {
      if (Httpreq.status === 200) {
        var marvel = JSON.parse(Httpreq.responseText); //Faz parse do JSON
        var apiData = marvel.data.results;
        if (apiData.length == 0){ //Verifica se a pesquisa não retornou nenhum resultado, exibindo um aviso caso este tenha sido o caso
          $("#no-results").removeAttr("hidden");
        }
        else{
          for(var i = 0; i < apiData.length; i++){ //Percorre o array de resultados
            var newCard = $(".model-card").clone().appendTo("#characters"); //cria um novo cartão de personagem
            //as próximas 18 linhas adicionam o conteúdo do cartão
            $(newCard).find(".card-image img").attr("src", apiData[i].thumbnail.path + "/landscape_incredible." + apiData[i].thumbnail.extension);
            for (var j = 0; j < apiData[i].urls.length; j++){
              if(apiData[i].urls[j].type == "detail"){
                $(newCard).find(".btn:contains('Details')").attr("href", apiData[i].urls[j].url);
              }
              else if(apiData[i].urls[j].type == "comiclink"){
                $(newCard).find(".btn:contains('Comics')").attr("href", apiData[i].urls[j].url);
              }
            }
            $(newCard).find(".char-name").append(apiData[i].name);
            if(apiData[i].description !== ""){
              $(newCard).find(".description").text(apiData[i].description);
              $(newCard).find(".internal-card p").text(apiData[i].description);  
            }
            else{
              $(newCard).find(".description").text(nullDesc);
              $(newCard).find(".internal-card p").text(nullDesc);
            }
            $(newCard).fadeIn(2000); //Animação de fadeIn para os cartões
            $(newCard).removeClass("model-card"); //remove a classe modelo 
          }
        }
      }
    }
  }
  Httpreq.send(null); 
}
//Função chamada na pesquisa
function searchCharacters(){
  $(".card-holder:not(.model-card)").remove(); //Remove os cartões de personagem que não sejam o cartão modelo
  var newTime = new Date().getTime();
  var searchHash = CryptoJS.MD5(newTime + PRIVATE_KEY + PUBLIC_KEY).toString();
  var searchUrl = url + "?ts=" + newTime + "&apikey=" + PUBLIC_KEY + "&hash=" + searchHash + "&nameStartsWith=" + $("#search").val(); //Cria a nova URL de requisição para a pesquisa
  $("#no-results").attr("hidden", "hidden"); //Oculta o aviso de falta de resultados novamente
  if($("#search").val().trim() == ""){ //Verifica se foi pesquisada uma string com espaços em branco, mostrando o aviso caso sim e realizando a pesquisa caso não
    $("#no-results").removeAttr("hidden");    
  }
  else{
    Get(searchUrl);  
  }  
  return false;
}
Get(initialUrl + defaultSearch); //Função que inicia o programa, usando defaultSearch para exibir cartões iniciais;