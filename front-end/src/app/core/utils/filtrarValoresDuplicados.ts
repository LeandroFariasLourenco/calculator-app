const filtrarValoresDuplicados = <T>(
  arrayParaPercorrer: T[],
  arrayParaComparar: T[],
  key: keyof T,
) => {
  const arr: T[] = [];
  arrayParaPercorrer.forEach((arrData1) => {
    if (!arrayParaComparar.some((arrData2) => arrData1[key] === arrData2[key])) {
      arr.push(arrData1);
    }
  });

  return arr;
};

export default filtrarValoresDuplicados;
