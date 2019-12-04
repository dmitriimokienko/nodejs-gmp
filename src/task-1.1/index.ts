import process from 'process';
import {reverseText, writeLine} from './utils';

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    const input: string = process.stdin.read();
    const output: string = reverseText(input);
    process.stdout.write(writeLine(output));
});
