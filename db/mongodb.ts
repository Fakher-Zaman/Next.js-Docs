// mongodb.ts
import { MongoClient } from 'mongodb';

// Get the MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

let db: any;

export async function connectToDatabase() {
    if (db) return db;

    try {
        await client.connect();
        db = client.db('mydatabase'); // Replace 'mydatabase' with your database name
        console.log('Connected to database');
    } catch (err) {
        console.error('Failed to connect to database', err);
    }

    return db;
}
