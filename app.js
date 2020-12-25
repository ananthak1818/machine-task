var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const app = module.exports = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.sockets = new Set();

io.sockets.on('connection', function (socket) {
  app.sockets.add(socket)
  console.log("Socket ID = " + socket.id + " Connected")
  socket.on('disconnect', data => {
    app.sockets.delete(socket)
    console.log("Socket ID = " + socket.id + " Disconnected");
  });
});

app.use('/', indexRouter);

require('./routes/socket')()

server.listen(process.env.PORT || 3000, function () {
  console.log('app running');
});

// module.exports = app;
