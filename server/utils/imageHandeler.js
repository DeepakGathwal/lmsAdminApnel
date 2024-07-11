const DataUriParser = require('datauri/parser')
const path = require('path')


exports.getDataUri = async (file) => {
    // Create a new DataUriParser instance
    const parser = await new DataUriParser();

    // Get the file extension
    const extname = path.extname(file.originalname.toString());

    // Convert the original image buffer to a data URI without applying blur
    const bufferData = await parser.format(extname, file.buffer);

    // Return the original image data URI
    return bufferData.content;
};
