import { NextResponse } from "next/server"
import { firebase_app } from "../lib/firebase"
import { getFunctions, httpsCallable } from "firebase/functions"


interface Pricing {
    origin: {
        lat: number
        lng: number
    }
    destination: {
        lat: number
        lng: number
    }
    vehicle_type: {
        walking: boolean,
        driving: boolean,
        bicycling: boolean,
    }
    parcel_type: string
    parcel_description: string,
    parcel_min_weight: number,
    parcel_max_weight: number,
}


export async function POST(request: Request) {
    try {
        let result = null
        const body: Pricing = await request.json()
        console.log(body)

        const functions = getFunctions(firebase_app)
        const pricing = httpsCallable(functions, 'pricing')

        pricing(body).then(res => {
            result = res.data
            console.log(result)
        })
            .catch((error) => {
                throw new Error(error)
            })


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


export const revalidate = 0