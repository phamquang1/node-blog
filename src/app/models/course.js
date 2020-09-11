// Using Node.js `require()`
const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const Course = new Schema({
    _id: {type: Number,},
    name: {type: String ,maxlength: 255 ,require: true },
    description: {type:String,maxlength: 600},
    image: {type: String, maxlength :255 },
    videoId: {type: String, maxlength :255 },
    level: {type: String, maxlength :255 },
    slug : {type: String , slug :'name',unique : true}
  },{
    // tự thêm 2 key createAt, updateAt
    timestamps: true,
    //
    _id : false
  });
  // custom query helper
  Course.query.sortable = function(req){
    if(req.query.hasOwnProperty('_sort')){
      const isValidType = ['asc','desc','default'].includes(req.query.type)
      return this.sort({
          [req.query.column] : isValidType ? req.query.type : 'desc'
      })
    } 
    return this
  }

  //add plugin (cái này dùng plugin mongoose delete để soft delete 'override ghi đè')
  mongoose.plugin(slug)
  Course.plugin(mongooseDelete,{ overrideMethods: 'all',deletedAt : true }) 
  Course.plugin(AutoIncrement);

module.exports = mongoose.model('course', Course)