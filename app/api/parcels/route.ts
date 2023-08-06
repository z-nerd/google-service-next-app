import { collection, getDocs, getFirestore } from "firebase/firestore";
import { NextResponse } from "next/server";
import { firebase_app } from "../lib/firebase";

const mock = [{ "parcel_description": "35 x 27 x 4 cm ---", "parcel_max_weight": 2.5, "parcel_type": "Enve120", "parcel_min_weight": 0.1, "parcel_img_url": "parcelsImage/AEK5G5Y5QyxWw37IvJXd.png", "vehicle_type": { "bicycling": true, "walking": true, "driving": true } }, { "parcel_description": "34 x 32 x 10 cm max", "vehicle_type": { "bicycling": true, "driving": true, "walking": false }, "parcel_type": "Box - Small", "parcel_img_url": "parcelsImage/VcIZCHegdnzxW0jowMt2.png", "parcel_max_weight": 3.5, "parcel_min_weight": 1 }, { "parcel_min_weight": 3, "vehicle_type": { "walking": false, "driving": true, "bicycling": false }, "parcel_img_url": "parcelsImage/f2uKNTOPPlQrIQRtq6hx.png", "parcel_description": "34 x 32 x 25 cm max", "parcel_type": "Box - Medium", "parcel_max_weight": 7 }, { "parcel_min_weight": 1.5, "parcel_description": "SamplE 2", "parcel_max_weight": 2.5, "parcel_type": "Example", "vehicle_type": { "bicycling": true, "walking": true, "driving": true }, "parcel_img_url": "parcelsImage/AEK5G5Y5QyxWw37IvJXd.png" }]


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
            error: {
                name: error?.name || "unknown",
                message: error?.message || "Something went wrong!",
                ...error
            }
        }, { status: 500 })
    }
}


export const revalidate = 30