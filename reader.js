/* fs module */
const fs = require('fs');

/* lineCollection to hold all the output line */
const lineCollection = [];

/* readStream to process big file and './big.txt' is the path of the file */
const readStream = fs.createReadStream('./big.txt', 'utf8');

/*
@function backwardSearch to find end points before the word
@ considering two end points ?/.
@params data stream chunk
@params pointer index to process from
*/
async function backwardSearch(data, pointer) {
    let character;
    let isFound = 0;
    while (pointer >= 0) {
        character = data.charAt(pointer);
        if (character === '?' || character === '.') {
            isFound = 1;
            break;
        }
        pointer--;
    }
    return { pointer, isFound };
}

/*
@function forwardSearch to find end points after the word
@ considering two end points ?/.
@params data stream chunk
@params pointer index to process from
*/
async function forwardSearch(data, pointer) {
    let character;
    let isFound = 0;
    while (pointer <= data.length - 1) {
        character = data.charAt(pointer);
        if (character === '?' || character === '.') {
            isFound = 1;
            break;
        }
        pointer++;
    }
    return { pointer, isFound };
}

/*
@function searchWord to process chunk
@params searchWord word to look for
*/
async function searchWord(dataChunk, searchWord) {
    let wordIndex;
    let wordLength = searchWord.length;
    let backPointer;
    let frontPointer;
    let backData;
    let frontData;
    let line;
    do {
        wordIndex = dataChunk.indexOf(searchWord);
        if (wordIndex > -1) {
            backPointer = wordIndex - 1;
            frontPointer = wordIndex + wordLength;
            backData = await backwardSearch(dataChunk, backPointer);
            frontData = await forwardSearch(dataChunk, frontPointer);
            backPointer = backData.pointer;
            frontPointer = frontData.pointer;
            if(backData.isFound) {
                line = dataChunk.substring(backPointer + 1, frontPointer + 1);   
            } else {
                line = dataChunk.substring(backPointer, frontPointer + 1);
            }
            lineCollection.push(line);
            if (frontPointer + 1 >= dataChunk.length) {
                break;
            } else {
                dataChunk = dataChunk.substring(frontPointer + 1, dataChunk.length);
            }
        } else {
            break;
        }
    } while (true);
}

/* readStream data event */
readStream.on('data', (chunk) => {
    searchWord(chunk, 'why');
});

/* readStream error event */
readStream.on('error', (error) => {
    console.log(error);
});

/* readStream error event */
readStream.on('end', () => {
    console.log(lineCollection);
});