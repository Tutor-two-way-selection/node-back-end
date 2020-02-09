var express = require("express");
var router = express.Router();
var studentservices = require("../api/studentApi");
var fs=require("fs")
var multer = require('multer');//引入multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  }
})

var upload = multer({dest: 'uploads/'});//设置上传文件存储地址
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/login",studentservices.stulogin)
router.get("/changePass",studentservices.changePass)
router.get("/selfinfo", studentservices.selfInfo)
router.get("/allteacher",studentservices.allTeacher )
router.get("/teacherbyid",studentservices.teacherById )
router.get("/teacherbydepartment",studentservices.teacherByDepartment)


router.post('/uploadFile', upload.single('file'), (req, res, next) => {
 
  let ret = {};
  ret['code'] = 20000;
  var file = req.file;
  if (file) {

      //文件重命名
      fs.renameSync('./uploads/' + file.filename, `./uploads/${file.originalname}`);

  }
  ret['file'] = file;
  res.send(ret);
})
router.use('/downloadFile', (req, res, next) => {
  var filename = req.query.filename;
  var oldname = req.query.oldname;
  var file = './uploads/' + filename;
  res.writeHead(200, {
      'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
      'Content-Disposition': 'attachment; filename=' + encodeURI(oldname),//告诉浏览器这是一个需要下载的文件
  });//设置响应头
  var readStream = fs.createReadStream(file);//得到文件输入流
  debugger
  readStream.on('data', (chunk) => {
      res.write(chunk, 'binary');//文档内容以二进制的格式写到response的输出流
  });
  readStream.on('end', () => {
      res.end();
  })
})

module.exports = router;