import { NextResponse } from "next/server"
import { firebase_app } from "../lib/firebase"
import { getFunctions, httpsCallable } from "firebase/functions"


export async function POST(request: Request) {
    try {
        const body = await request.json()

        const functions = getFunctions(firebase_app)
        const pricing = httpsCallable(functions, 'pricing', {
            timeout: 10000
        })

        const result: any = await pricing(body)


        return NextResponse.json({...result.data}, {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            error: {
                name: error?.name || "unknown",
                message: error?.message || "Something went wrong!",
                ...error
            }
        }, { status: 500 })
    }
}


export const revalidate = 0