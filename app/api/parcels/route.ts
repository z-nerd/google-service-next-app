import { collection, getDocs, getFirestore } from "firebase/firestore";
import { NextResponse } from "next/server";
import { firebase_app, getFirbaseImageUrl } from "../lib/firebase";


export async function GET(request: Request) {
    try {
        const result: any[] = []
        const db = getFirestore(firebase_app)

        const docs = await getDocs(collection(db, "bearerParcels"))
        docs.forEach(async (doc) => { result.push(doc.data()) })

        
        return NextResponse.json(result, {
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