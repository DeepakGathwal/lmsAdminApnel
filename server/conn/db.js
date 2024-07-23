const mysql  = require('mysql');
const catchAsyncError = require('../middelwares/catchAsyncError');

/** call database */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:  process.env.DB_DATABASE,
});

/** database connection for all Api's */
exports.executeQuery = async (newQuery, args) => {
  try {
    return new Promise(async (resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) {
          return;
        }
        connection.query(newQuery, args, async (err, data) => {
          if (data) {
            const value = resolve(data);
            connection.release();
            return value;
          } else {
            const value = reject(err);
            connection.release();
            return value;
          }
        });
      });
    }).finally(() => {
      db.removeAllListeners();
    });
  } catch (err) {
    db.getConnection((err, connection) => {
      if (err) {
        console.error("Error acquiring connection:", err);
        return;
      }
      connection.release();
    });
  }
};

process.on("exit", () => {
  db.end(); // Close the connection pool
});


exports.escapeRequestBody = catchAsyncError(async(req, res, next) => {
  
  // Loop through each property in req.body
  if (req.body && typeof(req.body) === 'object') {
    // Loop through each property in req.body
    for (const key in req.body) {
      // Check if the property is present in req.body and is not null or undefined
      if ( req.body[key] != null) {
        // Escape the value using mysql.escape
        req.body[key] = mysql.escape(req.body[key]);
      }
    }
   
  }
  // Move to the next middleware or route handler
  next();
})