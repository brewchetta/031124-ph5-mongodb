require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')
const uri = process.env.MONGO_URL

const mongoClient = new MongoClient(uri, {
    useUnifiedTopology: true
})

const showsConnection = async () => {
    await mongoClient.connect()
    const showsDB = mongoClient.db('showsdb')
    const shows = showsDB.collection('shows')
    return shows
}

// READ ALL
// uses shows.find({})


// READ ONE
// uses shows.findOne({_id: ObjectId})


// CREATE ONE
// uses shows.insertOne(obj)


// UPDATE ONE
// uses shows.updateOne(ObjectId, {'$set': obj})
// will have to find show again to return it


// DELETE ONE
// uses shows.deleteOne({_id: ObjectId})