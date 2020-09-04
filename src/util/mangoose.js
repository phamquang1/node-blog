// module.exports = {
//     mutipleMongooseToObject : function(mongooseArray){
//         return mongooseArray.map(mongoose => mongoose.toObject())
//     },
//     mongooseToObject : function(mongoose){
//         return mongoose ? mongoose.toObject() : mongoose
//     }
// }
module.exports.mutilpleMongooseToObject = function(mongooseArray){
    return mongooseArray.map(mongoose => mongoose.toObject())
}
module.exports.mongooseToObject = function(mongoose){
    return mongoose ? mongoose.toObject() : mongoose
}