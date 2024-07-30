import unidecode from 'unidecode';
import fs from 'fs';
import path from 'path';

const inPath = 'input';
const outPath = 'output';
const text = fs.readFileSync(path.join(inPath, 'index.md'), 'utf-8');

const regex = /\[\\\[(?<prefixName>.*?)\\\](?<pageName>.*?)\]\((?<fileName>.*?)\)/g;
for (const match of text.matchAll(regex)) {
    const prefixName = unidecode(match.groups.prefixName).toLowerCase().replaceAll(' ', '_');
    const pageName = unidecode(match.groups.pageName).toLowerCase().replaceAll(' ', '_');
    const fileName = unidecode(match.groups.fileName).toLowerCase().replaceAll(' ', '_');
    // console.log(`pageName: ${pageName}, fileName: ${fileName}`);

    const oldName = path.join(inPath, fileName);
    const newName = path.join(inPath, prefixName + pageName + path.extname(fileName));
    if (fs.existsSync(oldName)) {
        fs.renameSync(oldName, newName);
    }
}
