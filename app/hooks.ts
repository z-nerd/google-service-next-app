import { useMap } from "@/components/map/hooks"
import { drawLine, latLngBounds, marker, placeIdToLatLng } from "@/components/map/utility"
import { useEffect, useRef, useState } from "react"


export const usePageHooks = () => {
    const {
        map,
        onLoad,
        onUnmount,
        center,
        setCenter,
        zoom,
    } = useMap({
        defaultCenter: {
            lat: 35.7219,
            lng: 51.3347,
        },
        defaultZoom: 16
    })

    const originMarkerRef = useRef<google.maps.Marker>()
    const destinationMarkerRef = useRef<google.maps.Marker>()
    const lineRef = useRef<google.maps.Polyline>()

    const [origin, setOrigin] = useState<google.maps.LatLngLiteral>()
    const [destination, setDestination] = useState<google.maps.LatLngLiteral>()


    useEffect(() => {
        if (origin && destination) {
            console.log(origin, destination);
            
            if (lineRef.current) lineRef.current.setMap(null)
            lineRef.current = drawLine(origin, destination)
            lineRef.current.setMap(map)

            map?.fitBounds(latLngBounds([origin, destination]))
        }
    }, [origin, destination])


    const onOriginChange = async (address: { id: string }) => {
        if (address) {
            const location = await placeIdToLatLng(address.id)

            if (location) {
                if (originMarkerRef.current) originMarkerRef.current.setMap(null)

                originMarkerRef.current = marker(location, "/origin.png")
                originMarkerRef.current.setMap(map)
                setOrigin(location)
                setCenter(location)
            }
        }
    }


    const onDestinationChange = async (address: { id: string }) => {
        if (address) {
            const location = await placeIdToLatLng(address.id)

            if (location) {
              if(destinationMarkerRef.current) destinationMarkerRef.current.setMap(null)
              destinationMarkerRef.current = marker(location, "/destination.png")
              destinationMarkerRef.current.setMap(map)

              setDestination(location)
            }
        }
    }


    return {
        map,
        onLoad,
        onUnmount,
        center,
        setCenter,
        zoom,
        onOriginChange,
        onDestinationChange,
    }
}

