
var ArticleProvider = require('../articleprovider-mongodb').ArticleProvider;
var articleProvider = new ArticleProvider('localhost', 27017);

/*
 * GET home page.
 */

var brand = 'Main Brand';
var menus_obj = { 'home':'Home','projects':'Projects', 'about':'About' }

exports.index = function(req, res){
  res.redirect('/home');
};

exports.home = function(req, res){
  res.render('home', { title: 'Home', id: 'home', brand: brand, menus: 'ABCD', body: 'WXYZ' })
};

exports.about = function(req, res){
    res.render('about', { title: 'About', id: 'about', brand: brand, menus: menus_obj, test: 'kick this' })
};

exports.projects = function(req, res){
    res.render('projects', { title: 'Projects', id: 'projects', brand: brand, menus: menus_obj })
};

exports.layout = function(req, res){
    res.render('layout', { title: 'Top BS page', id: 'layout', brand: brand , menus: menus_obj })
};

exports.blog = function(req, res){
    articleProvider.findAll(function(error, docs){
        res.render('blog', {
            title: 'Blog'
            , id: 'blog'
            , articles: docs
            , brand: 'Blogga'
        });
    });
};

exports.blog_show = function(req, res) {
//    console.log(req.params.id);
    articleProvider.findById(req.params.id, function(error, article) {
        console.log(article);
        res.render('blog_show', {
            article: article
            , test: 'XYZ'
            , title: 'ABC'
        });
    });
};