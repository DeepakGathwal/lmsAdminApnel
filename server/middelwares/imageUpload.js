const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage,  limits: {
    fieldNameSize: 300,
    fileSize: 1048576, // 1 Mb allowed
  }, });
  
module.exports = upload;