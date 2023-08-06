import { useCallback, useState } from "react"


interface useMapProps {
    defaultCenter: {
        lat: number,
        lng: number,
    }
    defaultZoom: number,
}


export const useMap = ({ defaultCenter, defaultZoom }: useMapProps) => {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [center, setCenter] = useState(defaultCenter)
    const [zoom, setZoom] = useState(defaultZoom)

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map)
    }, [])

    const onUnmount = useCallback((map: any) => {
        setMap(null)
    }, [])


    return {
        map,
        onLoad,
        onUnmount,
        center,
        setCenter,
        zoom,
        setZoom,
    }
}
