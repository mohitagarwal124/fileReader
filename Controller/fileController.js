const response = require('../Lib/response');
const services = require('../Services');

/**
* @function <b>processFile</b><br> Method to read and process file
* @param  req  request object
* @param  res object
*/
async function processFile(req, res) {
  try {
    console.log('===req.body===', req.body);
    const lineData = await services.fileService.findLine(req.body.searchWord);
    if (lineData.isError) {
      throw lineData;
    }
    response.sendSuccess(lineData, res);
  } catch (error) {
    response.sendError(error, res);
  }
}


module.exports = {
  processFile,
};
