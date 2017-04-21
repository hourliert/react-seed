export function sortDown(a, b, colKey, type) {
  let nameA = undefined;
  let nameB = undefined;

  if (type === 'NUMBER') {
    nameA = a[colKey] ? Number(a[colKey]) : -999999999;
    nameB = b[colKey] ? Number(b[colKey]) : -999999999;
  } else {
    nameA = a[colKey] ? String(a[colKey]).toLowerCase() : 'z';
    nameB = b[colKey] ? String(b[colKey]).toLowerCase() : 'z';
  }

  if (nameA > nameB) {
    return 1;
  }

  if (nameA < nameB) {
    return -1;
  }

  return 0;
}

export function sortUp(a, b, colKey, type) {
  let nameA = undefined;
  let nameB = undefined;

  if (type === 'NUMBER') {
    nameA = a[colKey] ? Number(a[colKey]) : -999999999;
    nameB = b[colKey] ? Number(b[colKey]) : -999999999;
  } else {
    nameA = a[colKey] ? String(a[colKey]).toLowerCase() : 'z';
    nameB = b[colKey] ? String(b[colKey]).toLowerCase() : 'z';
  }

  if (nameA < nameB) {
    return 1;
  }

  if (nameA > nameB) {
    return -1;
  }

  return 0;
}

export function filterData(a, colKey, searchContent) {
  const nameA = a[colKey] ? String(a[colKey]).toLowerCase() : '';

  if (nameA.indexOf(searchContent) !== -1) {
    return true;
  }

  return false;
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

export function getInitialStructuredData(data, tableMeta) {
  const { cols } = tableMeta;
  const structuredData = [];

  for (const j in data) {
    if (data.hasOwnProperty(j)) {
      const datum = data[j];
      const structuredDatum = [];
      for (const k in cols) {
        if (cols.hasOwnProperty(k)) {
          const col = cols[k];
          let val = '';
          for (const l in col.dataPath) {
            if (col.dataPath.hasOwnProperty(l)) {
              const path = col.dataPath[l];
              val += getValue(datum, path);
            }
          }

          structuredDatum[col.colKey] = val;
        }
      }

      structuredDatum._datum = datum;
      structuredData.push(structuredDatum);
    }
  }

  return structuredData;
}

export function getStructuredData(data, tableMeta) {
  const { cols } = tableMeta;
  let structuredData = getInitialStructuredData(data, tableMeta);

  for (const k in cols) {
    if (cols.hasOwnProperty(k)) {
      const col = cols[k];
      if (col.searchContent) {
        structuredData = structuredData.filter(
          (a) => filterData(a, col.colKey, col.searchContent.toLowerCase()) // eslint-disable-line
        );
      }
    }
  }

  return structuredData;
}

export function capitalize(str) {
  if (str) {
    const pieces = str.split(' ');
    for (let i = 0; i < pieces.length; i++) {
      const j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1).toLowerCase();
    }

    return pieces.join(' ');
  }

  return undefined;
}
