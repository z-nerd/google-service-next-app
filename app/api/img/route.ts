import { NextResponse } from "next/server";
import { getFirbaseImageUrl } from "@/lib/firebase";


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
            error: {
                name: error?.name || "unknown",
                message: error?.message || "Something went wrong!",
                ...error
            }
        }, { status: 500 })
    }
}


export const revalidate = 30