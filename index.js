const express = require('express')
const cors = require('cors')

const app = express( cors() )
const PORT = 5555

const { createMovie, showAllMovies, showMovieById } = require('./mongo')

// APP ROUTES
app.get('/horror-movies', async (req, res) => {
    const movies = await showAllMovies()
    res.json(movies)
})


app.get('/horror-movies/:id', async (req, res) => {
    const id = req.params.id
    const movie = await showMovieById(id)
    if (movie) {
        res.json(movie)
    } else {
        res.status(404)
        res.json({'error': 'Not found'})
    }
})

app.post('/horror-movies', express.json(), async (req, res) => {
    await createMovie(req.body)
    res.status(201)
    res.send(req.body)
})


app.listen(PORT, () => {
    console.log(`Currently running express on PORT ${PORT}`)
})