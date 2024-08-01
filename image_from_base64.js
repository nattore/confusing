import fs from 'fs';
import path from 'path';

export default function imageConvert(filePath) {
    const regex = /\[(?<name>.*?)\]\(data:image\/(?<ext>.+?);base64,(?<data>.*?)\)/g;

    const fileString = fs.readFileSync(filePath, 'utf8');
    const outString = fileString.replaceAll(regex, replacer);

    const outFilePath = './output/totoro_modified.md';
    fs.writeFileSync(outFilePath, outString);
}

function generateImage(name, ext, data, outPath='./output') {
    let suffix = 0;
    let fileName = name;

    while (fs.existsSync(path.join(outPath, fileName + '.' + ext))) {
        suffix += 1;
        fileName = name + suffix;
    }

    fs.writeFileSync(path.join(outPath, fileName + '.' + ext), data, {encoding: 'base64'});

    return fileName;
}

function replacer(match, name, ext, data) {
    if (!name) {
        name = 'base64_image';
    }
    const fileName= generateImage(name, ext, data);

    return `[${name}](${fileName + '.' + ext})`;
}

const filePath = './input/totoro.md';
imageConvert(filePath);
