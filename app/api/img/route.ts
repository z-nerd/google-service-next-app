import { collection, getDocs, getFirestore } from "firebase/firestore";
import { NextResponse } from "next/server";
import { firebase_app, getFirbaseImageUrl } from "../lib/firebase";


export async function POST(request: Request) {
    try {
        const body = await request.json()
        if (!body?.src) {
            return NextResponse.json({ message: "src props missing you!" }, {
                status: 400
            })
        }

        const url = await getFirbaseImageUrl(body.src)

        return NextResponse.json({ url }, {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message: "Something went wrong and can't get data from firebase!",
            errorName: error.name,
            errorMessage: error.message,
        }, {
            status: 500
        })
    }
}


export const revalidate = 30