class response {
  static sendSuccess(successData, res) {
    const message = (successData && successData.message) || 'SUCCESS';
    const statusCode = (successData && successData.statusCode) || 200;
    const data = (successData && successData.data) || {};
    res.json({ message, statusCode, data });
  }
  static sendError(errorData, res) {
    const message = (errorData && errorData.message) || 'Some Error Occureds';
    const statusCode = 400;
    const data = {};
    res.json({ message, statusCode, data });
  }
}

module.exports = response;
