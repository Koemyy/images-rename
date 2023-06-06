import * as fs from 'fs';
import * as path from 'path';

const sourceFolder = './oldImages';
const destinationFolder = './newImages';

const stateNameMap: { [key: string]: string[] } = {
    ac: ['acre'],
    al: ['alagoas'],
    ap: ['amapá'],
    am: ['amazonas'],
    ba: ['bahia'],
    ce: ['ceará'],
    df: ['distrito federal'],
    es: ['espirito santo', 'es', 'espirito-santo'],
    go: ['goiás'],
    ma: ['maranhão'],
    mt: ['mato grosso', 'matogrosso'],
    ms: ['mato grosso do sul', 'matogrossodosul'],
    mg: ['minas gerais', 'minas'],
    pa: ['pará'],
    pb: ['paraíba'],
    pr: ['paraná'],
    pe: ['pernambuco'],
    pi: ['piauí'],
    rj: ['rio de janeiro'],
    rn: ['rio grande do norte', 'riograndedonorte'],
    rs: ['rio grande do sul', 'riograndedosul'],
    ro: ['rondônia'],
    rr: ['roraima'],
    sc: ['santa catarina', 'santacatarina'],
    sp: ['são paulo'],
    se: ['sergipe'],
    to: ['tocantins']
};

function renameImages() {
    const files = fs.readdirSync(sourceFolder);

    files.forEach((file) => {
        const filePath = path.join(sourceFolder, file);
        const fileName = path.parse(file).name;
        const fileExt = path.parse(file).ext;

        let dimensions: string;
        let text1: string;
        let text2: string;
        let state: string;

        const fileNameParts = fileName.split('-');
        const stateKey = fileNameParts[fileNameParts.length - 1].toLowerCase();
        const stateNameArr = fileNameParts.slice(2, -1);
        const stateName = stateNameArr.join('-');
        const stateSuffix = findStateSuffix(stateKey);

        if (fileName.includes('1080x1789')) {
            dimensions = 'mobile';
            state = `state-${stateSuffix}-${dimensions}`;
            text1 = 'home-banner';
            text2 = 'alguma-coisa';
        } else if (fileName.includes('1920x850')) {
            dimensions = 'desktop';
            state = `state-${stateSuffix}-${dimensions}`;
            text1 = 'home-banner';
            text2 = 'alguma-coisa';
        } else if (fileName.includes('980x120')) {
            dimensions = 'academias';
            state = `state-${stateSuffix}-${dimensions}`;
            text1 = 'home-banner';
            text2 = 'alguma-coisa';
        } else {
            return;
        }

        const [ano, mes] = new Date().toISOString().split('T')[0].split('-');

        const newFileName = `${ano}-${mes}-${text1}-${text2}-${state}${fileExt}`;
        const newFilePath = path.join(destinationFolder, newFileName);

        fs.copyFileSync(filePath, newFilePath);
        console.log(`Arquivo ${file} renomeado para ${newFileName}`);
    });
}

function findStateSuffix(stateKey: string): string {
    for (const [suffix, stateNames] of Object.entries(stateNameMap)) {
        if (stateNames.includes(stateKey)) {
            return suffix;
        }
    }
    return stateKey;
}

renameImages();
