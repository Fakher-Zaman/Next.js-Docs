// pages/api/users.ts
import { connectToDatabase } from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Get query parameters for pagination
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch the users with pagination
        const users = await collection.find({})
            .skip(skip)
            .limit(limit)
            .toArray();

        // Get the total count of users for pagination purposes
        const totalUsers = await collection.countDocuments({});

        return NextResponse.json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
        });
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

