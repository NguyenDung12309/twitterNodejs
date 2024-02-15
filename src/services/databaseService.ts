import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.gxwqmbq.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
  }
  async connect() {
    try {
      await this.client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      await this.client.close()
    }
  }
}

export const databaseService = new DatabaseService()
