const multerS3 = require('multer-s3');
const multer = require('multer');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
});
const imageFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const middleware = function (req, res, next) {
  var upload = multer({
    limits: {
      fileSize: 5 * 1024 * 1024, // 1MB
    },
    fileFilter: imageFilter,
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      acl: 'public-read',
      cacheControl: 'max-age=31536000',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    }),
  }).single('postImage');

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // if error happens because of file size
      if (err.code === 'LIMIT_FILE_SIZE') {
        // req.flash('error', 'Large file size');
        return res.status(400).json({ message: 'File size is big' });
      }

      // req.flash('error', 'Something went wrong try again');
      console.log(err);

      return res.status(400).json({
        message: 'Something went wrong in uploading images! Try again',
      });
    } else if (err) {
      // req.flash('error', 'Something went wrong try again');
      console.log(err);
      return res.status(400).json({
        message: 'Something went wrong in uploading images! Try again',
      });
    }
    next();
  });
};

module.exports = middleware;
