function trocarImagemSuave(elemento, novaImagem) {
console.log('animacoes.js carregado');
  if (elemento === ninjaUm && modoPinguimNinjaUmAtivo) {
    novaImagem = ninjaPinguim;
  }

  if (elemento === ninjaDois && modoPinguimNinjaDoisAtivo) {
    novaImagem = ninjaPinguim;
  }

  if (elemento === ninjaUm && controlesInvertidosNinjaUm && !modoPinguimNinjaUmAtivo) {
    if (novaImagem === ninjaUmNormal || novaImagem === ninjaUmAndandoImg || novaImagem === ninjaUmPower) {
      novaImagem = ninjaUmConfusoImg;
    }
  }
  if (elemento === ninjaDois && controlesInvertidosNinjaDois && !modoPinguimNinjaDoisAtivo) {
    if (novaImagem === ninjaDoisNormal || novaImagem === ninjaDoisAndandoImg || novaImagem === ninjaDoisPower) {
      novaImagem = ninjaDoisConfusoImg;
    }
  }
  if (elemento === ninjaUm && lentoNinjaUm && !controlesInvertidosNinjaUm && !modoPinguimNinjaUmAtivo) {
    if (novaImagem === ninjaUmNormal || novaImagem === ninjaUmAndandoImg || novaImagem === ninjaUmPower) {
      novaImagem = ninjaUmLentidaoImg;
    }
  }
  if (elemento === ninjaDois && lentoNinjaDois && !controlesInvertidosNinjaDois && !modoPinguimNinjaDoisAtivo) {
    if (novaImagem === ninjaDoisNormal || novaImagem === ninjaDoisAndandoImg || novaImagem === ninjaDoisPower) {
      novaImagem = ninjaDoisLentidaoImg;
    }
  }

  if (elemento === ninjaUm && poderAtivoNinjaUm && novaImagem === ninjaUmNormal) {
    novaImagem = ninjaUmPower;
  } else if (elemento === ninjaUm && poderAtivoNinjaUm && novaImagem === ninjaUmAndandoImg) {
    novaImagem = ninjaUmPower; // or power walking if exists
  }

  if (elemento === ninjaDois && poderAtivoNinjaDois && novaImagem === ninjaDoisNormal) {
    novaImagem = ninjaDoisPower;
  } else if (elemento === ninjaDois && poderAtivoNinjaDois && novaImagem === ninjaDoisAndandoImg) {
    novaImagem = ninjaDoisPower;
  }

  setTimeout(() => {
    elemento.src = novaImagem;
  }, tempoFade);


}

function animarNinjaUm() {
  if (!podePularNinjaUm || !podeControlarNinjaUm()) {
    return;
  }

  podePularNinjaUm = false;
  ninjaUmPulandoAgora = true;
  ninjaUmDefendendo = false;
  ninjaUmSocandoAgora = false;
  trocarImagemSuave(ninjaUm, ninjaUmPulando);
  ninjaUm.style.top = topPulando;
  aplicarTransformeNinjaUm();

  if (timerNinjaUm) {
    clearTimeout(timerNinjaUm);
  }

  timerNinjaUm = setTimeout(() => {
    timerNinjaUm = executarOuReagendarSePausado(() => {
      ninjaUmPulandoAgora = false;
      trocarImagemSuave(ninjaUm, ninjaUmNormal);
      ninjaUm.style.top = topNormalNinjaUm;
      aplicarTransformeNinjaUm();
      timerNinjaUm = null;
    });
  }, tempoAnimacao);

  if (cooldownNinjaUm) {
    clearTimeout(cooldownNinjaUm);
  }

  cooldownNinjaUm = setTimeout(() => {
    cooldownNinjaUm = executarOuReagendarSePausado(() => {
      podePularNinjaUm = true;
      cooldownNinjaUm = null;
    });
  }, cooldownPulo);
}

function animarNinjaDois() {
  if (!podePularNinjaDois || !podeControlarNinjaDois()) {
    return;
  }

  podePularNinjaDois = false;
  ninjaDoisPulandoAgora = true;
  ninjaDoisDefendendo = false;
  ninjaDoisSocandoAgora = false;
  trocarImagemSuave(ninjaDois, ninjaDoisPulando);
  ninjaDois.style.top = topPulando;
  aplicarTransformeNinjaDois();

  if (timerNinjaDois) {
    clearTimeout(timerNinjaDois);
  }

  timerNinjaDois = setTimeout(() => {
    timerNinjaDois = executarOuReagendarSePausado(() => {
      ninjaDoisPulandoAgora = false;
      trocarImagemSuave(ninjaDois, ninjaDoisNormal);
      ninjaDois.style.top = topNormalNinjaDois;
      aplicarTransformeNinjaDois();
      timerNinjaDois = null;
    });
  }, tempoAnimacao);

  if (cooldownNinjaDois) {
    clearTimeout(cooldownNinjaDois);
  }

  cooldownNinjaDois = setTimeout(() => {
    cooldownNinjaDois = executarOuReagendarSePausado(() => {
      podePularNinjaDois = true;
      cooldownNinjaDois = null;
    });
  }, cooldownPulo);
}

function acaoNinjaUm() {
  if (ninjaUmPulandoAgora || !podeControlarNinjaUm()) {
    return;
  }

  ninjaUmDefendendo = true;
  ninjaUmSocandoAgora = false;
  trocarImagemSuave(ninjaUm, poderAtivoNinjaUm ? ninjaUmDefendendoPowerImg : ninjaUmAcao);
}

function acaoNinjaDois() {
  if (ninjaDoisPulandoAgora || !podeControlarNinjaDois()) {
    return;
  }

  ninjaDoisDefendendo = true;
  ninjaDoisSocandoAgora = false;
  trocarImagemSuave(ninjaDois, poderAtivoNinjaDois ? ninjaDoisDefendendoPowerImg : ninjaDoisDefendendoImg);
}

function socoNinjaUm(forcar = false) {
  if (modoPinguimNinjaUmAtivo || (!podeSocarNinjaUm && !forcar) || ninjaUmPulandoAgora || !podeControlarNinjaUm()) {
    return false;
  }

  if (!forcar) {
    podeSocarNinjaUm = false;
  }

  ninjaUmSocandoAgora = true;
  ninjaUmDefendendo = false;
  socoNinjaUmJaAcertou = false;
  trocarImagemSuave(ninjaUm, poderAtivoNinjaUm ? ninjaUmSocandoPowerImg : ninjaUmSocandoImg);

  if (timerSocoNinjaUm) {
    clearTimeout(timerSocoNinjaUm);
  }

  timerSocoNinjaUm = setTimeout(() => {
    timerSocoNinjaUm = executarOuReagendarSePausado(() => {
      ninjaUmSocandoAgora = false;
      trocarImagemSuave(ninjaUm, ninjaUmNormal);
      timerSocoNinjaUm = null;
    });
  }, duracaoSoco);

  if (!forcar) {
    if (cooldownSocoNinjaUm) {
      clearTimeout(cooldownSocoNinjaUm);
    }

    cooldownSocoNinjaUm = setTimeout(() => {
      cooldownSocoNinjaUm = executarOuReagendarSePausado(() => {
        podeSocarNinjaUm = true;
        cooldownSocoNinjaUm = null;
      });
    }, cooldownSoco);
  }

  return true;
}

function socoNinjaDois(forcar = false) {
  if (modoPinguimNinjaDoisAtivo || (!podeSocarNinjaDois && !forcar) || ninjaDoisPulandoAgora || !podeControlarNinjaDois()) {
    return false;
  }

  if (!forcar) {
    podeSocarNinjaDois = false;
  }

  ninjaDoisSocandoAgora = true;
  ninjaDoisDefendendo = false;
  socoNinjaDoisJaAcertou = false;
  trocarImagemSuave(ninjaDois, poderAtivoNinjaDois ? ninjaDoisSocandoPowerImg : ninjaDoisSocandoImg);

  if (timerSocoNinjaDois) {
    clearTimeout(timerSocoNinjaDois);
  }

  timerSocoNinjaDois = setTimeout(() => {
    timerSocoNinjaDois = executarOuReagendarSePausado(() => {
      ninjaDoisSocandoAgora = false;
      trocarImagemSuave(ninjaDois, ninjaDoisNormal);
      timerSocoNinjaDois = null;
    });
  }, duracaoSoco);

  if (!forcar) {
    if (cooldownSocoNinjaDois) {
      clearTimeout(cooldownSocoNinjaDois);
    }

    cooldownSocoNinjaDois = setTimeout(() => {
      cooldownSocoNinjaDois = executarOuReagendarSePausado(() => {
        podeSocarNinjaDois = true;
        cooldownSocoNinjaDois = null;
      });
    }, cooldownSoco);
  }

  return true;
}

function pararAcaoNinjaUm() {
  ninjaUmDefendendo = false;

  if (ninjaUmSocandoAgora) {
    trocarImagemSuave(ninjaUm, ninjaUmSocandoImg);
    return;
  }

  trocarImagemSuave(ninjaUm, ninjaUmNormal);
}

function pararAcaoNinjaDois() {
  ninjaDoisDefendendo = false;

  if (ninjaDoisSocandoAgora) {
    trocarImagemSuave(ninjaDois, ninjaDoisSocandoImg);
    return;
  }

  trocarImagemSuave(ninjaDois, ninjaDoisNormal);
}

function animarDanoNinjaDois() {
  if (timerAnimacaoDanoNinjaDois) {
    clearTimeout(timerAnimacaoDanoNinjaDois);
  }

  trocarImagemSuave(ninjaDois, ninjaDoisDano);

  timerAnimacaoDanoNinjaDois = setTimeout(() => {
    timerAnimacaoDanoNinjaDois = executarOuReagendarSePausado(() => {
      if (estadoAtualJogo !== estadoJogo.PLAYING) {
        timerAnimacaoDanoNinjaDois = null;
        return;
      }

      if (ninjaDoisPulandoAgora) {
        trocarImagemSuave(ninjaDois, ninjaDoisPulando);
      } else if (ninjaDoisSocandoAgora) {
        trocarImagemSuave(ninjaDois, poderAtivoNinjaDois ? ninjaDoisSocandoPowerImg : ninjaDoisSocandoImg);
      } else if (ninjaDoisDefendendo) {
        trocarImagemSuave(ninjaDois, poderAtivoNinjaDois ? ninjaDoisDefendendoPowerImg : ninjaDoisDefendendoImg);
      } else {
        trocarImagemSuave(ninjaDois, poderAtivoNinjaDois ? ninjaDoisPower : ninjaDoisNormal);
      }

      timerAnimacaoDanoNinjaDois = null;
    });
  }, duracaoAnimacaoDanoMs);
}

function animarDanoNinjaUm() {
  if (timerAnimacaoDanoNinjaUm) {
    clearTimeout(timerAnimacaoDanoNinjaUm);
  }

  trocarImagemSuave(ninjaUm, ninjaUmDano);

  timerAnimacaoDanoNinjaUm = setTimeout(() => {
    timerAnimacaoDanoNinjaUm = executarOuReagendarSePausado(() => {
      if (estadoAtualJogo !== estadoJogo.PLAYING) {
        timerAnimacaoDanoNinjaUm = null;
        return;
      }

      if (ninjaUmPulandoAgora) {
        trocarImagemSuave(ninjaUm, ninjaUmPulando);
      } else if (ninjaUmSocandoAgora) {
        trocarImagemSuave(ninjaUm, poderAtivoNinjaUm ? ninjaUmSocandoPowerImg : ninjaUmSocandoImg);
      } else if (ninjaUmDefendendo) {
        trocarImagemSuave(ninjaUm, poderAtivoNinjaUm ? ninjaUmDefendendoPowerImg : ninjaUmAcao);
      } else {
        trocarImagemSuave(ninjaUm, poderAtivoNinjaUm ? ninjaUmPower : ninjaUmNormal);
      }

      timerAnimacaoDanoNinjaUm = null;
    });
  }, duracaoAnimacaoDanoMs);
}
