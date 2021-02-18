const multer = require('multer');
const path = require('path');
// File Upload Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //   cb(null, '')
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const middleware = function (req, res, next) {
  var upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single('profileImage');

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // if error happens because of file size
      if (err.code === 'LIMIT_FILE_SIZE') {
        // req.flash('error', 'Large file size');
        return res.status(400).json({ message: 'File size is big' });
      }

      // req.flash('error', 'Something went wrong try again');
      return res.status(400).json({
        message: 'Something went wrong in uploading images! Try again',
      });
    } else if (err) {
      // req.flash('error', 'Something went wrong try again');
      return res.status(400).json({
        message: 'Something went wrong in uploading images! Try again',
      });
    }
    next();
  });
};

module.exports = middleware;
