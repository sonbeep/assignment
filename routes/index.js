var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {Schema} = require("mongoose");


const uri = "mongodb+srv://NguyenMinhSon:C4sjIDtof7kkSrPd@cluster0.dr6gc.mongodb.net/Assignment?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log("Co loi xay ra"));



const THUVIEN =mongoose.model('anh', new Schema({
  linkanh: String,
  tieude: String,
  ghichu: String
}))



/* GET home page. */
router.get('/', function(req, res, next) {
  THUVIEN.find({},function (error, result){
    if (error) throw error;
    console.log(result.length)
    res.render('index', { title: 'Express', data: result });
  })


});
router.get('/delete/',function (req,res){
  const id = req.query.id;
  THUVIEN.deleteOne({_id: id}, function (error){
    if (error) throw error;
    res.send("Xoa thanh cong");
  })
})

router.get('/updateForm/', function (req, res){
  const id= req.query.id;
  THUVIEN.findOne({_id: id}, function (error, result){
    res.render('update', {title: 'Update', data: result})
  })
})


router.post('/update', async function(req, res){
  const id = req.body.id;
  const linkanh = req.body.linkanh;
  const tieude = req.body.tieude;
  const ghichu = req.body.ghichu;

  await THUVIEN.updateOne({_id: id},{
  linkanh: linkanh,
  tieude: tieude,
  ghichu: ghichu
  }, null)
  res.redirect('/')
})

router.post('/create', async function(req, res){
  const id = req.body.id;
  const linkanh = req.body.linkanh;
  const tieude = req.body.tieude;
  const ghichu = req.body.ghichu;

  var tv = new THUVIEN({
  linkanh: linkanh,
    tieude: tieude,
    ghichu: ghichu
  })

  await tv.save();

  res.redirect('/')
})
router.get('/getUser', function (req, res){
  const thuVienList = mongoose.model('anh', THUVIEN);

  thuVienList.find({},function (error, result){
    res.send(result);
  })
})

module.exports = router;
