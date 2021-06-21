const express = require('express')
const bodyParser = require("body-parser")
const mysql = require('mysql')
const router = express.Router()
const cors = require('cors')
const app = express()
const secure = require('crypto')
var multer = require('multer')
var ffmpeg = require('fluent-ffmpeg');


const { v4: uuidv4 } = require('uuid');

//kkkk
let file_path
let image_path
let vid_length
let full_path
//hello

ffmpeg.setFfprobePath('C:\\ffmpeg_module\\bin\\ffprobe.exe')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\\work\\ZLI\\Abschluss_Projekt\\videoshare\\src\\assets\\VIDEOS')
    return cb
  },
  filename: function (req, file, cb) {
    let file_name = uuidv4() + '-' + file.originalname
    console.log(file_name)
    cb(null, file_name)
    ///var ext = path.extname(file.originalname)
    //console.log(ffmpeg.ffprobe)
    if (file.mimetype == 'video/mp4' || file.mimetype == 'video/mpeg') {
      file_path = file_name
      full_path = 'C:\\work\\ZLI\\Abschluss_Projekt\\videoshare\\src\\assets\\VIDEOS\\' + file_name
      console.log(file_path)
      console.log('UPLOAD NOW')
    } else if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/tiff' || file.mimetype == 'image/png') {
      image_path = file_name
    }
  }
})

var upload = multer({ storage: storage })
const port = 3000


// Express should use body-parser
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 8086,
  password: "videoshare_dababy",
  database: 'videoshare'
})

//This is for registering a User 
router.post('/register', async (req, res) => {
  // To access POST variabkle use req.body()method
  console.log('Got body:', req.body)
  let data_user = req.body
  let password = data_user.password

  const hash = secure.createHash('sha256')

  hash.update(password)
  let password_hashed = hash.digest('hex')

  let query = 'INSERT INTO users(username, password, firstname, lastname, email) VALUES (' + con.escape(data_user.username) + ',' + con.escape(password_hashed) + ',' + con.escape(data_user.firstname) + ',' + con.escape(data_user.lastname) + ',' + con.escape(data_user.email) + ');'

  console.log(query)
  con.query(query, (error, results, fields) => {
    if (error) {
      return console.error(error.message)
    } else {
      console.log(results)
      res.send(results)
    }
  })
})

router.post('/login', async (req, res) => {
  // To access POST variabkle use req.body()method
  console.log('Got body:', req.body)
  let data_user = req.body
  let password = data_user.password

  const hash = secure.createHash('sha256')

  hash.update(password)
  let password_hashed = hash.digest('hex')


  let query = 'SELECT * FROM `users` WHERE `username` = ' + con.escape(data_user.username) + ' AND `password` = ' + con.escape(password_hashed) + ';'
  console.log(query)
  con.query(query, (error, results, fields) => {
    if (error) {
      return console.error(error.message)
    } else if (results.length == 0) {
      console.log(results)
      return console.log('RESULTS ARE NULL, USER OR PASSWORD WRONG')
    } else {
      console.log(results)
      res.send(results)
    }
  })
})


router.post('/users', (req, res) => {
  console.log(req);
  // res.send('Hello Moundo!') 
  let query = 'SELECT username, firstname, lastname, email FROM users WHERE `user_id` = ' + con.escape(req.body.user_id) + ';' 
  console.log(query)
  con.query(query, (error, results, fields) => {
    if (error) {
      return console.error(error.message)
    } else {
      res.send(results)
    }
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.use("/", router)
// app.use(express.static('HTML', { index: 'test.html' }))
app.get('/test', (req, res) => {
  res.sendFile('/HTML/test.html')
})
app.get('/videos', (req, res) => {
  console.log(req);
  let query = "SELECT * FROM videos"
  con.query(query, (error, results, fields) => {
    if (error) {
      return console.error(error.message)
    } else {
      /*let blob_data = []
      results.forEach(element => {
        blob_data.push(element.thumbnail.data)
      })*/

      res.send(results)
    }
    // console.log(results)

  })
})
router.post('/upload', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]), async (req, res) => {
  let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  try {
    console.log('mp4', file_path)
    const get_Time = await get_Duration(full_path)
    console.log(get_Time)
    let query = 'INSERT INTO videos(title, length, path, time, thumbnail) VALUES (' + con.escape(req.body.title) + ',' + con.escape(get_Time) + ',' + con.escape(file_path) + ', ' + con.escape(date) + ', ' + con.escape(image_path) + ');'
    console.log(query)
    con.query(query, (error, results, fields) => {
      if (error) {
        console.log('Here', error.message)
      } else {
        console.log('Sucess')
      }
    })
  } catch (error) {
    console.log(console.log(error.message))
  }

})

app.get('/dislike', (req, res) => {
  let query = "UPDATE videos SET dislikes = dislikes + 1 WHERE SomeFilterField = @ParameterID"
})

router.post('/getVideo', (req, res) =>{
  let query = `SELECT * FROM videos WHERE videos_id = ${req.body.id}`
  con.query(query, (error, results, fields) => {
    if(error){
      console.log(error)
    }else{
      res.send(results)
    }
  })
})

app.get('/getComments', (req, res) =>{
  let query = 'SELECT * FROM comments'
  con.query(query, (error, results, fields) => {
    if(error){
      console.log(error)
    }else{
      res.send(results)
    }
  })
})

function get_Duration(file_path) {
  console.log('started')
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(file_path, function (err, metadata) {
      console.log('helloi')
      if (err) {
        console.log(file_path)
        console.log(err.message)
        return reject(err)
      } else {
        console.log("Here", file_path)
        console.log(metadata.format.duration)
        vid_length = metadata.format.duration / 60
        return resolve(vid_length)
      }
    })
  })
}