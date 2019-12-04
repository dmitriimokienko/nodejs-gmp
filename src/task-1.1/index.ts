import process from 'process';

function reverseText(text: string): string {
    return text
        .split('')
        .reverse()
        .join('');
}

function writeLine(text: string): string {
    return `${text}\n\n`;
}

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    const input: string = process.stdin.read();
    const output: string = reverseText(input);
    process.stdout.write(writeLine(output));
});
