const ninjaUm = document.getElementById("ninja1");
const ninjaDois = document.getElementById("ninja2");

const vidaNinjaUmEl = document.getElementById("vida-ninja1");
const vidaNinjaDoisEl = document.getElementById("vida-ninja2");
const roundsNinjaUmEl = document.getElementById("rounds-ninja1");
const roundsNinjaDoisEl = document.getElementById("rounds-ninja2");
const fireballNinjaUmEl = document.getElementById("fireball-ninja1");
const fireballNinjaDoisEl = document.getElementById("fireball-ninja2");
const timerEl = document.getElementById("timer");
const roundAtualEl = document.getElementById("round-atual");
const mensagemRoundEl = document.getElementById("mensagem-round");
const overlayTextoEl = document.getElementById("overlay-texto");
const flashOverlayEl = document.getElementById("flash-overlay");
const fatalityScreenEl = document.getElementById("fatality-screen");
const musicaTemaEl = document.getElementById("musica-tema");
const powerNinjaUmEl = document.getElementById("power-ninja1");
const powerNinjaDoisEl = document.getElementById("power-ninja2");
const pauseBtnEl = document.getElementById("pause-btn");
const golpesBtnEl = document.getElementById("golpes-btn");
const golpesModalEl = document.getElementById("golpes-modal");
const fecharGolpesBtnEl = document.getElementById("fechar-golpes-btn");

const ninjaUmNormal = "./img/ninja1.png";
const ninjaUmPulando = "./img/tronco.png";
const ninjaUmAcao = "./img/defesa.png";
const ninjaUmSocandoImg = "./img/socando.png";
const ninjaUmAndandoImg = "./img/andando.png";
const ninjaUmAtordoado = "./img/atordoado.png";
const ninjaUmDano = "./img/dano2.png";
const ninjaPinguim = "./img/pinguim.png";
const imagemOvoPinguim = "./img/ovo_pinguim.png";

const ninjaDoisNormal = "./img/ninja2.png";
const ninjaDoisPulando = "./img/tronco.png";
const ninjaDoisDefendendoImg = "./img/defesa2.png";
const ninjaDoisSocandoImg = "./img/ninja2socando.png";
const ninjaDoisAndandoImg = "./img/andando1.png";
const ninjaDoisAtordoado = "./img/atordoado2.png";
const ninjaDoisDano = "./img/dano.png";

const estadoJogo = {
  PLAYING: "playing",
  ROUND_TRANSITION: "round_transition",
  FINISH_PENDING: "finish_pending",
  FINISH_EXECUTING: "finish_executing",
};

const topPulando = "5px";
const tempoAnimacao = 600;
const tempoFade = 20;
const velocidade = 11;
const cooldownPulo = 1000;
const escalaNormal = 1;
const escalaPulando = 0.5;
const escalaMini = 0.5;
const duracaoMiniMs = 8000;
const compensacaoPinguimY = 36;

const vidaInicial = 100;
const danoSocoNormal = 5;
const danoSocoDefendido = 3;
const danoSocoNormalComPoder = 9;
const danoSocoDefendidoComPoder = 2;
const tempoRoundSegundos = 90;
const cooldownSoco = 400;
const duracaoSoco = 190;
const tempoOverlay = 2000;
const tempoFight = 2000;
const tempoMensagemVitoriaFinal = 3000;
const danoFireball = 8;
const danoFireballComPoder = 6;
const danoExplosaoOvo = 8;
const raioExplosaoOvoPx = 100;
const tempoExplosaoOvoMs = 3000;
const duracaoAnimacaoExplosaoOvoMs = 180;
const velocidadeFireball = 17;
const velocidadeFireballFatality = 16;
const janelaComboMs = 2500;
const intervaloFireballFatality = 120;
const totalFireballsFatality = 30;
const duracaoFlashFatalityMs = 85;
const totalPiscadasFatality = 5;
const duracaoTelaFatalityMs = 3000;
const poderMaximo = 100;
const incrementoPoderSoco = 10;
const duracaoPoderMs = 10000;
const duracaoAnimacaoDanoMs = 400;
const duracaoModoPinguimMs = 9000;
const duracaoLentidaoMs = 5000;
const duracaoControlesInvertidosMs = 6000;
const limiteUsosPoderEspecial = 2;
const multiplicadorVelocidadeLentidao = 0.2;
const intervaloAnimacaoAndandoMs = 120;
const sombraDefesa = "drop-shadow(0 0 16px #ffff00)";
const sombraDano = "drop-shadow(0 0 16px #ff0000)";
const sombraPoder = "drop-shadow(0 0 16px #2fe6ff)";
const sombraLentidao = "drop-shadow(0 0 16px #ff4fc3)";
const sombraControlesInvertidos = "drop-shadow(0 0 16px #31ff6f)";

let timerNinjaUm = null;
let timerNinjaDois = null;
let cooldownNinjaUm = null;
let cooldownNinjaDois = null;
let timerSocoNinjaUm = null;
let timerSocoNinjaDois = null;
let cooldownSocoNinjaUm = null;
let cooldownSocoNinjaDois = null;
let intervaloRound = null;
let timerOverlayAtual = null;
let timerReinicioFinish = null;
let fireballs = [];
let ovosPinguim = [];
let intervaloFatalityFireballs = null;
let intervaloFatalityFlash = null;
let timerFatalityScreen = null;
let timerPoderNinjaUm = null;
let timerPoderNinjaDois = null;
let timerAnimacaoDanoNinjaUm = null;
let timerAnimacaoDanoNinjaDois = null;
let timerLentidaoNinjaUm = null;
let timerLentidaoNinjaDois = null;
let timerControlesInvertidosNinjaUm = null;
let timerControlesInvertidosNinjaDois = null;
let timerMiniNinjaUm = null;
let timerMiniNinjaDois = null;

let deslocamentoNinjaUm = 0;
let deslocamentoNinjaDois = 0;
let direcaoNinjaUm = 1;
let direcaoNinjaDois = -1;
const ajusteBaseNinjaUm = 1;
const ajusteBaseNinjaDois = -1;
const ajusteBasePinguim = -1;
let podePularNinjaUm = true;
let podePularNinjaDois = true;
let ninjaUmPulandoAgora = false;
let ninjaDoisPulandoAgora = false;

let ninjaUmDefendendo = false;
let ninjaDoisDefendendo = false;
let ninjaUmSocandoAgora = false;
let ninjaDoisSocandoAgora = false;
let podeSocarNinjaUm = true;
let podeSocarNinjaDois = true;
let socoNinjaUmJaAcertou = false;
let socoNinjaDoisJaAcertou = false;

let vidaNinjaUm = vidaInicial;
let vidaNinjaDois = vidaInicial;
let tempoRestante = tempoRoundSegundos;
let roundAtual = 1;
let vitoriasNinjaUm = 0;
let vitoriasNinjaDois = 0;
let usosLentidaoNinjaUm = 0;
let usosLentidaoNinjaDois = 0;
let usosControlesInvertidosNinjaUm = 0;
let usosControlesInvertidosNinjaDois = 0;
let fireballsRestantesNinjaUm = 3;
let fireballsRestantesNinjaDois = 3;
let rodadaEncerrada = false;
let timerRoundIniciado = false;
let estadoAtualJogo = estadoJogo.PLAYING;
let vencedorFinish = null;
let perdedorFinish = null;
let golpeFinalExecutado = false;
let comboNinjaUm = [];
let comboNinjaDois = [];
let comboPinguimNinjaUm = [];
let comboPinguimNinjaDois = [];
let comboLentidaoNinjaUm = [];
let comboLentidaoNinjaDois = [];
let comboMiniNinjaUm = [];
let comboMiniNinjaDois = [];
let comboControlesInvertidosNinjaUm = [];
let comboControlesInvertidosNinjaDois = [];
let comboFatalityNinjaUm = [];
let comboFatalityNinjaDois = [];
let fatalitySequenciaAtiva = false;
let fatalityUltimaProcessada = false;
let fatalityFinalizando = false;
let fatalityPassoNinjaUm = 0;
let fatalityPassoNinjaDois = 0;
let poderNinjaUm = 0;
let poderNinjaDois = 0;
let poderAtivoNinjaUm = false;
let poderAtivoNinjaDois = false;
let jogoPausado = false;
let mensagemAntesPausa = "";
let musicaEstavaTocandoAntesPausa = false;
let jogoPausadoAntesListaGolpes = false;
let modoPinguimNinjaUmAtivo = false;
let modoPinguimNinjaDoisAtivo = false;
let lentoNinjaUm = false;
let lentoNinjaDois = false;
let controlesInvertidosNinjaUm = false;
let controlesInvertidosNinjaDois = false;
let miniNinjaUm = false;
let miniNinjaDois = false;
let timerModoPinguimNinjaUm = null;
let timerModoPinguimNinjaDois = null;
let ultimoFrameAndandoNinjaUm = 0;
let ultimoFrameAndandoNinjaDois = 0;
let frameAndandoNinjaUmAtivo = false;
let frameAndandoNinjaDoisAtivo = false;

const teclasPressionadas = {
  KeyA: false,
  KeyD: false,
  ArrowLeft: false,
  ArrowRight: false,
  Digit4: false,
  Digit6: false,
  Numpad4: false,
  Numpad6: false,
};

const topNormalNinjaUm = getComputedStyle(ninjaUm).top;
const topNormalNinjaDois = getComputedStyle(ninjaDois).top;

function iniciarMusicaTema() {
  if (!musicaTemaEl) {
    return;
  }

  musicaTemaEl.volume = 0.6;
  const tentativa = musicaTemaEl.play();

  if (tentativa && typeof tentativa.catch === "function") {
    tentativa.catch(() => {
      // Autoplay pode ser bloqueado; será tentado novamente após interação do usuário.
    });
  }
}

function mostrarOverlay(texto, duracao, aoFinal) {
  if (timerOverlayAtual) {
    clearTimeout(timerOverlayAtual);
    timerOverlayAtual = null;
  }

  overlayTextoEl.textContent = texto;
  overlayTextoEl.classList.add("visible");

  timerOverlayAtual = setTimeout(() => {
    overlayTextoEl.classList.remove("visible");
    timerOverlayAtual = null;
    if (aoFinal) {
      aoFinal();
    }
  }, duracao);
}

function limparTeclasMovimento() {
  teclasPressionadas.KeyA = false;
  teclasPressionadas.KeyD = false;
  teclasPressionadas.ArrowLeft = false;
  teclasPressionadas.ArrowRight = false;
  teclasPressionadas.Digit4 = false;
  teclasPressionadas.Digit6 = false;
  teclasPressionadas.Numpad4 = false;
  teclasPressionadas.Numpad6 = false;
}

function atualizarBotaoPausa() {
  if (!pauseBtnEl) {
    return;
  }

  pauseBtnEl.textContent = jogoPausado ? "Retomar" : "Pausar";
  pauseBtnEl.classList.toggle("paused", jogoPausado);
}

function executarOuReagendarSePausado(callback, atrasoReagendamento = 80) {
  if (jogoPausado) {
    return setTimeout(() => executarOuReagendarSePausado(callback, atrasoReagendamento), atrasoReagendamento);
  }

  callback();
  return null;
}

function alternarPausa() {
  const podePausar =
    estadoAtualJogo === estadoJogo.PLAYING ||
    estadoAtualJogo === estadoJogo.FINISH_PENDING ||
    estadoAtualJogo === estadoJogo.FINISH_EXECUTING;

  if (!podePausar) {
    return;
  }

  jogoPausado = !jogoPausado;
  limparTeclasMovimento();

  if (jogoPausado) {
    mensagemAntesPausa = mensagemRoundEl.textContent;
    definirMensagemRound("Pausado");

    musicaEstavaTocandoAntesPausa = Boolean(musicaTemaEl && !musicaTemaEl.paused);
    if (musicaEstavaTocandoAntesPausa) {
      musicaTemaEl.pause();
    }
  } else {
    definirMensagemRound(mensagemAntesPausa);
    mensagemAntesPausa = "";

    if (musicaEstavaTocandoAntesPausa) {
      iniciarMusicaTema();
      musicaEstavaTocandoAntesPausa = false;
    }
  }

  atualizarBotaoPausa();
}

function abrirListaGolpes() {
  if (!golpesModalEl) {
    return;
  }

  jogoPausadoAntesListaGolpes = jogoPausado;
  if (!jogoPausadoAntesListaGolpes) {
    alternarPausa();
  }

  golpesModalEl.classList.add("visible");
  golpesModalEl.setAttribute("aria-hidden", "false");
}

function fecharListaGolpes() {
  if (!golpesModalEl) {
    return;
  }

  golpesModalEl.classList.remove("visible");
  golpesModalEl.setAttribute("aria-hidden", "true");

  if (!jogoPausadoAntesListaGolpes && jogoPausado) {
    alternarPausa();
  }
}

function podeControlarNinjaUm() {
  if (jogoPausado) {
    return false;
  }

  if (estadoAtualJogo === estadoJogo.FINISH_PENDING || estadoAtualJogo === estadoJogo.FINISH_EXECUTING) {
    return vencedorFinish === 1;
  }

  return estadoAtualJogo === estadoJogo.PLAYING;
}

function podeControlarNinjaDois() {
  if (jogoPausado) {
    return false;
  }

  if (estadoAtualJogo === estadoJogo.FINISH_PENDING || estadoAtualJogo === estadoJogo.FINISH_EXECUTING) {
    return vencedorFinish === 2;
  }

  return estadoAtualJogo === estadoJogo.PLAYING;
}

function aplicarTransformeNinjaUm() {
  const escalaBase = ninjaUmPulandoAgora ? escalaPulando : escalaNormal;
  const escalaAtual = escalaBase * (miniNinjaUm ? escalaMini : 1);
  const compensacaoMiniY = miniNinjaUm && !ninjaUmPulandoAgora
    ? (ninjaUm.offsetHeight * (1 - escalaMini)) / 2
    : 0;
  const compensacaoPinguim = modoPinguimNinjaUmAtivo && !ninjaUmPulandoAgora ? compensacaoPinguimY : 0;
  const compensacaoYTotal = compensacaoMiniY + compensacaoPinguim;
  const ajusteBaseAtual = modoPinguimNinjaUmAtivo ? ajusteBasePinguim : ajusteBaseNinjaUm;
  const escalaX = ajusteBaseAtual * direcaoNinjaUm * escalaAtual;
  ninjaUm.style.transform = `translate(${deslocamentoNinjaUm}px, ${compensacaoYTotal}px) scaleX(${escalaX}) scaleY(${escalaAtual})`;
}

function aplicarTransformeNinjaDois() {
  const escalaBase = ninjaDoisPulandoAgora ? escalaPulando : escalaNormal;
  const escalaAtual = escalaBase * (miniNinjaDois ? escalaMini : 1);
  const compensacaoMiniY = miniNinjaDois && !ninjaDoisPulandoAgora
    ? (ninjaDois.offsetHeight * (1 - escalaMini)) / 2
    : 0;
  const compensacaoPinguim = modoPinguimNinjaDoisAtivo && !ninjaDoisPulandoAgora ? compensacaoPinguimY : 0;
  const compensacaoYTotal = compensacaoMiniY + compensacaoPinguim;
  const ajusteBaseAtual = modoPinguimNinjaDoisAtivo ? ajusteBasePinguim : ajusteBaseNinjaDois;
  const escalaX = ajusteBaseAtual * direcaoNinjaDois * escalaAtual;
  ninjaDois.style.transform = `translate(${deslocamentoNinjaDois}px, ${compensacaoYTotal}px) scaleX(${escalaX}) scaleY(${escalaAtual})`;
}

function atualizarDirecaoNinjas() {
  const rectNinjaUm = ninjaUm.getBoundingClientRect();
  const rectNinjaDois = ninjaDois.getBoundingClientRect();
  const centroNinjaUm = rectNinjaUm.left + rectNinjaUm.width / 2;
  const centroNinjaDois = rectNinjaDois.left + rectNinjaDois.width / 2;

  if (centroNinjaUm < centroNinjaDois) {
    direcaoNinjaUm = 1;
    direcaoNinjaDois = -1;
    return;
  }

  direcaoNinjaUm = -1;
  direcaoNinjaDois = 1;
}

function limitarNaTela(elemento, deslocamentoAtual) {
  const rect = elemento.getBoundingClientRect();
  let deslocamentoLimitado = deslocamentoAtual;

  if (rect.left < 0) {
    deslocamentoLimitado += -rect.left;
  }

  if (rect.right > window.innerWidth) {
    deslocamentoLimitado -= rect.right - window.innerWidth;
  }

  return deslocamentoLimitado;
}

function estaoSeEncostando() {
  const rectNinjaUm = ninjaUm.getBoundingClientRect();
  const rectNinjaDois = ninjaDois.getBoundingClientRect();

  const sobreposicaoHorizontal =
    rectNinjaUm.right >= rectNinjaDois.left && rectNinjaDois.right >= rectNinjaUm.left;
  const sobreposicaoVertical =
    rectNinjaUm.bottom >= rectNinjaDois.top && rectNinjaDois.bottom >= rectNinjaUm.top;

  return sobreposicaoHorizontal && sobreposicaoVertical;
}

function limparSombras() {
  ninjaUm.style.filter = controlesInvertidosNinjaUm
    ? sombraControlesInvertidos
    : (poderAtivoNinjaUm ? sombraPoder : "none");
  ninjaDois.style.filter = controlesInvertidosNinjaDois
    ? sombraControlesInvertidos
    : (poderAtivoNinjaDois ? sombraPoder : "none");
}

function atualizarBarrasPoder() {
  powerNinjaUmEl.style.width = `${poderNinjaUm}%`;
  powerNinjaDoisEl.style.width = `${poderNinjaDois}%`;
  powerNinjaUmEl.classList.toggle("full", poderNinjaUm >= poderMaximo);
  powerNinjaDoisEl.classList.toggle("full", poderNinjaDois >= poderMaximo);
}

function ativarPoderNinjaUm() {
  poderAtivoNinjaUm = true;
  poderNinjaUm = poderMaximo;
  ninjaUm.classList.add("power-active");
  atualizarBarrasPoder();

  if (timerPoderNinjaUm) {
    clearTimeout(timerPoderNinjaUm);
  }

  timerPoderNinjaUm = setTimeout(() => {
    timerPoderNinjaUm = executarOuReagendarSePausado(() => {
      desativarPoderNinjaUm();
    });
  }, duracaoPoderMs);
}

function ativarPoderNinjaDois() {
  poderAtivoNinjaDois = true;
  poderNinjaDois = poderMaximo;
  ninjaDois.classList.add("power-active");
  atualizarBarrasPoder();

  if (timerPoderNinjaDois) {
    clearTimeout(timerPoderNinjaDois);
  }

  timerPoderNinjaDois = setTimeout(() => {
    timerPoderNinjaDois = executarOuReagendarSePausado(() => {
      desativarPoderNinjaDois();
    });
  }, duracaoPoderMs);
}

function desativarPoderNinjaUm() {
  poderAtivoNinjaUm = false;
  poderNinjaUm = 0;
  ninjaUm.classList.remove("power-active");
  atualizarBarrasPoder();

  if (timerPoderNinjaUm) {
    clearTimeout(timerPoderNinjaUm);
    timerPoderNinjaUm = null;
  }
}

function desativarPoderNinjaDois() {
  poderAtivoNinjaDois = false;
  poderNinjaDois = 0;
  ninjaDois.classList.remove("power-active");
  atualizarBarrasPoder();

  if (timerPoderNinjaDois) {
    clearTimeout(timerPoderNinjaDois);
    timerPoderNinjaDois = null;
  }
}

function ganharPoderNinjaUm(valor) {
  if (estadoAtualJogo !== estadoJogo.PLAYING) {
    return;
  }

  poderNinjaUm = Math.min(poderMaximo, poderNinjaUm + valor);
  atualizarBarrasPoder();
}

function ganharPoderNinjaDois(valor) {
  if (estadoAtualJogo !== estadoJogo.PLAYING) {
    return;
  }

  poderNinjaDois = Math.min(poderMaximo, poderNinjaDois + valor);
  atualizarBarrasPoder();
}

function resetarPoderes() {
  if (timerPoderNinjaUm) {
    clearTimeout(timerPoderNinjaUm);
    timerPoderNinjaUm = null;
  }

  if (timerPoderNinjaDois) {
    clearTimeout(timerPoderNinjaDois);
    timerPoderNinjaDois = null;
  }

  poderNinjaUm = 0;
  poderNinjaDois = 0;
  poderAtivoNinjaUm = false;
  poderAtivoNinjaDois = false;
  ninjaUm.classList.remove("power-active");
  ninjaDois.classList.remove("power-active");
  atualizarBarrasPoder();
}

function desativarLentidaoNinjaUm() {
  lentoNinjaUm = false;

  if (timerLentidaoNinjaUm) {
    clearTimeout(timerLentidaoNinjaUm);
    timerLentidaoNinjaUm = null;
  }
}

function desativarLentidaoNinjaDois() {
  lentoNinjaDois = false;

  if (timerLentidaoNinjaDois) {
    clearTimeout(timerLentidaoNinjaDois);
    timerLentidaoNinjaDois = null;
  }
}

function resetarLentidao() {
  desativarLentidaoNinjaUm();
  desativarLentidaoNinjaDois();
}

function desativarControlesInvertidosNinjaUm() {
  controlesInvertidosNinjaUm = false;

  if (timerControlesInvertidosNinjaUm) {
    clearTimeout(timerControlesInvertidosNinjaUm);
    timerControlesInvertidosNinjaUm = null;
  }
}

function desativarControlesInvertidosNinjaDois() {
  controlesInvertidosNinjaDois = false;

  if (timerControlesInvertidosNinjaDois) {
    clearTimeout(timerControlesInvertidosNinjaDois);
    timerControlesInvertidosNinjaDois = null;
  }
}

function resetarControlesInvertidos() {
  desativarControlesInvertidosNinjaUm();
  desativarControlesInvertidosNinjaDois();
}

function ativarControlesInvertidosNoNinja(alvo) {
  if (estadoAtualJogo !== estadoJogo.PLAYING) {
    return false;
  }

  definirMensagemRound("Controles invertidos!");

  if (alvo === 1) {
    controlesInvertidosNinjaUm = true;

    if (timerControlesInvertidosNinjaUm) {
      clearTimeout(timerControlesInvertidosNinjaUm);
    }

    timerControlesInvertidosNinjaUm = setTimeout(() => {
      timerControlesInvertidosNinjaUm = executarOuReagendarSePausado(() => {
        desativarControlesInvertidosNinjaUm();
      });
    }, duracaoControlesInvertidosMs);
    return true;
  }

  controlesInvertidosNinjaDois = true;

  if (timerControlesInvertidosNinjaDois) {
    clearTimeout(timerControlesInvertidosNinjaDois);
  }

  timerControlesInvertidosNinjaDois = setTimeout(() => {
    timerControlesInvertidosNinjaDois = executarOuReagendarSePausado(() => {
      desativarControlesInvertidosNinjaDois();
    });
  }, duracaoControlesInvertidosMs);
  return true;
}

function usarControlesInvertidos(caster) {
  if (caster === 1) {
    if (usosControlesInvertidosNinjaUm >= limiteUsosPoderEspecial) {
      definirMensagemRound("Inverter controle esgotado!");
      return;
    }

    const ativou = ativarControlesInvertidosNoNinja(2);
    if (ativou) {
      usosControlesInvertidosNinjaUm += 1;
    }
    return;
  }

  if (usosControlesInvertidosNinjaDois >= limiteUsosPoderEspecial) {
    definirMensagemRound("Inverter controle esgotado!");
    return;
  }

  const ativou = ativarControlesInvertidosNoNinja(1);
  if (ativou) {
    usosControlesInvertidosNinjaDois += 1;
  }
}

function ativarLentidaoNoNinja(alvo) {
  if (estadoAtualJogo !== estadoJogo.PLAYING) {
    return false;
  }

  if (alvo === 1) {
    if (lentoNinjaUm) {
      return false;
    }

    lentoNinjaUm = true;
    definirMensagemRound("Lentidão!");
    timerLentidaoNinjaUm = setTimeout(() => {
      timerLentidaoNinjaUm = executarOuReagendarSePausado(() => {
        desativarLentidaoNinjaUm();
      });
    }, duracaoLentidaoMs);
    return true;
  }

  if (lentoNinjaDois) {
    return false;
  }

  lentoNinjaDois = true;
  definirMensagemRound("Lentidão!");
  timerLentidaoNinjaDois = setTimeout(() => {
    timerLentidaoNinjaDois = executarOuReagendarSePausado(() => {
      desativarLentidaoNinjaDois();
    });
  }, duracaoLentidaoMs);
  return true;
}

function usarLentidao(caster) {
  if (caster === 1) {
    if (usosLentidaoNinjaUm >= limiteUsosPoderEspecial) {
      definirMensagemRound("Lentidão esgotada!");
      return;
    }

    const ativou = ativarLentidaoNoNinja(2);
    if (ativou) {
      usosLentidaoNinjaUm += 1;
    }
    return;
  }

  if (usosLentidaoNinjaDois >= limiteUsosPoderEspecial) {
    definirMensagemRound("Lentidão esgotada!");
    return;
  }

  const ativou = ativarLentidaoNoNinja(1);
  if (ativou) {
    usosLentidaoNinjaDois += 1;
  }
}

function resetarMini() {
  miniNinjaUm = false;
  miniNinjaDois = false;

  if (timerMiniNinjaUm) {
    clearTimeout(timerMiniNinjaUm);
    timerMiniNinjaUm = null;
  }

  if (timerMiniNinjaDois) {
    clearTimeout(timerMiniNinjaDois);
    timerMiniNinjaDois = null;
  }
}

function ativarMiniNoNinja(alvo) {
  if (estadoAtualJogo !== estadoJogo.PLAYING) {
    return;
  }

  if (alvo === 1) {
    if (miniNinjaUm) {
      return;
    }

    miniNinjaUm = true;
    timerMiniNinjaUm = setTimeout(() => {
      timerMiniNinjaUm = executarOuReagendarSePausado(() => {
        miniNinjaUm = false;
        aplicarTransformeNinjaUm();
      });
    }, duracaoMiniMs);
    aplicarTransformeNinjaUm();
    return;
  }

  if (miniNinjaDois) {
    return;
  }

  miniNinjaDois = true;
  timerMiniNinjaDois = setTimeout(() => {
    timerMiniNinjaDois = executarOuReagendarSePausado(() => {
      miniNinjaDois = false;
      aplicarTransformeNinjaDois();
    });
  }, duracaoMiniMs);
  aplicarTransformeNinjaDois();
}

function desativarModoPinguimNinjaUm() {
  modoPinguimNinjaUmAtivo = false;

  if (timerModoPinguimNinjaUm) {
    clearTimeout(timerModoPinguimNinjaUm);
    timerModoPinguimNinjaUm = null;
  }

  trocarImagemSuave(ninjaUm, ninjaUmNormal);
}

function desativarModoPinguimNinjaDois() {
  modoPinguimNinjaDoisAtivo = false;

  if (timerModoPinguimNinjaDois) {
    clearTimeout(timerModoPinguimNinjaDois);
    timerModoPinguimNinjaDois = null;
  }

  trocarImagemSuave(ninjaDois, ninjaDoisNormal);
}

function ativarModoPinguimNinjaUm() {
  if (modoPinguimNinjaUmAtivo) {
    return;
  }

  modoPinguimNinjaUmAtivo = true;
  ninjaUmDefendendo = false;
  ninjaUmSocandoAgora = false;
  socoNinjaUmJaAcertou = false;
  trocarImagemSuave(ninjaUm, ninjaPinguim);

  timerModoPinguimNinjaUm = setTimeout(() => {
    timerModoPinguimNinjaUm = executarOuReagendarSePausado(() => {
      desativarModoPinguimNinjaUm();
    });
  }, duracaoModoPinguimMs);
}

function ativarModoPinguimNinjaDois() {
  if (modoPinguimNinjaDoisAtivo) {
    return;
  }

  modoPinguimNinjaDoisAtivo = true;
  ninjaDoisDefendendo = false;
  ninjaDoisSocandoAgora = false;
  socoNinjaDoisJaAcertou = false;
  trocarImagemSuave(ninjaDois, ninjaPinguim);

  timerModoPinguimNinjaDois = setTimeout(() => {
    timerModoPinguimNinjaDois = executarOuReagendarSePausado(() => {
      desativarModoPinguimNinjaDois();
    });
  }, duracaoModoPinguimMs);
}

function definirMensagemRound(mensagem) {
  mensagemRoundEl.textContent = mensagem;
}

function atualizarHud() {
  vidaNinjaUmEl.style.width = `${vidaNinjaUm}%`;
  vidaNinjaDoisEl.style.width = `${vidaNinjaDois}%`;
  roundsNinjaUmEl.textContent = `Rounds: ${vitoriasNinjaUm}`;
  roundsNinjaDoisEl.textContent = `Rounds: ${vitoriasNinjaDois}`;
  fireballNinjaUmEl.textContent = `Firebol: ${fireballsRestantesNinjaUm}`;
  fireballNinjaDoisEl.textContent = `Firebol: ${fireballsRestantesNinjaDois}`;
  timerEl.textContent = String(tempoRestante);
  roundAtualEl.textContent = `Round ${roundAtual}`;
  atualizarBarrasPoder();
}


function limparEfeitosFatality() {
  flashOverlayEl.classList.remove("visible");
  fatalityScreenEl.classList.remove("visible");
  fatalitySequenciaAtiva = false;
  fatalityUltimaProcessada = false;
  fatalityFinalizando = false;
  fatalityPassoNinjaUm = 0;
  fatalityPassoNinjaDois = 0;

  if (intervaloFatalityFireballs) {
    clearInterval(intervaloFatalityFireballs);
    intervaloFatalityFireballs = null;
  }

  if (intervaloFatalityFlash) {
    clearInterval(intervaloFatalityFlash);
    intervaloFatalityFlash = null;
  }

  if (timerFatalityScreen) {
    clearTimeout(timerFatalityScreen);
    timerFatalityScreen = null;
  }
}

function voltarParaTelaInicial() {
  window.location.href = "./index.html";
}

function mensagemVitoriaFinal(vencedor) {
  return `Ninja ${vencedor} venceu a partida!`;
}

function finalizarFatalityComTela() {
  if (fatalityFinalizando) {
    return;
  }

  fatalityFinalizando = true;
  estadoAtualJogo = estadoJogo.FINISH_EXECUTING;
  limparTeclasMovimento();

  let alternancias = 0;
  intervaloFatalityFlash = setInterval(() => {
    if (jogoPausado) {
      return;
    }

    flashOverlayEl.classList.toggle("visible");
    alternancias += 1;

    if (alternancias >= totalPiscadasFatality * 2) {
      clearInterval(intervaloFatalityFlash);
      intervaloFatalityFlash = null;
      flashOverlayEl.classList.remove("visible");
      fatalityScreenEl.classList.add("visible");

      timerFatalityScreen = setTimeout(() => {
        timerFatalityScreen = executarOuReagendarSePausado(() => {
          fatalityScreenEl.classList.remove("visible");
          limparEfeitosFatality();
          mostrarOverlay(mensagemVitoriaFinal(vencedorFinish), tempoMensagemVitoriaFinal, () => {
            voltarParaTelaInicial();
          });
          timerFatalityScreen = null;
        });
      }, duracaoTelaFatalityMs);
    }
  }, duracaoFlashFatalityMs);
}

function iniciarSequenciaFatality(vencedor) {
  if (estadoAtualJogo !== estadoJogo.FINISH_PENDING || fatalitySequenciaAtiva) {
    return;
  }

  fatalitySequenciaAtiva = true;
  fatalityUltimaProcessada = false;
  estadoAtualJogo = estadoJogo.FINISH_EXECUTING;
  definirMensagemRound("Fatality!");
  comboPinguimNinjaUm = [];
  comboPinguimNinjaDois = [];
  comboLentidaoNinjaUm = [];
  comboLentidaoNinjaDois = [];
  comboMiniNinjaUm = [];
  comboMiniNinjaDois = [];
  comboControlesInvertidosNinjaUm = [];
  comboControlesInvertidosNinjaDois = [];
  comboFatalityNinjaUm = [];
  comboFatalityNinjaDois = [];
  fatalityPassoNinjaUm = 0;
  fatalityPassoNinjaDois = 0;

  let contador = 0;
  const disparar = () => {
    if (jogoPausado) {
      return;
    }

    contador += 1;
    const ultima = contador === totalFireballsFatality;
    criarFireball(vencedor, {
      fatality: true,
      causaDano: ultima,
      ultimaFatality: ultima,
      consumirContador: false,
    });

    if (ultima) {
      clearInterval(intervaloFatalityFireballs);
      intervaloFatalityFireballs = null;
    }
  };

  disparar();
  intervaloFatalityFireballs = setInterval(disparar, intervaloFireballFatality);
}

function destruirFireball(fireball) {
  fireball.el.remove();
  fireball.ativa = false;
}

function destruirOvoPinguim(ovo) {
  if (ovo.timerExplosao) {
    clearTimeout(ovo.timerExplosao);
    ovo.timerExplosao = null;
  }

  if (ovo.el && ovo.el.parentNode) {
    ovo.el.remove();
  }

  ovo.ativo = false;
}

function limparFireballs() {
  fireballs.forEach((fireball) => {
    fireball.el.remove();
  });
  fireballs = [];
}

function limparOvosPinguim() {
  ovosPinguim.forEach((ovo) => {
    destruirOvoPinguim(ovo);
  });
  ovosPinguim = [];
}

function distanciaPontoParaRetangulo(x, y, rect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.hypot(dx, dy);
}

function explodirOvoPinguim(ovo) {
  if (!ovo.ativo) {
    return;
  }

  const alvo = ovo.dono === 1 ? ninjaDois : ninjaUm;
  const rectAlvo = alvo.getBoundingClientRect();
  const distancia = distanciaPontoParaRetangulo(ovo.x, ovo.y, rectAlvo);

  if (distancia <= raioExplosaoOvoPx) {
    if (ovo.dono === 1) {
      aplicarDanoNoNinjaDois(danoExplosaoOvo);
    } else {
      aplicarDanoNoNinjaUm(danoExplosaoOvo);
    }
  }

  ovo.el.classList.add("explodindo");
  ovo.timerExplosao = setTimeout(() => {
    destruirOvoPinguim(ovo);
    ovosPinguim = ovosPinguim.filter((item) => item.ativo);
  }, duracaoAnimacaoExplosaoOvoMs);
}

function criarOvoPinguim(dono) {
  if (estadoAtualJogo !== estadoJogo.PLAYING || jogoPausado) {
    return false;
  }

  if ((dono === 1 && !modoPinguimNinjaUmAtivo) || (dono === 2 && !modoPinguimNinjaDoisAtivo)) {
    return false;
  }

  const jaTemOvoAtivo = ovosPinguim.some((ovo) => ovo.ativo && ovo.dono === dono);
  if (jaTemOvoAtivo) {
    return false;
  }

  const origem = dono === 1 ? ninjaUm : ninjaDois;
  const rectOrigem = origem.getBoundingClientRect();
  const x = rectOrigem.left + rectOrigem.width / 2;
  const y = rectOrigem.bottom - 16;

  const el = document.createElement("div");
  el.className = "ovo-pinguim";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.backgroundImage = `url("${imagemOvoPinguim}")`;
  document.body.appendChild(el);

  const ovo = {
    dono,
    x,
    y,
    el,
    ativo: true,
    timerExplosao: null,
  };

  ovo.timerExplosao = setTimeout(() => {
    ovo.timerExplosao = executarOuReagendarSePausado(() => {
      explodirOvoPinguim(ovo);
    });
  }, tempoExplosaoOvoMs);

  ovosPinguim.push(ovo);
  return true;
}

function criarFireball(dono, opcoes = {}) {
  const ehFatality = Boolean(opcoes.fatality);
  const podeCriarNoEstado =
    estadoAtualJogo === estadoJogo.PLAYING || (ehFatality && estadoAtualJogo === estadoJogo.FINISH_EXECUTING);

  if (!podeCriarNoEstado) {
    return;
  }

  if ((dono === 1 && modoPinguimNinjaUmAtivo) || (dono === 2 && modoPinguimNinjaDoisAtivo)) {
    return;
  }

  const consumirContador = opcoes.consumirContador !== false;

  if (dono === 1 && consumirContador && fireballsRestantesNinjaUm <= 0) {
    return;
  }

  if (dono === 2 && consumirContador && fireballsRestantesNinjaDois <= 0) {
    return;
  }

  const origem = dono === 1 ? ninjaUm : ninjaDois;
  const rectOrigem = origem.getBoundingClientRect();
  const direcao = dono === 1 ? 1 : -1;
  const inicioX = dono === 1 ? rectOrigem.right - 8 : rectOrigem.left - 18;
  const inicioY = rectOrigem.top + rectOrigem.height * 0.45;

  const el = document.createElement("div");
  el.className = "fireball";
  if (dono === 2) {
    el.classList.add("fireball-left");
  }
  document.body.appendChild(el);

  const fireball = {
    dono,
    direcao,
    x: inicioX,
    y: inicioY,
    el,
    ativa: true,
    fatality: ehFatality,
    causaDano: opcoes.causaDano !== false,
    ultimaFatality: Boolean(opcoes.ultimaFatality),
    velocidade: ehFatality ? velocidadeFireballFatality : velocidadeFireball,
    seguirAlvo: opcoes.seguirAlvo !== false,
  };

  el.style.left = `${fireball.x}px`;
  el.style.top = `${fireball.y}px`;
  fireballs.push(fireball);

  if (consumirContador) {
    if (dono === 1) {
      fireballsRestantesNinjaUm -= 1;
    } else {
      fireballsRestantesNinjaDois -= 1;
    }
  }

  atualizarHud();
}


function limparEstadosAcao() {
  ninjaUmDefendendo = false;
  ninjaDoisDefendendo = false;
  ninjaUmSocandoAgora = false;
  ninjaDoisSocandoAgora = false;
  socoNinjaUmJaAcertou = false;
  socoNinjaDoisJaAcertou = false;
}

function iniciarTimerRound() {
  timerRoundIniciado = true;
  clearInterval(intervaloRound);

  intervaloRound = setInterval(() => {
    if (jogoPausado || rodadaEncerrada || estadoAtualJogo !== estadoJogo.PLAYING) {
      return;
    }

    tempoRestante -= 1;

    if (tempoRestante <= 0) {
      tempoRestante = 0;
      atualizarHud();

      if (vidaNinjaUm > vidaNinjaDois) {
        finalizarRound(1);
      } else if (vidaNinjaDois > vidaNinjaUm) {
        finalizarRound(2);
      } else {
        finalizarRound(0);
      }

      return;
    }

    atualizarHud();
  }, 1000);
}

function aplicarDanoNoNinjaUm(dano) {
  if (rodadaEncerrada || estadoAtualJogo !== estadoJogo.PLAYING) {
    return false;
  }

  if (modoPinguimNinjaUmAtivo) {
    return false;
  }

  if (ninjaUmPulandoAgora) {
    return false;
  }

  vidaNinjaUm = Math.max(0, vidaNinjaUm - dano);
  animarDanoNinjaUm();
  atualizarHud();

  if (vidaNinjaUm === 0) {
    finalizarRound(2);
  }

  return true;
}

function aplicarDanoNoNinjaDois(dano) {
  if (rodadaEncerrada || estadoAtualJogo !== estadoJogo.PLAYING) {
    return false;
  }

  if (modoPinguimNinjaDoisAtivo) {
    return false;
  }

  if (ninjaDoisPulandoAgora) {
    return false;
  }

  vidaNinjaDois = Math.max(0, vidaNinjaDois - dano);
  animarDanoNinjaDois();
  atualizarHud();

  if (vidaNinjaDois === 0) {
    finalizarRound(1);
  }

  return true;
}

function atualizarFireballs() {
  const podeAtualizar =
    !jogoPausado &&
    (estadoAtualJogo === estadoJogo.PLAYING || estadoAtualJogo === estadoJogo.FINISH_EXECUTING);

  if (!podeAtualizar) {
    if (fireballs.length > 0) {
      limparFireballs();
    }
    return;
  }

  const rectNinjaUm = ninjaUm.getBoundingClientRect();
  const rectNinjaDois = ninjaDois.getBoundingClientRect();

  fireballs = fireballs.filter((fireball) => {
    if (!fireball.ativa) {
      return false;
    }

    if (fireball.seguirAlvo) {
      const alvo = fireball.dono === 1 ? rectNinjaDois : rectNinjaUm;
      const alvoX = alvo.left + alvo.width / 2;
      const alvoY = alvo.top + alvo.height / 2;
      const dx = alvoX - fireball.x;
      const dy = alvoY - fireball.y;
      const distancia = Math.hypot(dx, dy) || 1;

      fireball.x += (dx / distancia) * fireball.velocidade;
      fireball.y += (dy / distancia) * fireball.velocidade;

      if (dx < 0) {
        fireball.el.classList.add("fireball-left");
      } else {
        fireball.el.classList.remove("fireball-left");
      }
    } else {
      fireball.x += fireball.velocidade * fireball.direcao;
    }

    fireball.el.style.left = `${fireball.x}px`;
    fireball.el.style.top = `${fireball.y}px`;

    const rectFireball = fireball.el.getBoundingClientRect();
    const acertouNinjaUm =
      fireball.dono === 2 &&
      rectFireball.right >= rectNinjaUm.left &&
      rectFireball.left <= rectNinjaUm.right &&
      rectFireball.bottom >= rectNinjaUm.top &&
      rectFireball.top <= rectNinjaUm.bottom;

    const acertouNinjaDois =
      fireball.dono === 1 &&
      rectFireball.right >= rectNinjaDois.left &&
      rectFireball.left <= rectNinjaDois.right &&
      rectFireball.bottom >= rectNinjaDois.top &&
      rectFireball.top <= rectNinjaDois.bottom;

    if (acertouNinjaUm) {
      if (fireball.causaDano) {
        const dano = poderAtivoNinjaUm ? danoFireballComPoder : danoFireball;
        aplicarDanoNoNinjaUm(dano);
      }
      if (fireball.ultimaFatality && !fatalityUltimaProcessada) {
        fatalityUltimaProcessada = true;
        finalizarFatalityComTela();
      }
      destruirFireball(fireball);
      return false;
    }

    if (acertouNinjaDois) {
      if (fireball.causaDano) {
        const dano = poderAtivoNinjaDois ? danoFireballComPoder : danoFireball;
        aplicarDanoNoNinjaDois(dano);
      }
      if (fireball.ultimaFatality && !fatalityUltimaProcessada) {
        fatalityUltimaProcessada = true;
        finalizarFatalityComTela();
      }
      destruirFireball(fireball);
      return false;
    }

    const saiuNaParede = fireball.x < -50 || fireball.x > window.innerWidth + 50;
    if (saiuNaParede) {
      destruirFireball(fireball);
      return false;
    }

    return true;
  });
}

function atualizarSombrasCombate() {
  limparSombras();

  if (jogoPausado || estadoAtualJogo !== estadoJogo.PLAYING || rodadaEncerrada) {
    return;
  }

  if (ninjaUmDefendendo) {
    ninjaUm.style.filter = sombraDefesa;
  }

  if (ninjaDoisDefendendo) {
    ninjaDois.style.filter = sombraDefesa;
  }

  if (lentoNinjaUm && !ninjaUmDefendendo) {
    ninjaUm.style.filter = sombraLentidao;
  }

  if (lentoNinjaDois && !ninjaDoisDefendendo) {
    ninjaDois.style.filter = sombraLentidao;
  }

  if (!estaoSeEncostando()) {
    if (controlesInvertidosNinjaUm) {
      ninjaUm.style.filter = sombraControlesInvertidos;
    }

    if (controlesInvertidosNinjaDois) {
      ninjaDois.style.filter = sombraControlesInvertidos;
    }

    return;
  }

  if (ninjaUmSocandoAgora) {
    if (ninjaDoisDefendendo) {
      ninjaDois.style.filter = sombraDefesa;
    } else {
      ninjaDois.style.filter = sombraDano;
    }

    if (!socoNinjaUmJaAcertou) {
      const dano = ninjaDoisDefendendo
        ? (poderAtivoNinjaDois ? danoSocoDefendidoComPoder : danoSocoDefendido)
        : (poderAtivoNinjaDois ? danoSocoNormalComPoder : danoSocoNormal);
      const acertou = aplicarDanoNoNinjaDois(dano);
      if (acertou && !ninjaDoisDefendendo) {
        ganharPoderNinjaDois(incrementoPoderSoco);
      }
      if (acertou) {
        socoNinjaUmJaAcertou = true;
      }
    }
  }

  if (ninjaDoisSocandoAgora) {
    if (ninjaUmDefendendo) {
      ninjaUm.style.filter = sombraDefesa;
    } else {
      ninjaUm.style.filter = sombraDano;
    }

    if (!socoNinjaDoisJaAcertou) {
      const dano = ninjaUmDefendendo
        ? (poderAtivoNinjaUm ? danoSocoDefendidoComPoder : danoSocoDefendido)
        : (poderAtivoNinjaUm ? danoSocoNormalComPoder : danoSocoNormal);
      const acertou = aplicarDanoNoNinjaUm(dano);
      if (acertou && !ninjaUmDefendendo) {
        ganharPoderNinjaUm(incrementoPoderSoco);
      }
      if (acertou) {
        socoNinjaDoisJaAcertou = true;
      }
    }
  }

  if (controlesInvertidosNinjaUm) {
    ninjaUm.style.filter = sombraControlesInvertidos;
  }

  if (controlesInvertidosNinjaDois) {
    ninjaDois.style.filter = sombraControlesInvertidos;
  }
}

function atualizarAnimacaoAndando() {
  const agora = Date.now();
  const ninjaUmPodeAnimar =
    estadoAtualJogo === estadoJogo.PLAYING &&
    !modoPinguimNinjaUmAtivo &&
    !ninjaUmPulandoAgora &&
    !ninjaUmDefendendo &&
    !ninjaUmSocandoAgora &&
    !timerAnimacaoDanoNinjaUm;
  const ninjaDoisPodeAnimar =
    estadoAtualJogo === estadoJogo.PLAYING &&
    !modoPinguimNinjaDoisAtivo &&
    !ninjaDoisPulandoAgora &&
    !ninjaDoisDefendendo &&
    !ninjaDoisSocandoAgora &&
    !timerAnimacaoDanoNinjaDois;

  const ninjaUmAndando =
    (teclasPressionadas.KeyA || teclasPressionadas.KeyD) &&
    podeControlarNinjaUm();
  const ninjaDoisAndando =
    (
      teclasPressionadas.ArrowLeft ||
      teclasPressionadas.Digit4 ||
      teclasPressionadas.Numpad4 ||
      teclasPressionadas.ArrowRight ||
      teclasPressionadas.Digit6 ||
      teclasPressionadas.Numpad6
    ) &&
    podeControlarNinjaDois();

  if (ninjaUmPodeAnimar && ninjaUmAndando) {
    if (agora - ultimoFrameAndandoNinjaUm >= intervaloAnimacaoAndandoMs) {
      frameAndandoNinjaUmAtivo = !frameAndandoNinjaUmAtivo;
      ultimoFrameAndandoNinjaUm = agora;
      trocarImagemSuave(ninjaUm, frameAndandoNinjaUmAtivo ? ninjaUmAndandoImg : ninjaUmNormal);
    }
  } else {
    if (frameAndandoNinjaUmAtivo) {
      frameAndandoNinjaUmAtivo = false;
      trocarImagemSuave(ninjaUm, ninjaUmNormal);
    }
  }

  if (ninjaDoisPodeAnimar && ninjaDoisAndando) {
    if (agora - ultimoFrameAndandoNinjaDois >= intervaloAnimacaoAndandoMs) {
      frameAndandoNinjaDoisAtivo = !frameAndandoNinjaDoisAtivo;
      ultimoFrameAndandoNinjaDois = agora;
      trocarImagemSuave(ninjaDois, frameAndandoNinjaDoisAtivo ? ninjaDoisAndandoImg : ninjaDoisNormal);
    }
  } else {
    if (frameAndandoNinjaDoisAtivo) {
      frameAndandoNinjaDoisAtivo = false;
      trocarImagemSuave(ninjaDois, ninjaDoisNormal);
    }
  }
}

function iniciarNovoRound() {
  jogoPausado = false;
  mensagemAntesPausa = "";
  musicaEstavaTocandoAntesPausa = false;
  atualizarBotaoPausa();

  estadoAtualJogo = estadoJogo.ROUND_TRANSITION;
  rodadaEncerrada = false;
  timerRoundIniciado = false;
  tempoRestante = tempoRoundSegundos;
  vidaNinjaUm = vidaInicial;
  vidaNinjaDois = vidaInicial;

  deslocamentoNinjaUm = 0;
  deslocamentoNinjaDois = 0;

  podePularNinjaUm = true;
  podePularNinjaDois = true;
  ninjaUmPulandoAgora = false;
  ninjaDoisPulandoAgora = false;

  podeSocarNinjaUm = true;
  podeSocarNinjaDois = true;
  limparEstadosAcao();
  limparTeclasMovimento();
  comboNinjaUm = [];
  comboNinjaDois = [];
  comboPinguimNinjaUm = [];
  comboPinguimNinjaDois = [];
  comboLentidaoNinjaUm = [];
  comboLentidaoNinjaDois = [];
  comboMiniNinjaUm = [];
  comboMiniNinjaDois = [];
  comboControlesInvertidosNinjaUm = [];
  comboControlesInvertidosNinjaDois = [];
  comboFatalityNinjaUm = [];
  comboFatalityNinjaDois = [];
  fatalityPassoNinjaUm = 0;
  fatalityPassoNinjaDois = 0;
  limparFireballs();
  limparOvosPinguim();

  if (timerAnimacaoDanoNinjaDois) {
    clearTimeout(timerAnimacaoDanoNinjaDois);
    timerAnimacaoDanoNinjaDois = null;
  }

  if (timerAnimacaoDanoNinjaUm) {
    clearTimeout(timerAnimacaoDanoNinjaUm);
    timerAnimacaoDanoNinjaUm = null;
  }

  desativarModoPinguimNinjaUm();
  desativarModoPinguimNinjaDois();
  resetarLentidao();
  resetarMini();
  resetarControlesInvertidos();
  frameAndandoNinjaUmAtivo = false;
  frameAndandoNinjaDoisAtivo = false;
  ultimoFrameAndandoNinjaUm = 0;
  ultimoFrameAndandoNinjaDois = 0;

  vencedorFinish = null;
  perdedorFinish = null;
  golpeFinalExecutado = false;

  ninjaUm.style.top = topNormalNinjaUm;
  ninjaDois.style.top = topNormalNinjaDois;
  trocarImagemSuave(ninjaUm, ninjaUmNormal);
  trocarImagemSuave(ninjaDois, ninjaDoisNormal);
  limparSombras();
  aplicarTransformeNinjaUm();
  aplicarTransformeNinjaDois();

  atualizarHud();
  definirMensagemRound("");
  clearInterval(intervaloRound);

  if (timerReinicioFinish) {
    clearTimeout(timerReinicioFinish);
    timerReinicioFinish = null;
  }

  mostrarOverlay("FIGHT", tempoFight, () => {
    estadoAtualJogo = estadoJogo.PLAYING;
    iniciarTimerRound();
  });
}

function iniciarPartidaNovaCompleta() {
  roundAtual = 1;
  vitoriasNinjaUm = 0;
  vitoriasNinjaDois = 0;
  usosLentidaoNinjaUm = 0;
  usosLentidaoNinjaDois = 0;
  usosControlesInvertidosNinjaUm = 0;
  usosControlesInvertidosNinjaDois = 0;
  fireballsRestantesNinjaUm = 3;
  fireballsRestantesNinjaDois = 3;
  resetarPoderes();
  iniciarNovoRound();
}

function iniciarEstadoFinish(vencedor) {
  estadoAtualJogo = estadoJogo.FINISH_PENDING;
  vencedorFinish = vencedor;
  perdedorFinish = vencedor === 1 ? 2 : 1;
  golpeFinalExecutado = false;

  limparTeclasMovimento();
  limparEstadosAcao();
  comboNinjaUm = [];
  comboNinjaDois = [];
  comboPinguimNinjaUm = [];
  comboPinguimNinjaDois = [];
  comboLentidaoNinjaUm = [];
  comboLentidaoNinjaDois = [];
  comboMiniNinjaUm = [];
  comboMiniNinjaDois = [];
  comboControlesInvertidosNinjaUm = [];
  comboControlesInvertidosNinjaDois = [];
  comboFatalityNinjaUm = [];
  comboFatalityNinjaDois = [];
  fatalityPassoNinjaUm = 0;
  fatalityPassoNinjaDois = 0;
  limparFireballs();
  limparOvosPinguim();
  podeSocarNinjaUm = true;
  podeSocarNinjaDois = true;
  desativarModoPinguimNinjaUm();
  desativarModoPinguimNinjaDois();
  resetarLentidao();
  resetarMini();
  resetarControlesInvertidos();

  if (perdedorFinish === 1) {
    trocarImagemSuave(ninjaUm, ninjaUmAtordoado);
    trocarImagemSuave(ninjaDois, ninjaDoisNormal);
  } else {
    trocarImagemSuave(ninjaDois, ninjaDoisAtordoado);
    trocarImagemSuave(ninjaUm, ninjaUmNormal);
  }

  definirMensagemRound("Golpe final!");
}

function executarGolpeFinal(vencedor) {
  if (estadoAtualJogo !== estadoJogo.FINISH_PENDING || golpeFinalExecutado) {
    return;
  }

  if (!estaoSeEncostando()) {
    return;
  }

  const conseguiu = vencedor === 1 ? socoNinjaUm(true) : socoNinjaDois(true);

  if (!conseguiu) {
    return;
  }

  golpeFinalExecutado = true;
  estadoAtualJogo = estadoJogo.FINISH_EXECUTING;
  mostrarOverlay(mensagemVitoriaFinal(vencedor), tempoMensagemVitoriaFinal, () => {
    voltarParaTelaInicial();
  });
}

function finalizarRound(vencedor) {
  if (rodadaEncerrada) {
    return;
  }

  rodadaEncerrada = true;
  estadoAtualJogo = estadoJogo.ROUND_TRANSITION;
  clearInterval(intervaloRound);
  limparTeclasMovimento();
  comboNinjaUm = [];
  comboNinjaDois = [];
  comboPinguimNinjaUm = [];
  comboPinguimNinjaDois = [];
  comboLentidaoNinjaUm = [];
  comboLentidaoNinjaDois = [];
  comboMiniNinjaUm = [];
  comboMiniNinjaDois = [];
  comboControlesInvertidosNinjaUm = [];
  comboControlesInvertidosNinjaDois = [];
  comboFatalityNinjaUm = [];
  comboFatalityNinjaDois = [];
  fatalityPassoNinjaUm = 0;
  fatalityPassoNinjaDois = 0;
  limparFireballs();
  limparOvosPinguim();
  desativarModoPinguimNinjaUm();
  desativarModoPinguimNinjaDois();
  resetarLentidao();
  resetarMini();
  resetarControlesInvertidos();

  if (vencedor === 1) {
    vitoriasNinjaUm += 1;
    definirMensagemRound("Ninja 1 venceu o round!");
  } else if (vencedor === 2) {
    vitoriasNinjaDois += 1;
    definirMensagemRound("Ninja 2 venceu o round!");
  } else {
    definirMensagemRound("Empate no round!");
  }

  atualizarHud();

  if (vitoriasNinjaUm === 2 || vitoriasNinjaDois === 2) {
    const campeao = vitoriasNinjaUm === 2 ? 1 : 2;

    mostrarOverlay("Finish", tempoOverlay, () => {
      iniciarEstadoFinish(campeao);
    });

    return;
  }

  if (roundAtual < 3) {
    roundAtual += 1;
  }

  let textoRound = "Raund Two";
  if (roundAtual === 3 || (vitoriasNinjaUm === 1 && vitoriasNinjaDois === 1)) {
    roundAtual = 3;
    textoRound = "Raund Three";
  }

  mostrarOverlay(textoRound, tempoOverlay, () => {
    iniciarNovoRound();
  });
}

function atualizarPosicao() {
  if (jogoPausado) {
    requestAnimationFrame(atualizarPosicao);
    return;
  }

  const velocidadeNinjaUm = lentoNinjaUm ? velocidade * multiplicadorVelocidadeLentidao : velocidade;
  const velocidadeNinjaDois = lentoNinjaDois ? velocidade * multiplicadorVelocidadeLentidao : velocidade;

  if (teclasPressionadas.KeyA && podeControlarNinjaUm()) {
    deslocamentoNinjaUm += controlesInvertidosNinjaUm ? velocidadeNinjaUm : -velocidadeNinjaUm;
  }

  if (teclasPressionadas.KeyD && podeControlarNinjaUm()) {
    deslocamentoNinjaUm += controlesInvertidosNinjaUm ? -velocidadeNinjaUm : velocidadeNinjaUm;
  }

  if ((teclasPressionadas.ArrowLeft || teclasPressionadas.Digit4 || teclasPressionadas.Numpad4) && podeControlarNinjaDois()) {
    deslocamentoNinjaDois += controlesInvertidosNinjaDois ? velocidadeNinjaDois : -velocidadeNinjaDois;
  }

  if ((teclasPressionadas.ArrowRight || teclasPressionadas.Digit6 || teclasPressionadas.Numpad6) && podeControlarNinjaDois()) {
    deslocamentoNinjaDois += controlesInvertidosNinjaDois ? -velocidadeNinjaDois : velocidadeNinjaDois;
  }

  atualizarDirecaoNinjas();

  aplicarTransformeNinjaUm();
  deslocamentoNinjaUm = limitarNaTela(ninjaUm, deslocamentoNinjaUm);
  aplicarTransformeNinjaUm();

  aplicarTransformeNinjaDois();
  deslocamentoNinjaDois = limitarNaTela(ninjaDois, deslocamentoNinjaDois);
  aplicarTransformeNinjaDois();

  atualizarAnimacaoAndando();
  atualizarSombrasCombate();
  atualizarFireballs();
  requestAnimationFrame(atualizarPosicao);
}

document.addEventListener("keydown", (evento) => {
  if (evento.code === "Escape" && golpesModalEl && golpesModalEl.classList.contains("visible")) {
    evento.preventDefault();
    fecharListaGolpes();
    return;
  }

  if (golpesModalEl && golpesModalEl.classList.contains("visible")) {
    if (evento.code in teclasPressionadas) {
      teclasPressionadas[evento.code] = false;
    }
    evento.preventDefault();
    return;
  }

  if (jogoPausado) {
    if (evento.code in teclasPressionadas) {
      evento.preventDefault();
    }
    return;
  }

  if (evento.code in teclasPressionadas) {
    evento.preventDefault();

    if ((evento.code === "KeyA" || evento.code === "KeyD") && !podeControlarNinjaUm()) {
      return;
    }

    if ((evento.code === "ArrowLeft" || evento.code === "ArrowRight") && !podeControlarNinjaDois()) {
      return;
    }

    if (
      (
        evento.code === "Digit4" ||
        evento.code === "Digit6" ||
        evento.code === "Numpad4" ||
        evento.code === "Numpad6"
      ) &&
      !podeControlarNinjaDois()
    ) {
      return;
    }

    teclasPressionadas[evento.code] = true;
    return;
  }

  if (estadoAtualJogo === estadoJogo.FINISH_PENDING) {
    evento.preventDefault();
    if (evento.repeat) {
      return;
    }

    if (vencedorFinish === 1) {
      processarComboFatalityNinjaUm(evento.code);

      if (evento.code === "KeyW") {
        animarNinjaUm();
        return;
      }

      if (evento.code === "KeyS") {
        acaoNinjaUm();
        return;
      }

      if (teclaSocoNinjaUm(evento.code)) {
        executarGolpeFinal(1);
      }
      return;
    }

    if (vencedorFinish === 2) {
      processarComboFatalityNinjaDois(evento.code);

      if (evento.code === "ArrowUp" || evento.code === "Digit8" || evento.code === "Numpad8") {
        animarNinjaDois();
        return;
      }

      if (evento.code === "ArrowDown" || evento.code === "Digit5" || evento.code === "Numpad5") {
        acaoNinjaDois();
        return;
      }

      if (teclaSocoNinjaDois(evento.code)) {
        executarGolpeFinal(2);
      }
    }

    return;
  }

  if (estadoAtualJogo !== estadoJogo.PLAYING) {
    return;
  }

  if (!evento.repeat) {
    if (evento.code === "KeyQ" && poderNinjaUm >= poderMaximo && !poderAtivoNinjaUm) {
      evento.preventDefault();
      ativarPoderNinjaUm();
      return;
    }

    if (
      (evento.code === "ShiftRight" || evento.code === "Digit7" || evento.code === "Numpad7") &&
      poderNinjaDois >= poderMaximo &&
      !poderAtivoNinjaDois
    ) {
      evento.preventDefault();
      ativarPoderNinjaDois();
      return;
    }
  }

  if (!evento.repeat) {
    const tokenPinguimUm = tokenPinguimNinjaUm(evento.code);
    if (tokenPinguimUm) {
      registrarEntradaCombo(
        comboPinguimNinjaUm,
        tokenPinguimUm,
        ["S", "SHIFT", "S", "W"],
        () => ativarModoPinguimNinjaUm()
      );
    } else {
      comboPinguimNinjaUm = [];
    }

    const tokenPinguimDois = tokenPinguimNinjaDois(evento.code);
    if (tokenPinguimDois) {
      registrarEntradaCombo(
        comboPinguimNinjaDois,
        tokenPinguimDois,
        ["DOWN", "ENTER", "DOWN", "UP"],
        () => ativarModoPinguimNinjaDois()
      );
    } else {
      comboPinguimNinjaDois = [];
    }

    const tokenUm = tokenComboNinjaUm(evento.code);
    if (tokenUm) {
      registrarEntradaCombo(
        comboNinjaUm,
        tokenUm,
        ["S", "S", "SHIFT_LEFT"],
        () => criarFireball(1)
      );
    } else {
      comboNinjaUm = [];
    }

    const tokenDois = tokenComboNinjaDois(evento.code);
    if (tokenDois) {
      registrarEntradaCombo(
        comboNinjaDois,
        tokenDois,
        ["DOWN", "DOWN", "ENTER"],
        () => criarFireball(2)
      );
    } else {
      comboNinjaDois = [];
    }

    const tokenLentidaoUm = tokenLentidaoNinjaUm(evento.code);
    if (tokenLentidaoUm) {
      registrarEntradaCombo(
        comboLentidaoNinjaUm,
        tokenLentidaoUm,
        ["W", "S", "W", "SHIFT"],
        () => usarLentidao(1)
      );
    } else {
      comboLentidaoNinjaUm = [];
    }

    const tokenLentidaoDois = tokenLentidaoNinjaDois(evento.code);
    if (tokenLentidaoDois) {
      registrarEntradaComboComAlternativas(
        comboLentidaoNinjaDois,
        tokenLentidaoDois,
        [["UP", "DOWN", "UP", "SHIFT"], ["UP", "DOWN", "UP", "ENTER"]],
        () => usarLentidao(2)
      );
    } else {
      comboLentidaoNinjaDois = [];
    }

    const tokenMiniUm = tokenMiniNinjaUm(evento.code);
    if (tokenMiniUm) {
      registrarEntradaCombo(
        comboMiniNinjaUm,
        tokenMiniUm,
        ["S", "S", "W", "W"],
        () => ativarMiniNoNinja(1)
      );
    } else {
      comboMiniNinjaUm = [];
    }

    const tokenMiniDois = tokenMiniNinjaDois(evento.code);
    if (tokenMiniDois) {
      registrarEntradaCombo(
        comboMiniNinjaDois,
        tokenMiniDois,
        ["DOWN", "DOWN", "UP", "UP"],
        () => ativarMiniNoNinja(2)
      );
    } else {
      comboMiniNinjaDois = [];
    }

    const tokenControlesInvertidosUm = tokenConfusaoNinjaUm(evento.code);
    if (tokenControlesInvertidosUm) {
      registrarEntradaCombo(
        comboControlesInvertidosNinjaUm,
        tokenControlesInvertidosUm,
        ["W", "SHIFT", "S", "S"],
        () => usarControlesInvertidos(1)
      );
    } else {
      comboControlesInvertidosNinjaUm = [];
    }

    const tokenControlesInvertidosDois = tokenConfusaoNinjaDois(evento.code);
    if (tokenControlesInvertidosDois) {
      registrarEntradaComboComAlternativas(
        comboControlesInvertidosNinjaDois,
        tokenControlesInvertidosDois,
        [["UP", "SHIFT", "DOWN", "DOWN"]],
        () => usarControlesInvertidos(2)
      );
    } else {
      comboControlesInvertidosNinjaDois = [];
    }
  }

  if (evento.code === "KeyW") {
    evento.preventDefault();
    if (evento.repeat) {
      return;
    }
    if (controlesInvertidosNinjaUm) {
      acaoNinjaUm();
    } else {
      animarNinjaUm();
    }
    return;
  }

  if (evento.code === "ArrowUp" || evento.code === "Digit8" || evento.code === "Numpad8") {
    evento.preventDefault();
    if (evento.repeat) {
      return;
    }
    if (controlesInvertidosNinjaDois) {
      acaoNinjaDois();
    } else {
      animarNinjaDois();
    }
    return;
  }

  if (evento.code === "KeyS") {
    evento.preventDefault();
    if (controlesInvertidosNinjaUm) {
      if (evento.repeat) {
        return;
      }
      animarNinjaUm();
    } else {
      acaoNinjaUm();
    }
    return;
  }

  if (evento.code === "ArrowDown" || evento.code === "Digit5" || evento.code === "Numpad5") {
    evento.preventDefault();
    if (controlesInvertidosNinjaDois) {
      if (evento.repeat) {
        return;
      }
      animarNinjaDois();
    } else {
      acaoNinjaDois();
    }
    return;
  }

  if (teclaSocoNinjaUm(evento.code)) {
    evento.preventDefault();
    if (evento.repeat) {
      return;
    }
    if (modoPinguimNinjaUmAtivo) {
      criarOvoPinguim(1);
      return;
    }
    socoNinjaUm();
    return;
  }

  if (teclaSocoNinjaDois(evento.code)) {
    evento.preventDefault();
    if (evento.repeat) {
      return;
    }
    if (modoPinguimNinjaDoisAtivo) {
      criarOvoPinguim(2);
      return;
    }
    socoNinjaDois();
  }
});

document.addEventListener("keyup", (evento) => {
  if (golpesModalEl && golpesModalEl.classList.contains("visible")) {
    if (evento.code in teclasPressionadas) {
      evento.preventDefault();
      teclasPressionadas[evento.code] = false;
    }
    return;
  }

  if (jogoPausado) {
    if (evento.code in teclasPressionadas) {
      evento.preventDefault();
      teclasPressionadas[evento.code] = false;
    }
    return;
  }

  if (evento.code in teclasPressionadas) {
    evento.preventDefault();
    teclasPressionadas[evento.code] = false;
    return;
  }

  if (estadoAtualJogo !== estadoJogo.PLAYING) {
    return;
  }

  if (evento.code === "KeyW" && controlesInvertidosNinjaUm) {
    evento.preventDefault();
    pararAcaoNinjaUm();
    return;
  }

  if (evento.code === "KeyS") {
    if (!controlesInvertidosNinjaUm) {
      evento.preventDefault();
      pararAcaoNinjaUm();
    }
    return;
  }

  if (
    (evento.code === "ArrowUp" || evento.code === "Digit8" || evento.code === "Numpad8") &&
    controlesInvertidosNinjaDois
  ) {
    evento.preventDefault();
    pararAcaoNinjaDois();
    return;
  }

  if (evento.code === "ArrowDown" || evento.code === "Digit5" || evento.code === "Numpad5") {
    if (!controlesInvertidosNinjaDois) {
      evento.preventDefault();
      pararAcaoNinjaDois();
    }
  }
});

if (pauseBtnEl) {
  pauseBtnEl.addEventListener("click", alternarPausa);
  atualizarBotaoPausa();
}

if (golpesBtnEl) {
  golpesBtnEl.addEventListener("click", abrirListaGolpes);
}

if (fecharGolpesBtnEl) {
  fecharGolpesBtnEl.addEventListener("click", fecharListaGolpes);
}

if (golpesModalEl) {
  golpesModalEl.addEventListener("click", (evento) => {
    if (evento.target === golpesModalEl) {
      fecharListaGolpes();
    }
  });
}

atualizarPosicao();
iniciarPartidaNovaCompleta();
iniciarMusicaTema();

window.addEventListener("pointerdown", iniciarMusicaTema, { once: true });
window.addEventListener("keydown", iniciarMusicaTema, { once: true });
