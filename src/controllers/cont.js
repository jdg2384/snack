const model = require('../models/models.js')
const uuid = require('uuid/v4')

function allItems (req, res, next) {
    res.json({ db })          
}

function oneItem (req, res, next) {
    const id = req.params.id
    if (!id) return next({status: 400,message: 'Snacks not found'})
    let result = db.filter(function(ele) {
      return ele.id === id
    })
    res.status(200).json(result[0])          
}

function postItem (req, res, next) {
    const snacks = req.body
    const name = db.series.filter(function(ele){
        return ele.name === snacks.name, ele.likes === snacks.likes, ele.description === snacks.description
    })
    if(name.length > 0) next({status: 400, message: "name exists"})
    if(!snacks.name) return next({status: 400, message: "Not Present"})
    let postId = uuid()
    let obj ={
        id: postId,
        name: snacks.name,
        likes: snacks.likes,
        description: snacks.description,
    }
    db.push(obj)
    res.status(201).json(obj)          
}

function updateItem (req, res, next) {
    let {id} = req.params
    let {name} = req.body
    let {likes} = req.body
    let {description} = req.body
    db.series.forEach(ele => {
        if(ele.id === id){
        ele.name = name
        ele.likes = likes
        ele.description = description
        res.status(200).json({id,name})
        }
    })
    res.status(404).json({status: 404, message: "Not Present"})          
}

function delItem (req, res, next) {
    const id = req.params.id
    for (let i = 0; i < db.length; i++) {
        if (db[i]["id"] === id){
        const deleteObj = db.splice(i,1)
        res.status(200).send(deleteObj)
        }
    }
    next({status: 404, message: 'series not found'})          
}

module.exports = { allItems, oneItem, postItem, updateItem, delItem }//// ALSO rename them 

