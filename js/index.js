"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-local");
//No Typescript é necessario informar o tipo do elemento. Neste caso, foi necessario informar que o input era um HTML ou NULL.
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); //preventDefault impede que o formulario recarregue a pagina
    if (!input || !sectionTempoInfo)
        return; //se input for nulo, para a execucao aqui.
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert('O local precisa ter pelo menos 3 letras');
        return;
    }
    //Pegar a localização e fazer uma requisição (FETCH API)
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=db6193cda41816cb7e1ea0f72d6b4bdf&lang=pt_br&units=metric`);
        const dados = yield resposta.json();
        console.log(dados);
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
    }
    catch (err) {
        console.log('Houve um erro na obtenção dos dados na API', err);
    }
}));
