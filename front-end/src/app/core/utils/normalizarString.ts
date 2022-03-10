const normalizarString = (str: string) => {
  const accents = 'ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ';
  const accentsOut = 'AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg';
  const accentsMap = new Map();
  accents.split('').forEach((char, index) => {
    accentsMap.set(accents.charCodeAt(index), accentsOut.charCodeAt(index));
  });

  const nstr = new Array(str.length);
  let x; let i;
  for (i = 0; i < nstr.length; i++) {
    nstr[i] = accentsMap.get(x = str.charCodeAt(i)) || x;
  }
  return String.fromCharCode.apply(null, nstr);
};

export default normalizarString;
