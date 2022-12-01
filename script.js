/*INÍCIO - HOME*/


/*lançamentos*/


function lancamentos() {
    fetch (`https://api.rawg.io/api/games?key=3e95d14eba0041408bb86ffc5134af80`)
    .then(res => res.json())
    .then(data => {
    let str = '';
    titulo.innerHTML = "Lançamentos";
    for (let i = 0; i < data.results.length; i++) {
        let jogo = data.results[i];
        str += `<div class="card col-12 col-sm-6 col-md-3 col-lg-3 card-lancamento" style="width: 18rem; background-color: rgb(42, 42, 51); color: white; margin: 5px 5px;">
            <img class="card-img-top" src="${jogo.background_image}" alt="Card image cap" style="width: 100%;">
            <div class="card-body">
                <h5 class="card-title"><strong>${jogo.name}</strong></h5>
                <p class="card-text">
                <ul>
                    <li>Released: ${jogo.released}</li>
                    <li>Rating: ${jogo.rating}</li>
                    <li>Genre: ${jogo.genres[0].name}</li>
                </ul>
                </p>
                <a href="detalhes.html?id=${jogo.id}" target="_self" class="btn btn-primary">Mais detalhes</a>
            </div>
            </div>`;
    }
    document.getElementById('lancamentos').innerHTML = str;


})

}



/*Publishers*/

function publishers() {
    fetch('https://api.rawg.io/api/publishers?key=3e95d14eba0041408bb86ffc5134af80')
    .then(res => res.json())
    .then(data => {
    let str = '';
    for (let i = 0; i < data.results.length; i++) {
        let publisher = data.results[i];
        let jogo = [];
        for(let j = 0; j<publisher.games.length; j++) {
            jogo[j] = publisher.games[j].name;
        }
        str += `<div class="card col-12 col-sm-6 col-md-4 col-lg-4" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-itens: center; width: 18rem;">
        <img class="card-img-top" src="${publisher.image_background}" alt="Card image cap">
        <div class="card-body">
            <h1 style="font-size: 1.5rem;">${publisher.name}</h1>
            <p class="card-text"><strong><i>Games</i></strong>: ${jogo[0]}, ${jogo[1]}, ${jogo[2]}, ${jogo[3]}, ${jogo[4]} and ${jogo[5]}.</p>
        </div>
      </div>`;
    }
    document.getElementById('publishers').innerHTML = str;


})

}




/*BARRA DE PESQUISA*/



let input_pesquisa = document.querySelector('#inputPesquisa');
let btn_pesquisa = document.querySelector('#pesquisar');
let titulo = document.getElementById('tituloLancamento');

btn_pesquisa.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`https://api.rawg.io/api/games?key=965cf8a1fa7f420387e453ca63050020&search=${$("#inputPesquisa").val()}`)
    .then((resposta) => resposta.json())
    .then((data) => {
      let str = '';

      if(data.results.length==0) {
        titulo.innerHTML = `Nenhum resultado`;
      }
      else {
      for (let i = 0; i < data.results.length; i++) {
        let jogo = data.results[i];
        var generos = [];
        var plataformas = [];

        
        for (let j = 0; j < jogo.genres.length; j++) {
          generos.push(data.results[i].genres[j].name);
        }
        
        for (let l = 0; l < jogo.platforms.length; l++) {
          plataformas.push(data.results[i].platforms[l].platform.name);
        }

         {
            titulo.innerHTML = `Pesquisa "${$("#inputPesquisa").val()}"`;
            str += `<div class="card col-12 col-sm-6 col-md-3 col-lg-3 card-lancamento" style="width: 18rem; background-color: rgb(42, 42, 51); color: white; margin: 5px 5px;">
          <img class="card-img-top" src="${jogo.background_image}" alt="Card image cap" style="width: 100%;">
          <div class="card-body">
              <h5 class="card-title"><strong>${jogo.name}</strong></h5>
              <p class="card-text">
              <ul>
                  <li>Released: ${jogo.released}</li>
                  <li>Rating: ${jogo.rating}</li>
                  <li>Genre: ${jogo.genres[0].name}</li>
              </ul>
              </p>
              <a href="detalhes.html?id=${jogo.id}" target="_self" class="btn btn-primary">Mais detalhes</a>
          </div>
          </div>`;
        }
        /*else if (str==''){
            titulo.innerHTML = `Nenhum resultado`;
        }*/
        document.querySelector('#lancamentos').innerHTML = str;
        
    }
}
   
    });
    
});


input_pesquisa.addEventListener('input', () => {
    if(input_pesquisa.value == '') {
        lancamentos();
    }
});





/*FIM - HOME*/



/*INÍCIO - detalhes.html*/


function carregaJogo(id) {
    fetch (`https://api.rawg.io/api/games/${id}?key=3e95d14eba0041408bb86ffc5134af80`)
    .then(res => res.json())
    .then(data => {
        let str1 = '';
        let str2 = '';
        let game = data;
        let desenvolvedores = [];
        let genero = [];
        let plataformas = [];
        for(let j = 0; j<data.developers.length; j++) {
            desenvolvedores[j] = data.developers[j].name;
        }
        for(let j = 0; j<data.genres.length; j++) {
            genero[j] = data.genres[j].name;
        }
        for(let j = 0; j<data.platforms.length; j++) {
            plataformas[j] = data.platforms[j].platform.name
        }
        str1 += ` <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 imagem_game">
        <img class="card-img-top" src="${game.background_image}" alt="Card image cap" style="width: 100%; height: 100%">
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 texto_jogo">
        <h2><strong>${game.name}</strong></h2>
        <p><strong style="color: rgb(62, 62, 190)">Sobre:</strong> <i>${game.description}</i></p>
        <p><strong style="color: rgb(62, 62, 190)">Platforms:</strong> ${plataformas[0]}, ${plataformas[1]} and ${plataformas[2]}</p>
        <p><strong style="color: rgb(62, 62, 190)">Developer:</strong> ${desenvolvedores[0]}</p>
        <p><strong style="color: rgb(62, 62, 190)">Genre:</strong> ${genero[0]} and ${genero[1]}</p>

    </div>`;
    document.getElementById('banner').innerHTML = str1;
 
  
    str2 += `<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <img class="card-img-top" src="${game.background_image_additional}" alt="Card image cap" style="width: 100%;">
    </div>`

    document.getElementById('imagens').innerHTML = str2;

})

}

/*FIM - detalhes.html*/


    


