import { connectToDatabase } from "@/db/mongodb";
import { NextResponse, NextRequest } from "next/server";

// GET: Fetch a user by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const user = await collection.findOne({ userId: params.id });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Failed to fetch user', error: error.message },
            { status: 500 }
        )
    }
}

// PATCH: Update a user by ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userName, userEmail, userContact, userAddress, userType } = await req.json();

        const db = await connectToDatabase();
        const collection = db.collection('users');
        const result = await collection.updateOne(
            { userId: params.id },
            {
                $set: {
                    ...(userName && { userName }),
                    ...(userEmail && { userEmail }),
                    ...(userContact && { userContact }),
                    ...(userAddress && { userAddress }),
                    ...(userType && { userType }),
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Failed to update user', error: error.message },
            { status: 500 }
        );
    }
}

// DELETE: Delete a user by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const result = await collection.deleteOne({ userId: params.id });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Failed to delete user', error: error.message },
            { status: 500 }
        );
    }
}