var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/Play", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const schema = new Schema();

// console.log(schema.path('_id')); 

var arr = [2, 4, 5]
console.log(arr.includes(5));

