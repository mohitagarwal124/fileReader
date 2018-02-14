const fs = require('fs');
const path = require('path');


/**
* @function <b>backwardSearch</b><br> Method to  find end points ath the left side of word
* @param  data chunk to process on
* @param  pointer index from to process on
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

/**
* @function <b>forwardSearch</b><br> Method to  find end points ath the right side of word
* @param  data chunk to process on
* @param  pointer index from to process on
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

/**
* @function <b>traceData</b><br> Method to read chunk and retun line
* @param  dataChunk chunk to process on
* @param  searchWord word to search in file
*/
async function traceData(dataChunk, searchWord) {
  try {
    let wordIndex;
    const wordLength = searchWord.length;
    let backPointer;
    let frontPointer;
    let backData;
    let frontData;
    let line;
    const lineArray = [];
    do {
      wordIndex = dataChunk.indexOf(searchWord);
      if (wordIndex > -1) {
        backPointer = wordIndex - 1;
        frontPointer = wordIndex + wordLength;
        backData = await backwardSearch(dataChunk, backPointer);
        frontData = await forwardSearch(dataChunk, frontPointer);
        backPointer = backData.pointer;
        frontPointer = frontData.pointer;
        if (backData.isFound) {
          line = dataChunk.substring(backPointer + 1, frontPointer + 1);
        } else {
          line = dataChunk.substring(backPointer, frontPointer + 1);
        }
        line = line.replace(/(\r\n|\n|\r)+/gm, '');
        line = line.replace(/(")+/gm, '').trim();
        lineArray.push(line);
        if (frontPointer + 1 >= dataChunk.length) {
          break;
        } else {
          dataChunk = dataChunk.substring(frontPointer + 1, dataChunk.length);
        }
      } else {
        break;
      }
    } while (true);
    return lineArray;
  } catch (error) {
    throw error;
  }
}

/**
* @function <b>findLine</b><br> Method to read file and push line in collection
* @param  searchWord word to search in file
*/
async function findLine(searchWord) {
  return new Promise((resolve, reject) => {
    try {
      let lineCollection = [];
      const filePath = path.resolve('./cacheFile/big.txt');
      const readStream = fs.createReadStream(filePath, 'utf8');

      readStream.on('data', async (chunk) => {
        const lineArray = await traceData(chunk, searchWord);
        lineCollection = lineCollection.concat(lineArray);
      });

      readStream.on('error', (error) => {
        resolve({ isError: true, data: error });
      });

      readStream.on('end', () => {
        resolve({ isError: false, data: lineCollection });
      });
    } catch (error) {
      resolve({ isError: true, data: error });
    }
  });
}

module.exports = {
  findLine,
  backwardSearch,
  forwardSearch,
  traceData,
};
