import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

let db: any;

export async function connectToDatabase() {
    if (db) return db;

    try {
        await client.connect();
        db = client.db(); // This uses the database specified in the URI
        console.log('Connected to database');
    } catch (err) {
        console.error('Failed to connect to database', err);
    }

    return db;
}
