/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , datafeed = require('./routes/datafeed')
  , http = require('http')
  , path = require('path');

var app = express();



var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

// var ArticleProvider = require('./articleprovider-memory').ArticleProvider;
var ArticleProvider = require('./articleprovider-mongodb').ArticleProvider;


// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// var articleProvider= new ArticleProvider();
var articleProvider = new ArticleProvider('localhost', 27017);

// Routes

app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/about', routes.about);
app.get('/projects', routes.projects);
app.get('/test', datafeed.test);
app.get('/blog', routes.blog);

app.get('/blog/:id', routes.blog_show);

app.get('/blog/new',
    function(req, res) {
        res.render('blog_new.jade', {
            locals: {
                title: 'New Post'
            }
        });
    });

// ===========================  POST

app.post('/blog/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
        }, function( error, docs) {
        res.redirect('/blog')
    });
});


app.post('/blog/addComment'
    , function(req, res) {
        articleProvider.addCommentToArticle(req.param('_id'),
            {
                person: req.param('person'),
                comment: req.param('comment'),
                created_at: new Date()
            } , function( error, docs) {
                res.redirect('/blog/' + req.param('_id'))
        });
    });


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

