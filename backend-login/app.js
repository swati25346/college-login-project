
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/college', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  },
});

require("./models/Uploads");
const upldSchema = mongoose.model("Upload");
const upload = multer({ storage });


mongoose.models['User'].schema.path('role').validate(function() {
  return true; 
});

// Routes
app.post('/login', (req, res) => {
  User.create(req.body)
    .then(User => res.json(User))
    .catch(err => res.json(err));
});

app.post('/upload', upload.single('filename'), async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  const username = req.body.username;
  const filename = req.file.filename;
  try {
    await upldSchema.create({ username: username, filename: filename });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

  


app.get('/upload-history', async (req, res) => {
  try {
    const users = await User.find({ role: 'student' }).select('username name email contactNumber filename uploadDate');
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
});

// handle resume download
app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error downloading file' });
    }
  });
});

app.get("/", async (req, res) => {
  res.send("Success!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
