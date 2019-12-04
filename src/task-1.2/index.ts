import fs from 'fs';
import csv from 'csvtojson';
import {pipeline} from 'stream'
import {csvParams} from './config';
import {
    HEADERS_LINE_INDEX,
    SUCCESS_OUTPUT,
    CSV_FILE_PATH,
    JSON_FILE_PATH
} from './constants';

pipeline(
    fs.createReadStream(CSV_FILE_PATH),
    csv(csvParams)
        .preFileLine(
            (fileLine: string, lineIndex: number): string =>
                lineIndex === HEADERS_LINE_INDEX ? fileLine.toLowerCase() : fileLine
        ),
    fs.createWriteStream(JSON_FILE_PATH),
    error => {
        const output = error || SUCCESS_OUTPUT;
        console.log(output);
    }
);
