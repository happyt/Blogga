
/*
 * GET home page.
 */

var brand = 'Main Brand';
var menus_obj = { 'home':'Home','projects':'Projects', 'about':'About' }

exports.index = function(req, res){
  res.redirect('/home');
}

exports.home = function(req, res){
  res.render('home', { title: 'Home', id: 'home', brand: brand, menus: menus_obj })
};

exports.about = function(req, res){
    res.render('about', { title: 'About', id: 'about', brand: brand, menus: menus_obj })
};
exports.projects = function(req, res){
    res.render('projects', { title: 'Projects', id: 'projects', brand: brand, menus: menus_obj })
};

exports.test = function(req, res){
    res.render('test', { title: 'Test', id: 'test', brand: brand, menus: menus_obj })
};

exports.layout = function(req, res){
    res.render('layout', { title: 'Top BS page', id: 'layout', brand: brand , menus: menus_obj })
};
