export interface Parcel {
    parcel_description: string
    parcel_min_weight: number
    parcel_type: string
    vehicle_type: {
        bicycling: boolean
        walking: boolean
        driving: boolean
    }
    parcel_max_weight: number
    parcel_img_url: string
}


export interface PricingBody {
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


export interface PricingResult {
    status: string
    code: number
    walking?: {
        price: string,
        distance: number,
        time: string,
        duration: number,
        type: 'walking',
        length: string,
    },
    riding?: {
        price: string,
        distance: number,
        time: string,
        duration: number,
        type: ' riding',
        length: string,
    },
    cycling?: {
        price: string,
        distance: number,
        time: string,
        duration: number,
        type: ' cycling',
        length: string,
    },
}