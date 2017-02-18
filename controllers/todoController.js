var bodyParser       = require('body-parser');
var mongoose         = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds157349.mlab.com:57349/todo')

//Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

//Create Model
var Todo    = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/todo', function(request, response){
    // get data from mongoDB and pass it to the view
    Todo.find({}, function(error, data){
      if (error) throw error;
      response.render('todo', {todos: data});  
    }); //retrieve all items in this Todo collection. To find a specific one: Todo.find({item: 'buy flowers'})
  });

  app.post('/todo', urlencodedParser, function(request, response){
    //get data from view and post to mongoDB
    var newTodo = Todo(request.body).save(function(error, data){
      if (error) throw error;
      response.json(data);
    });
  });

  app.delete('/todo/:item', function(request, response){
    //delete the requested item from mongoDB
    Todo.find({item: request.params.item.replace(/\-/g, " ")}).remove(function(error, data){
      if (error) throw error;
      response.json(data);
    });
  });
};
