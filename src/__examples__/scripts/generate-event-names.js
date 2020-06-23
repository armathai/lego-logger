const { promisify } = require('util');
const { resolve } = require('path');
const { readdir, readFile, writeFile, stat } = require('fs');
const { input, output, name: className, type: fileType } = require('minimist')(process.argv.slice(2));

execute();

async function execute() {
  let out = ``;
  const paths = await getFilePaths(`${input}`);
  const contents = await Promise.all(paths.map(async path => await getContentFromPath(path)));

  for (const c of contents) {
    const entries = getClassNamesAndGetters(c);

    for (const e of entries) {
      const { className, getters } = e;

      if (!getters.length) {
        continue;
      }

      out += `  ${className}: {\n`;

      for (const g of getters) {
        const G = g[0].toUpperCase() + g.slice(1);
        out += `    ${G}Update: '${className}${G}Update',\n`;
      }

      out += `  },\n`;
    }
  }

  out = `export const ${className} = Object.freeze({\n${out}});`;

  promisify(writeFile)(`${output}/${className}.${fileType}`, out, 'utf-8');
}

async function getFilePaths(dir) {
  const subdirs = await promisify(readdir)(dir);
  const files = await Promise.all(
    subdirs.map(async subdir => {
      const res = resolve(dir, subdir);
      return (await promisify(stat)(res)).isDirectory() ? getFilePaths(res) : res;
    }),
  );
  return files.reduce((a, f) => a.concat(f), []);
}

async function getContentFromPath(path) {
  return await promisify(readFile)(path, { encoding: 'utf8' });
}

function getClassNamesAndGetters(str) {
  const classes = getContentsAfterKeyword(str, /class /gi);
  return classes.map(c => {
    return { className: getClassName(c), getters: getGetterNames(c) };
  });
}

function getClassName(str) {
  return getContentsAfterKeyword(str, /class /gi).map(c => c.split(' ').filter(name => name)[1]);
}

function getGetterNames(str) {
  return getContentsAfterKeyword(str, /(?<=get[ ]{1,})([a-zA-Z_${1}][a-zA-Z0-9_$]+)(?=\()/gi).map(
    c => c.split('(').filter(name => name)[0],
  );
}

function getContentsAfterKeyword(str, regex) {
  let result;
  const ii = [];

  while ((result = regex.exec(str))) {
    ii.push(result.index);
  }

  return ii.map((el, i) => str.substring(el, ii[i + 1]));
}
