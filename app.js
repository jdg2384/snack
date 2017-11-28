const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')


app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const snackRoutes = require('./src/routes/routes.js')
app.use('/', snackRoutes)

app.get('/snacks', (req, res, next) => {
    res.json({ db })
})

app.get('/snacks/:id', (req, res, next) => {
    const id = req.params.id
    if (!id) return next({status: 400,message: 'Snacks not found'})
    let result = db.filter(function(ele) {
      return ele.id === id
    })
    res.status(200).json(result[0])
})

app.post('/snacks', (req,res,next)=>{
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
})

app.put('/snacks/:id', (req,res,next) => {
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
})

app.delete('/snacks/:id', (req,res,next) => {
    const id = req.params.id
    for (let i = 0; i < db.length; i++) {
        if (db[i]["id"] === id){
        const deleteObj = db.splice(i,1)
        res.status(200).send(deleteObj)
        }
    }
    next({status: 404, message: 'series not found'})
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({ error: err })
})
  
app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Not found' }})
})
  
const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app