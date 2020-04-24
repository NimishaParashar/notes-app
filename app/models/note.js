const mongoose = require("mongoose");
//schema

const Schema = mongoose.Schema;
const noteSchema = new Schema({
  title: {
    type: String,
    required: true
    // custom validation
    // validate:{
    //     validator:function(value){
    //         condition ?true :false
    //     },
    //     message:function(){
    //         return 'Something went wrong'
    //     }
    // }
  },
  body: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

//mongoose middleware
//pre('validate')
noteSchema.pre("save", function(next) {
  console.log("function called before saving a record");
  next();
});

//model
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
