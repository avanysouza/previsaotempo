
const form = document.querySelector("#search-form > form");
const input:HTMLInputElement | null = 
    document.querySelector("#input-local");

//No Typescript é necessario informar o tipo do elemento. Neste caso, foi necessario informar que o input era um HTML ou NULL.

const sectionTempoInfo = document.querySelector("#tempo-info");


form?.addEventListener('submit', async (event) =>{
    event.preventDefault()  //preventDefault impede que o formulario recarregue a pagina
    
    if(!input || !sectionTempoInfo) return  //se input for nulo, para a execucao aqui.

    const localizacao = input.value;

    if(localizacao.length < 3){
        alert('O local precisa ter pelo menos 3 letras');
        return;
    }

    //Pegar a localização e fazer uma requisição (FETCH API)

   try{
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=db6193cda41816cb7e1ea0f72d6b4bdf&lang=pt_br&units=metric`); 

    const dados = await resposta.json();  

    console.log(dados)

    const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    }; 

    sectionTempoInfo.innerHTML = `
    <div class="tempo-dados">
    <h2>${infos.local}</h2>
    <span>${infos.temperatura} Cº</span>    
</div>

    <img src="${infos.icone}">
    `; 

   }catch(err){
    console.log('Houve um erro na obtenção dos dados na API', err);
   }
})