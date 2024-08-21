import { NextRequest, NextResponse } from "next/server";

type User = {
    userId: String;
    userName: String;
    userEmail: String;
    userContact: String;
    userAddress: String;
    userType: String;
};

let users: User[] = [];

export async function GET() {
    return NextResponse.json({ users });
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
        users.push(newUser);

        return NextResponse.json(
            { message: "User added successfully: ", users },
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error: any) {
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