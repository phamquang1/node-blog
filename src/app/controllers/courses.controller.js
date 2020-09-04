const Course = require('../models/course')
const { mongooseToObject } = require('../../util/mangoose')


class CoursesController {
    // /courses/:slug
    detail(req,res,next){
        Course.findOne({slug : req.params.slug})
        .then((course)=>{
            res.render('courses/detail',{
                course : mongooseToObject(course)
            })
        })
        .catch(next)
    }
    //get
    create(req,res,next){
        res.render('courses/create')
    }
    ///courses/:id/edit
    edit(req,res,next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{
                course : mongooseToObject(course)
            }))
            .catch(next)
        
    }
    //courses/:id
    update(req,res,next){
        Course.updateOne({_id : req.params.id},req.body)
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next)
    }
    // delete courses/:id   (cái này dùng plugin mongoose-delete để soft delete)
    delete(req,res,next){
        Course.delete({ _id : req.params.id})
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    // delete courses/:id/force 
    forceDelete(req,res,next){
        Course.deleteOne({ _id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // post
    store(req,res,next){
        const formData = {...req.body}
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(formData)
        course.save()
            .then(()=>{
                res.redirect('/me/stored/courses')
            })
            .catch(err => {
                
            })
    }
    // ptach courses/id/restore
    restore(req,res,next){
        Course.restore({ _id : req.params.id})
            .then(()=>{
                res.redirect('back')
            })
            .catch(next)
    }
    // post courses/handle-form-action
    handleFormAction(req,res,next){
        switch(req.body.action){
            case 'delete' : {
                Course.delete({ _id : { $in : req.body.courseIds }})
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next)
                break
            }
            default : {
                res.json(req.body.action)
            }
        }
    }
}
module.exports = new CoursesController