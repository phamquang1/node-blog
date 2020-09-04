const Course = require('../models/course')
const { mutilpleMongooseToObject } = require('../../util/mangoose')
class SiteController {


    // get /
    home(req,res,next){  
        Course.find({})
        .then(courses => {
            res.render('home',{
                courses : mutilpleMongooseToObject(courses)
                // courses : courses.map(course => course.toObject())
            })
        })
        .catch(next)
        // res.render('home')
    }
    //seảch
    search(req,res){
        res.render('search')
    }

}
module.exports = new SiteController