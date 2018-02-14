const mockData = require('./mockData');
const services = require('../Services');

describe('Unit test of services function', () => {
  test('unit test for backwardSearch', async () => {
    const backData = await services.fileService.backwardSearch(mockData.line1, mockData.backPointer);
    expect(backData).not.toBe(null);
  });

  test('unit test for forwardSearch', async () => {
    const frontData = await services.fileService.forwardSearch(mockData.line2, mockData.frontPointer);
    expect(frontData).not.toBe(null);
  });

  test('unit test for traceData', async () => {
    const traceData = await services.fileService.traceData(mockData.fileChunk, mockData.searchWord);
    expect(traceData).not.toBe(null);
  });
});
