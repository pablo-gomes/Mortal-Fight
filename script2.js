function tokenComboNinjaUm(codigo) {
  if (codigo === "KeyS") {
    return "S";
  }

  if (codigo === "ShiftLeft") {
    return "SHIFT_LEFT";
  }

  return null;
}

function tokenComboNinjaDois(codigo) {
  if (codigo === "ArrowDown" || codigo === "Digit5" || codigo === "Numpad5") {
    return "DOWN";
  }

  if (codigo === "Enter") {
    return "ENTER";
  }

  return null;
}

function tokenPinguimNinjaUm(codigo) {
  if (codigo === "KeyS") {
    return "S";
  }

  if (codigo === "KeyW") {
    return "W";
  }

  if (codigo === "ShiftLeft" || codigo === "ShiftRight") {
    return "SHIFT";
  }

  return null;
}

function tokenPinguimNinjaDois(codigo) {
  if (codigo === "ArrowDown" || codigo === "Digit5" || codigo === "Numpad5") {
    return "DOWN";
  }

  if (codigo === "ArrowUp" || codigo === "Digit8" || codigo === "Numpad8") {
    return "UP";
  }

  if (codigo === "Enter") {
    return "ENTER";
  }

  return null;
}

function tokenFatalityNinjaUm(codigo) {
  if (codigo === "KeyS") {
    return "S";
  }

  if (codigo === "KeyW") {
    return "W";
  }

  if (codigo === "ShiftLeft" || codigo === "ShiftRight") {
    return "SHIFT";
  }

  return null;
}

function tokenFatalityNinjaDois(codigo) {
  if (codigo === "ArrowDown" || codigo === "Digit5" || codigo === "Numpad5") {
    return "DOWN";
  }

  if (codigo === "ArrowUp" || codigo === "Digit8" || codigo === "Numpad8") {
    return "UP";
  }

  if (codigo === "ShiftLeft" || codigo === "ShiftRight") {
    return "SHIFT";
  }

  return null;
}

function tokenLentidaoNinjaUm(codigo) {
  if (codigo === "KeyW") {
    return "W";
  }

  if (codigo === "KeyS") {
    return "S";
  }

  if (codigo === "ShiftLeft" || codigo === "ShiftRight") {
    return "SHIFT";
  }

  return null;
}

function tokenLentidaoNinjaDois(codigo) {
  if (codigo === "ArrowUp" || codigo === "Digit8" || codigo === "Numpad8") {
    return "UP";
  }

  if (codigo === "ArrowDown" || codigo === "Digit5" || codigo === "Numpad5") {
    return "DOWN";
  }

  if (codigo === "ShiftLeft" || codigo === "ShiftRight") {
    return "SHIFT";
  }

  if (codigo === "Enter") {
    return "ENTER";
  }

  return null;
}

function tokenMiniNinjaUm(codigo) {
  if (codigo === "KeyS") {
    return "S";
  }

  if (codigo === "KeyW") {
    return "W";
  }

  return null;
}

function tokenMiniNinjaDois(codigo) {
  if (codigo === "ArrowDown" || codigo === "Digit5" || codigo === "Numpad5") {
    return "DOWN";
  }

  if (codigo === "ArrowUp" || codigo === "Digit8" || codigo === "Numpad8") {
    return "UP";
  }

  return null;
}

function tokenConfusaoNinjaUm(codigo) {
  if (codigo === "KeyW") {
    return "W";
  }

  if (codigo === "KeyS") {
    return "S";
  }

  if (codigo === "ShiftLeft" || codigo === "ShiftRight") {
    return "SHIFT";
  }

  return null;
}

function tokenConfusaoNinjaDois(codigo) {
  if (codigo === "ArrowUp" || codigo === "Digit8" || codigo === "Numpad8") {
    return "UP";
  }

  if (codigo === "ArrowDown" || codigo === "Digit5" || codigo === "Numpad5") {
    return "DOWN";
  }

  if (codigo === "ShiftLeft" || codigo === "ShiftRight") {
    return "SHIFT";
  }

  return null;
}

function ehTeclaBaixoNinjaDois(codigo) {
  return codigo === "ArrowDown" || codigo === "Digit5" || codigo === "Numpad5";
}

function ehTeclaCimaNinjaDois(codigo) {
  return codigo === "ArrowUp" || codigo === "Digit8" || codigo === "Numpad8";
}

function ehTeclaShift(codigo) {
  return codigo === "ShiftLeft" || codigo === "ShiftRight";
}

function processarComboFatalityNinjaUm(codigo) {
  const esperado = ["KeyS", "KeyS", "KeyW", "KeyS", "SHIFT"];
  const tokenEsperado = esperado[fatalityPassoNinjaUm];
  const acertou = tokenEsperado === "SHIFT" ? ehTeclaShift(codigo) : codigo === tokenEsperado;

  if (acertou) {
    fatalityPassoNinjaUm += 1;
  } else {
    fatalityPassoNinjaUm = codigo === "KeyS" ? 1 : 0;
  }

  if (fatalityPassoNinjaUm >= esperado.length) {
    fatalityPassoNinjaUm = 0;
    iniciarSequenciaFatality(1);
  }
}

function processarComboFatalityNinjaDois(codigo) {
  const esperado = ["DOWN", "DOWN", "UP", "DOWN", "SHIFT"];
  const tokenEsperado = esperado[fatalityPassoNinjaDois];
  let acertou = false;

  if (tokenEsperado === "DOWN") {
    acertou = ehTeclaBaixoNinjaDois(codigo);
  } else if (tokenEsperado === "UP") {
    acertou = ehTeclaCimaNinjaDois(codigo);
  } else if (tokenEsperado === "SHIFT") {
    acertou = ehTeclaShift(codigo);
  }

  if (acertou) {
    fatalityPassoNinjaDois += 1;
  } else {
    fatalityPassoNinjaDois = ehTeclaBaixoNinjaDois(codigo) ? 1 : 0;
  }

  if (fatalityPassoNinjaDois >= esperado.length) {
    fatalityPassoNinjaDois = 0;
    iniciarSequenciaFatality(2);
  }
}

function registrarEntradaCombo(tokens, tokenNovo, sequenciaEsperada, onCombo) {
  const agora = Date.now();
  tokens.push({ token: tokenNovo, t: agora });

  while (tokens.length && agora - tokens[0].t > janelaComboMs) {
    tokens.shift();
  }

  const ultimos = tokens.slice(-sequenciaEsperada.length).map((item) => item.token);
  const bateu = sequenciaEsperada.every((token, indice) => token === ultimos[indice]);

  if (bateu) {
    tokens.length = 0;
    onCombo();
  }
}

function registrarEntradaComboComAlternativas(tokens, tokenNovo, sequenciasEsperadas, onCombo) {
  const agora = Date.now();
  tokens.push({ token: tokenNovo, t: agora });

  while (tokens.length && agora - tokens[0].t > janelaComboMs) {
    tokens.shift();
  }

  const bateu = sequenciasEsperadas.some((sequenciaEsperada) => {
    const ultimos = tokens.slice(-sequenciaEsperada.length).map((item) => item.token);
    return sequenciaEsperada.every((token, indice) => token === ultimos[indice]);
  });

  if (bateu) {
    tokens.length = 0;
    onCombo();
  }
}

function teclaSocoNinjaUm(codigo) {
  return codigo === "ShiftLeft" || codigo === "ShiftRight";
}

function teclaSocoNinjaDois(codigo) {
  return codigo === "Enter" || codigo === "Digit7" || codigo === "Numpad7";
}
