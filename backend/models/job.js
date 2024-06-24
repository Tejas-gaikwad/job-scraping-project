const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title : {type:String, require:true},
    link:{type:String, require:true},
});

module.exports = mongoose.model('Job', jobSchema);