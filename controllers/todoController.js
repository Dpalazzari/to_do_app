var bodyParser       = require('body-parser');
var data             = [ {item: 'learn mongo'}, {item: 'organize project'}, {item: 'learn javascript'} ];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/todo', function(request, response){
    response.render('todo', {todos: data});  
  });

  app.post('/todo', urlencodedParser, function(request, response){
    data.push(request.body);
    response.json(data);
  });

  app.delete('/todo/:item', function(request, response){
    data = data.filter(function(todo){ //filter's item out of the array when todo.item === :item in the route
      return todo.item.replace(/ /g, '-') !== request.params.item; //creates a slug for each item basically
    });
    response.json(data);
  });
};
