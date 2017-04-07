export function filterUp(a, b, colKey) {
  if (a[colKey] > b[colKey]) {
    return 1;
  }

  if (a[colKey] < b[colKey]) {
    return -1;
  }

  if (a[colKey] === b[colKey]) {
    return 0;
  }

  return -1;
}

export function filterDown(a, b, colKey) {
  if (a[colKey] > b[colKey]) {
    return -1;
  }

  if (a[colKey] < b[colKey]) {
    return 1;
  }

  if (a[colKey] === b[colKey]) {
    return 0;
  }

  return -1;
}

export function getValue(js, path) {
  const dotSplittedPath = path.split('.');
  let val = js;

  for (const k in dotSplittedPath) {
    if (dotSplittedPath.hasOwnProperty(k)) {
      const subPath = dotSplittedPath[k];

      const arraySplit = subPath.split('[');
      if (arraySplit.length > 1) {
        const index = Number(arraySplit[1].charAt(0));
        val = val[arraySplit[0]][index];
      } else {
        val = val[subPath];
      }
    }
  }

  return val;
}


export function getStructuredData(data, tableMeta) {
  const { cols } = tableMeta;
  const structuredData = [];

  for (const j in data) {
    if (data.hasOwnProperty(j)) {
      const datum = data[j];
      const structuredDatum = [];
      for (const k in cols) {
        if (cols.hasOwnProperty(k)) {
          const col = cols[k];
          structuredDatum[col.colKey] = getValue(datum, col.dataPath);
        }
      }

      structuredData.push(structuredDatum);
    }
  }

  return structuredData;
}
