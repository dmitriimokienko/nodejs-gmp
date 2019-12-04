import fs from 'fs';
import csv from 'csvtojson';
import {pipeline} from 'stream'

const CSV_FILE_PATH = './csv/input_example.csv';
const JSON_FILE_PATH = './csv/output.txt';

try {
    const readStream = fs.createReadStream(CSV_FILE_PATH);
    const writeStream = fs.createWriteStream(JSON_FILE_PATH);

    pipeline(
        readStream,
        csv(),
        writeStream,
        error => {
            error && console.error(error);
        }
    )
} catch (error) {
    console.error(error);
}
