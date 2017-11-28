const ctrl = require('../controllers/cont.js')
const express = require('express')
const router = express.Router()

router.get('/snacks', ctrl.allItems) 
router.get('/snacks/:id', ctrl.oneItem)
router.post('/snacks', ctrl.postItem)
router.put('/snacks/:id', ctrl.updateItem) 
router.delete('/snacks/:id', ctrl.delItem) 

module.exports = router