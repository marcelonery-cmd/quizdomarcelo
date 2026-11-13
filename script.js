const perguntas = [
  {
      pergunta: "Qual é a capital do Brasil?",
      alternativas: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
      correta: 1
  },
  {
      pergunta: "Quanto é 7 x 8?",
      alternativas: ["54", "56", "64", "48"],
      correta: 1
  },
  {
      pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
      alternativas: ["Vênus", "Júpiter", "Marte", "Saturno"],
      correta: 2
  },
  {
      pergunta: "Quantos dias tem um ano bissexto?",
      alternativas: ["365", "364", "366", "367"],
      correta: 2
  },
  {
      pergunta: "Qual é o maior oceano do planeta?",
      alternativas: ["Atlântico", "Índico", "Ártico", "Pacífico"],
      correta: 3
  },
  {
      pergunta: "Quem escreveu Dom Casmurro?",
      alternativas: [
          "Machado de Assis",
          "José de Alencar",
          "Clarice Lispector",
          "Carlos Drummond de Andrade"
      ],
      correta: 0
  },
  {
      pergunta: "Qual é o símbolo químico da água?",
      alternativas: ["CO2", "O2", "H2O", "NaCl"],
      correta: 2
  },
  {
      pergunta: "Quantos lados tem um hexágono?",
      alternativas: ["5", "6", "7", "8"],
      correta: 1
  },
  {
      pergunta: "Qual é o maior mamífero do mundo?",
      alternativas: [
          "Elefante africano",
          "Girafa",
          "Tubarão-branco",
          "Baleia-azul"
      ],
      correta: 3
  },
  {
      pergunta: "Em qual continente fica o Egito?",
      alternativas: ["Ásia", "África", "Europa", "Oceania"],
      correta: 1
  },
  {
      pergunta: "Qual é o resultado de 144 dividido por 12?",
      alternativas: ["10", "11", "12", "14"],
      correta: 2
  },
  {
      pergunta: "Qual destes animais é um mamífero?",
      alternativas: ["Cobra", "Sapo", "Golfinho", "Tartaruga"],
      correta: 2
  },
  {
      pergunta: "Qual é o idioma oficial do Brasil?",
      alternativas: ["Espanhol", "Português", "Inglês", "Francês"],
      correta: 1
  },
  {
      pergunta: "Qual é o maior planeta do Sistema Solar?",
      alternativas: ["Terra", "Marte", "Saturno", "Júpiter"],
      correta: 3
  },
  {
      pergunta: "Quantos minutos tem uma hora?",
      alternativas: ["30", "50", "60", "100"],
      correta: 2
  },
  {
      pergunta: "Qual órgão bombeia o sangue pelo corpo?",
      alternativas: ["Pulmão", "Coração", "Fígado", "Rim"],
      correta: 1
  },
  {
      pergunta: "Em que país ficam as pirâmides de Gizé?",
      alternativas: ["México", "Índia", "Egito", "Grécia"],
      correta: 2
  },
  {
      pergunta: "Qual é a raiz quadrada de 81?",
      alternativas: ["7", "8", "9", "10"],
      correta: 2
  },
  {
      pergunta: "Qual gás as plantas absorvem principalmente na fotossíntese?",
      alternativas: [
          "Oxigênio",
          "Hidrogênio",
          "Nitrogênio",
          "Dióxido de carbono"
      ],
      correta: 3
  },
  {
      pergunta: "Qual é o primeiro elemento da tabela periódica?",
      alternativas: ["Hélio", "Hidrogênio", "Oxigênio", "Carbono"],
      correta: 1
  }
];

// Valores dos prêmios
const premios = [
  1000, 2000, 3000, 5000, 10000,
  20000, 30000, 50000, 75000, 100000,
  150000, 200000, 250000, 300000, 350000,
  400000, 500000, 600000, 750000, 1000000
];

// Elementos HTML
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");
const telaRanking = document.getElementById("tela-ranking");

const campoNome = document.getElementById("nome-jogador");
const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoNumero = document.getElementById("numero-pergunta");
const elementoPontuacao = document.getElementById("pontuacao");
const elementoProgresso = document.getElementById("progresso");
const elementoMensagem = document.getElementById("mensagem");

const btnIniciar = document.getElementById("btn-iniciar");
const btnPular = document.getElementById("btn-pular");
const btnDobro = document.getElementById("btn-dobro");
const btnDesistir = document.getElementById("btn-desistir");
const btnContinuar = document.getElementById("btn-continuar");

let jogador = "";
let indicePergunta = 0;
let premioAtual = 0;
let jogoAtivo = false;
let perguntaRespondida = false;
let pulosRestantes = 3;
let dobroDisponivel = true;
let rodadaDobro = false;
let valorEmDobro = 0;
let premioAntesDoDobro = 0;
let ultimaTela = "inicio";

// Troca de telas
function mostrarTela(tela) {
  [telaInicial, telaJogo, telaFinal, telaRanking].forEach(
      elemento => elemento.classList.add("escondido")
  );

  tela.classList.remove("escondido");
}

// Formata o dinheiro em reais
function formatarDinheiro(valor) {
  return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0
  });
}

// Inicia uma nova partida
function iniciarJogo() {
  const nome = campoNome.value.trim();

  if (!nome) {
      alert("Digite seu nome para começar!");
      campoNome.focus();
      return;
  }

  jogador = nome;
  indicePergunta = 0;
  premioAtual = 0;
  jogoAtivo = true;
  perguntaRespondida = false;
  pulosRestantes = 3;
  dobroDisponivel = true;
  rodadaDobro = false;
  valorEmDobro = 0;
  premioAntesDoDobro = 0;

  ultimaTela = "inicio";
  mostrarTela(telaJogo);
  carregarPergunta();
}

// Exibe a pergunta atual
function carregarPergunta() {
  if (!jogoAtivo) return;

  if (indicePergunta >= perguntas.length) {
      finalizarJogo("vitoria");
      return;
  }

  perguntaRespondida = false;

  const atual = perguntas[indicePergunta];

  elementoNumero.textContent =
      `Pergunta ${indicePergunta + 1} de ${perguntas.length}`;

  elementoPontuacao.textContent =
      `Prêmio: ${formatarDinheiro(premioAtual)}`;

  elementoProgresso.style.width =
      `${(indicePergunta / perguntas.length) * 100}%`;

  elementoPergunta.textContent = atual.pergunta;
  elementoMensagem.textContent = "";
  elementoAlternativas.innerHTML = "";

  btnContinuar.classList.add("escondido");
  btnPular.disabled = pulosRestantes <= 0;
  btnPular.textContent = `⏭ Pular (${pulosRestantes})`;

  btnDobro.disabled = !dobroDisponivel;
  btnDobro.textContent = rodadaDobro
      ? "🎲 Dobro ou nada ativo"
      : "🎲 Dobro ou nada";

  atual.alternativas.forEach((alternativa, indice) => {
      const botao = document.createElement("button");

      botao.className = "alternativa";
      botao.textContent =
          `${String.fromCharCode(65 + indice)}) ${alternativa}`;

      botao.addEventListener("click", () => responder(indice));

      elementoAlternativas.appendChild(botao);
  });
}

// Responde à pergunta
function responder(indice) {
  if (!jogoAtivo || perguntaRespondida) return;

  perguntaRespondida = true;

  const atual = perguntas[indicePergunta];
  const botoes = elementoAlternativas.querySelectorAll("button");
  const acertou = indice === atual.correta;

  botoes.forEach((botao, i) => {
      botao.disabled = true;

      if (i === atual.correta) {
          botao.classList.add("correta");
      } else if (i === indice) {
          botao.classList.add("errada");
      }
  });

  if (acertou) {
      if (rodadaDobro) {
          premioAtual = valorEmDobro * 2;
          rodadaDobro = false;
          valorEmDobro = 0;
          premioAntesDoDobro = 0;
          elementoMensagem.textContent =
              `🎉 Acertou! Seu prêmio foi dobrado para ${formatarDinheiro(premioAtual)}!`;
      } else {
          premioAtual = premios[indicePergunta];
          elementoMensagem.textContent =
              `✅ Resposta correta! Você ganhou ${formatarDinheiro(premioAtual)}!`;
      }

      elementoPontuacao.textContent =
          `Prêmio: ${formatarDinheiro(premioAtual)}`;

      btnContinuar.textContent =
          indicePergunta === perguntas.length - 1
              ? "Conferir resultado"
              : "Próxima pergunta";

      btnContinuar.classList.remove("escondido");
  } else {
      if (rodadaDobro) {
          premioAtual = 0;
          rodadaDobro = false;
          valorEmDobro = 0;
          premioAntesDoDobro = 0;

          elementoMensagem.textContent =
              "❌ Você errou o dobro ou nada e perdeu seu prêmio!";
      } else {
          premioAtual = 0;
          elementoMensagem.textContent =
              "❌ Resposta incorreta! Você perdeu o prêmio desta partida.";
      }

      elementoPontuacao.textContent =
          `Prêmio: ${formatarDinheiro(premioAtual)}`;

      elementoProgresso.style.width =
          `${((indicePergunta + 1) / perguntas.length) * 100}%`;

      btnContinuar.textContent = "Ver resultado";
      btnContinuar.classList.remove("escondido");
  }

  btnPular.disabled = true;
  btnDobro.disabled = true;
}

// Avança para a próxima pergunta
function proximaPergunta() {
  if (!perguntaRespondida) return;

  const botoes = elementoAlternativas.querySelectorAll("button");
  const errou = Array.from(botoes).some(
      botao => botao.classList.contains("errada")
  );

  if (errou) {
      finalizarJogo("erro");
      return;
  }

  indicePergunta++;

  if (indicePergunta >= perguntas.length) {
      finalizarJogo("vitoria");
      return;
  }

  carregarPergunta();
}

// Pula uma pergunta sem ganhar o prêmio dela
function pularPergunta() {
  if (!jogoAtivo || perguntaRespondida || pulosRestantes <= 0) {
      return;
  }

  pulosRestantes--;

  elementoMensagem.textContent =
      "⏭ Pergunta pulada! Nenhum prêmio foi adicionado.";

  indicePergunta++;
  carregarPergunta();
}

// Ativa a opção dobro ou nada
function ativarDobro() {
  if (
      !jogoAtivo ||
      perguntaRespondida ||
      !dobroDisponivel ||
      premioAtual <= 0
  ) {
      alert("Você precisa ganhar algum prêmio antes de usar Dobro ou Nada!");
      return;
  }

  const confirmar = confirm(
      `Seu prêmio atual é ${formatarDinheiro(premioAtual)}.\n` +
      "Se acertar a próxima pergunta, seu prêmio será dobrado.\n" +
      "Se errar, perderá todo o prêmio.\n\nDeseja arriscar?"
  );

  if (!confirmar) return;

  dobroDisponivel = false;
  rodadaDobro = true;
  valorEmDobro = premioAtual;
  premioAntesDoDobro = premioAtual;

  carregarPergunta();

  elementoMensagem.textContent =
      "🎲 Dobro ou Nada ativado! Acerte para dobrar ou erre e perca tudo.";
}

// Desiste e guarda o prêmio acumulado
function desistir() {
  if (!jogoAtivo) return;

  const confirmar = confirm(
      `Deseja desistir e ficar com ${formatarDinheiro(premioAtual)}?`
  );

  if (confirmar) {
      if (rodadaDobro) {
          premioAtual = premioAntesDoDobro;
          rodadaDobro = false;
          valorEmDobro = 0;
          premioAntesDoDobro = 0;
      }

      finalizarJogo("desistencia");
  }
}

// Salva o resultado no ranking
function salvarRanking() {
  let ranking = [];

  try {
      const dados = localStorage.getItem("rankingQuizMilhao");
      ranking = dados ? JSON.parse(dados) : [];

      if (!Array.isArray(ranking)) {
          ranking = [];
      }
  } catch {
      ranking = [];
  }

  ranking.push({
      nome: jogador,
      premio: premioAtual,
      data: new Date().toLocaleDateString("pt-BR")
  });

  ranking.sort((a, b) => b.premio - a.premio);

  // Mantém os 10 melhores resultados
  ranking = ranking.slice(0, 10);

  try {
      localStorage.setItem("rankingQuizMilhao", JSON.stringify(ranking));
  } catch {
      alert("Não foi possível salvar o ranking neste navegador.");
  }
}

// Finaliza a partida
function finalizarJogo(motivo) {
  if (!jogoAtivo) return;

  jogoAtivo = false;
  perguntaRespondida = true;

  salvarRanking();
  mostrarTela(telaFinal);

  const titulo = document.getElementById("resultado-titulo");
  const texto = document.getElementById("resultado-texto");
  const premio = document.getElementById("resultado-premio");

  if (motivo === "vitoria") {
      titulo.textContent = "🏆 Parabéns, milionário!";
      texto.textContent =
          `Você completou as ${perguntas.length} perguntas, ${jogador}!`;
  } else if (motivo === "desistencia") {
      titulo.textContent = "🚪 Você decidiu parar!";
      texto.textContent =
          "Sua partida foi encerrada com o prêmio acumulado.";
  } else {
      titulo.textContent = "Fim de jogo!";
      texto.textContent =
          "Não desanime! Tente novamente para conquistar um prêmio maior.";
  }

  premio.textContent =
      `Prêmio final: ${formatarDinheiro(premioAtual)}`;
}

// Exibe o ranking
function mostrarRanking() {
  const lista = document.getElementById("lista-ranking");
  let ranking = [];

  try {
      ranking = JSON.parse(
          localStorage.getItem("rankingQuizMilhao") || "[]"
      );

      if (!Array.isArray(ranking)) ranking = [];
  } catch {
      ranking = [];
  }

  lista.innerHTML = "";

  if (ranking.length === 0) {
      const item = document.createElement("li");
      item.textContent = "Nenhum resultado registrado ainda.";
      lista.appendChild(item);
  } else {
      ranking.forEach((resultado, indice) => {
          const item = document.createElement("li");

          item.textContent =
              `${indice + 1}º - ${resultado.nome} | ` +
              `${formatarDinheiro(resultado.premio)} | ${resultado.data}`;

          lista.appendChild(item);
      });
  }

  ultimaTela = jogoAtivo ? "jogo" : "inicio";
  mostrarTela(telaRanking);
}

// Limpa o ranking
function limparRanking() {
  const confirmar = confirm(
      "Tem certeza que deseja apagar todo o ranking deste navegador?"
  );

  if (!confirmar) return;

  try {
      localStorage.removeItem("rankingQuizMilhao");
  } catch {
      alert("Não foi possível apagar o ranking.");
      return;
  }

  mostrarRanking();
}

// Eventos dos botões
btnIniciar.addEventListener("click", iniciarJogo);

btnPular.addEventListener("click", pularPergunta);
btnDobro.addEventListener("click", ativarDobro);
btnDesistir.addEventListener("click", desistir);
btnContinuar.addEventListener("click", proximaPergunta);

document.getElementById("btn-ranking-inicial")
  .addEventListener("click", mostrarRanking);

document.getElementById("btn-ranking-final")
  .addEventListener("click", mostrarRanking);

document.getElementById("btn-jogar-novamente")
  .addEventListener("click", iniciarJogo);

document.getElementById("btn-voltar-inicio")
  .addEventListener("click", () => mostrarTela(telaInicial));

document.getElementById("btn-voltar-ranking")
  .addEventListener("click", () => {
      if (ultimaTela === "jogo" && jogoAtivo) {
          mostrarTela(telaJogo);
      } else {
          mostrarTela(telaInicial);
      }
  });

document.getElementById("btn-limpar-ranking")
  .addEventListener("click", limparRanking);

// Permite iniciar com Enter no campo de nome
campoNome.addEventListener("keydown", evento => {
  if (evento.key === "Enter") {
      iniciarJogo();
  }
});