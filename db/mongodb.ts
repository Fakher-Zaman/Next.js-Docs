import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
console.log("MongoDB URI:", uri);

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
    if (db) return db;

    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(); // This uses the database specified in the URI
        console.log('Connected to database');
    } catch (err) {
        console.error('Failed to connect to database', err);
        throw err; // Re-throw the error to handle it in the API route
    }

    return db;
}

export async function closeDatabaseConnection() {
    if (client) {
        await client.close();
        console.log('Database connection closed');
    }
}
