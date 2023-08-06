export const placeIdToLatLng = async (placeId: string) => {
    const { results } = await (new google.maps.Geocoder().geocode({ placeId }))

    if (results[0]) return results[0].geometry.location.toJSON()
}


export const drawLine = (
    start: google.maps.LatLng | google.maps.LatLngLiteral,
    end: google.maps.LatLng | google.maps.LatLngLiteral,
    strokeColor?: '#00f',
    option: Omit<google.maps.PolylineOptions, 'path'> = {
        strokeOpacity: 0,
        icons: [
            {
                icon: {
                    path: "M 0,-1 0,1",
                    strokeOpacity: 1,
                    scale: 4,
                },
                offset: "0",
                repeat: "20px",
            },
        ]
    }) => {
    return new google.maps.Polyline({
        path: [start, end],
        strokeColor,
        ...option
    })
}


export const marker = (
    point: google.maps.LatLng | google.maps.LatLngLiteral, 
    icon: string|google.maps.Icon|null|google.maps.Symbol,
    option: Omit<google.maps.MarkerOptions, 'position'> = {
    }) => {
    return new google.maps.Marker({
        position: point,
        icon,
        ...option
      })
}


export const latLngBounds = (points: google.maps.LatLng[] | google.maps.LatLngLiteral[]) => {
    const bounds = new google.maps.LatLngBounds()

    points.forEach(point => {
        bounds.extend(point)
    })

    return bounds
}

