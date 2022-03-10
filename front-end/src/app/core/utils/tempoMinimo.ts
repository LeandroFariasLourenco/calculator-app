const tempoMinimo = (tempoMin: number, tempoInicio: number, callback: () => void): void => {
  const tempoPassadoMs = new Date().getTime() - tempoInicio;
  if (tempoPassadoMs < tempoMin) {
    setTimeout(() => {
      callback();
    }, tempoMin - tempoPassadoMs);
  } else {
    callback();
  }
};

export default tempoMinimo;
