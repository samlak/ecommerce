var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/Play", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const schema = new Schema();

console.log(schema.path('_id')); 

