export function shortenArray(array: Array<any>, limit?: number) {
    if (limit && limit < array.length) {
        array.length = limit;
    }
    return array;
}
