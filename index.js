const express = require('express')
const cors = require('cors')

const { searchShowById, allShows, createShow, deleteShowById, updateShowById } = require('./mongo')

const app = express()
const PORT = 4000

app.use(cors())

// APP ROUTES

app.get('/shows', async (req, res, next) => {
    console.log(`GET for /shows`)
    
    const shows = await allShows()
    
    res.json(shows)  
})

app.get('/shows/:id', async (req, res, next) => {
    const id = req.params.id
    console.log(`GET for /shows/${id}`)

    const show = await searchShowById(id)

    if (show) {
        res.json(show)
    } else {
        res.status(404)
        res.json({status: 404, error: 'Not found'})
    }
})

app.post('/shows', express.json(), async (req, res, next) => {
    const newShow = await createShow(req.body)
    res.status(201)
    res.json({status: 201, response: newShow.ops })
})

app.patch('/shows/:id', express.json(), async (req, res, next) => {
    const id = req.params.id
    const foundShow = await searchShowById(id)
    if (foundShow) {
        const updatedShow = await updateShowById(id, req.body)
        console.log(updatedShow)
        res.status(202)
        res.json({status: 202, response: 'updated!' })
    } else {
        res.status(404)
        res.json({status: 404, response: 'Not found' })
    }
})

app.delete('/shows/:id', express.json(), async (req, res, next) => {
    const id = req.params.id
    const result = await deleteShowById(id)
    // console.log(result)
    res.status = 202
    res.json({status: 202, deletedCount: result.deletedCount})
})


app.listen(PORT, () => {
    console.log(`Currently running express on PORT ${PORT}`)
})