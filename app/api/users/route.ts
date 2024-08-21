// pages/api/users.ts
import { connectToDatabase } from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const users = await collection.find({}).toArray();

        return NextResponse.json({ users });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Failed to fetch users', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId, userName, userEmail, userContact, userAddress, userType } = await req.json();

        const db = await connectToDatabase();
        const collection = db.collection('users');

        await collection.insertOne({ userId, userName, userEmail, userContact, userAddress, userType });

        return NextResponse.json(
            { message: "User added successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Failed to add user', error: error.message },
            { status: 500 }
        );
    }
}

