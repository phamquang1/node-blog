const Course = require('../models/course')
const { mongooseToObject, mutilpleMongooseToObject } = require('../../util/mangoose')


class MeController {
    // me/stored/courses
    storedCourses(req,res,next){

        Promise.all([Course.find({}),Course.countDocumentsDeleted()])
            .then(([courses,deletedCount]) => {
                res.render('me/stored-courses',{
                    courses : mutilpleMongooseToObject(courses),
                    deletedCount : deletedCount
                })
            })
            .catch(next)

            
        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
                
        //     })
        //     .catch(next)

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses',{
        //         courses : mutilpleMongooseToObject(courses),
        //     }))
        //     .catch(next)
    }
    trashCourses(req,res,next){
        Course.findDeleted({})
             .then(courses => res.render('me/trash-courses',{
                 courses : mutilpleMongooseToObject(courses)
             }))
             .catch(next)
     }
    

}
module.exports = new MeController