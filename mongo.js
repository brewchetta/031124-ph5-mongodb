require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const uri = process.env.MONGO_URL

const mongoClient = new MongoClient(uri, {
    useUnifiedTopology: true
})

async function moviesConnection() {
    await mongoClient.connect()
    const moviesDB = mongoClient.db('horrorMoviesDB')
    const movies = moviesDB.collection('horrorMovies')
    return movies
}

// READ ALL
// uses shows.find({})

exports.showAllMovies = async () => {
    const moviesCursor = await moviesConnection()
    
    const movies = moviesCursor.find({}).toArray()
    return movies
}


// READ ONE
// uses shows.findOne({_id: ObjectId})
exports.showMovieById = async (id) => {
    const moviesCursor = await moviesConnection()

    try {
        const movie = await moviesCursor.findOne({ _id: new ObjectId(id) })
        return movie
    }
    catch {
        return null
    }
}


// CREATE ONE
// uses shows.insertOne(obj)
exports.createMovie = async (movieObj) => {
    const moviesCursor = await moviesConnection()

    const newMovie = await moviesCursor.insertOne(movieObj)
    console.log(newMovie)
    // return newMovie
}


// UPDATE ONE
// uses shows.updateOne(ObjectId, {'$set': obj})
// will have to find show again to return it


// DELETE ONE
// uses shows.deleteOne({_id: ObjectId})