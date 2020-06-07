// export const cloneData = (dataLol) => {
//   const keys = Object.values(dataLol);
//   return keys;
// };

export const searchHero = (data, name) => {
  const results = data.filter(dataRow => dataRow.name.toLowerCase().startsWith(name.toLowerCase()));
  return results;
};

export const filterChampions = (dataLol, value) => {
  let dataFiltered = [];
  if (value !== 'All') {
    dataFiltered = dataLol.filter(tag => tag.tags.some(dat => dat === value));
  } else {
    dataFiltered = dataLol;
  }
  return dataFiltered;
};

export const sortAlphabet = (dataLol, value) => {
  let dataSortered = [];
  if (value === 'asc') {
    dataSortered = dataLol.sort((first, second) => (first.name > second.name ? 1 : -1));
  } else {
    dataSortered = dataLol.sort((first, second) => (first.name < second.name ? 1 : -1));
  }
  return dataSortered;
};

export const dataChart = (dataLol, value) => {
  const tabla = [];
  for (let i = 0; i < dataLol.length; i += 1) {
    // console.log(dataLol[i].info[value])
    tabla.push([dataLol[i].name, `<img class="width" src="${dataLol[i].img}">`, dataLol[i].info[value]]);
  }
  return tabla;
};
