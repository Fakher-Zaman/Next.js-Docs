// pages/api/users.ts
import { connectToDatabase } from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

type User = {
    userId: string;
    userName: string;
    userEmail: string;
    userContact: string;
    userAddress: string;
    userType: string;
};

export async function GET() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users'); // No type argument here

        const users: User[] = await collection.find({}).toArray();

        return NextResponse.json({ users });
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { message: 'Failed to fetch users', error: error.message },
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId, userName, userEmail, userContact, userAddress, userType } = await req.json();

        const newUser: User = {
            userId,
            userName,
            userEmail,
            userContact,
            userAddress,
            userType,
        };

        const db = await connectToDatabase();
        const collection = db.collection('users'); // No type argument here

        await collection.insertOne(newUser);

        return NextResponse.json(
            { message: "User added successfully: ", user: newUser },
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error: any) {
        console.error('Error adding user:', error);
        return NextResponse.json(
            { message: 'Failed to add user', error: error.message },
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
