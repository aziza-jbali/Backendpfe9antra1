const multer = require("multer");
const path = require('path');
const fs = require('fs');

//------------------- إعداد multer -------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // مجلد حفظ الصور
  },
  filename: function (req, file, cb) {
    const uploadPath = 'public/images';
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    let fileName = originalName;

    // التحقق إذا كان الملف موجود بالفعل وإضافة رقم
    let fileIndex = 1;
    while (fs.existsSync(path.join(uploadPath, fileName))) {
      const baseName = path.basename(originalName, fileExtension);
      fileName = `${baseName}_${fileIndex}${fileExtension}`;
      fileIndex++;
    }

    cb(null, fileName);
  }
});

const uploadfile = multer({ storage: storage });
module.exports = uploadfile;