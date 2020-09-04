const express = require('express')
const router = express.Router()


const CourseController = require('../app/controllers/courses.controller')

router.post('/store',CourseController.store)
router.get('/create',CourseController.create)
router.post('/handle-form-action',CourseController.handleFormAction)
router.get('/:id/edit',CourseController.edit)
router.put('/:id',CourseController.update)
router.patch('/:id/restore',CourseController.restore)
router.delete('/:id',CourseController.delete)
router.delete('/:id/force',CourseController.forceDelete)
router.get('/:slug',CourseController.detail)




module.exports = router
