export function reverseText(text: string): string {
    return text
        .split('')
        .reverse()
        .join('');
}

export function writeLine(text: string): string {
    return `${text}\n\n`;
}
