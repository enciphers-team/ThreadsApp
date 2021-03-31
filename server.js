const express = require('express');
const app = express();
const uniqueId = require('uniqid');

// var cors = require('cors');
// app.use(cors());

// app.options('*', cors());

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const socketio = require('socket.io');
const User = require('./models/user');

// app.options('*', cors());

// app.use(express.urlencoded());

process.env.ACCESSKEYID =
  process.env.ACCESSKEYID.length == 0 ? undefined : process.env.ACCESSKEYID;
process.env.SECRETACCESSKEY =
  process.env.SECRETACCESSKEY.length == 0
    ? undefined
    : process.env.SECRETACCESSKEY;
process.env.REGION =
  process.env.REGION.length == 0 ? undefined : process.env.REGION;
process.env.BUCKET_NAME =
  process.env.BUCKET_NAME.length == 0 ? undefined : process.env.BUCKET_NAME;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

require('./config/mongoose');
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(`Databsase Error ${err}`);
});
db.once('open', () => {
  console.log('Connected to Moongose');
});

// Developement mode
const port = process.env.PORT || 3000;
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use(
//   session({
//     name: 'ck',
//     secret: 'thr3@ds@000',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 1000 * 60 * 100,
//     },
//     store: new MongoStore({
//       mongooseConnection: db,
//       autoRemove: 'disabled',
//     }),
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.setAuthentication);
// app.use(flash());
// app.use(flashSetting.setFashMessage);
// app.set('layout extractStyles', true);

// app.use(expressLayouts);
app.use('/', require('./routes/index'));

const server = app.listen(port, (err) => {
  if (err) {
    `Something wrong with running the server --> ${err}`;
    return;
  }
  console.log(`connected to server on port:${port}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('send_message', async (data) => {
    console.log('sending message to all');
    console.log(data);
    const user = await User.findOne({ email: data.email });
    data = {
      ...data,
      id: user._id,
      uniqueId: uniqueId(),
    };
    console.log(data);
    io.emit('send_message_to_all', data);
  });
});
