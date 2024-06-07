require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')
const uri = process.env.MONGO_URL

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
    useUnifiedTopology: true
})

const showsConnection = async () => {
    await mongoClient.connect()
    const showsDB = mongoClient.db('showsdb')
    const shows = showsDB.collection('shows')
    return shows
}

exports.searchShowById = async function searchShowById(id) {
    const shows = await showsConnection()
    
    const foundShow = await shows.findOne({ _id: ObjectId(id) })

    return foundShow
}

exports.allShows = async function allShows() {
    const shows = await showsConnection()
    
    const cursor = await shows.find({})
    const foundShows = await cursor.toArray()
    
    return foundShows
}

exports.createShow = async function createShow(obj) {
    const shows = await showsConnection()
    
    const result = await shows.insertOne(obj)
    return result
}

exports.updateShowById = async function(id, updateObj) {
    const shows = await showsConnection()

    await shows.updateOne({ _id: ObjectId(id)}, {"$set": updateObj})
    const result = await shows.findOne({_id: ObjectId(id)})
    return result
}

exports.deleteShowById = async function deleteShowById(id) {
    const shows = await showsConnection()

    console.log("------------------------id:", id)
    
    const result = await shows.deleteOne({_id: ObjectId(id)})
    return result
}