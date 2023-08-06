import { GoogleMap, GoogleMapProps, Libraries, useJsApiLoader } from '@react-google-maps/api'


/* *****************************************************
*   This type didn't export from @react-google-maps/api 
*   lib so manually copy to here!
*   TODO: Report this issue to @react-google-maps/api
*  ****************************************************/
interface LoadScriptUrlOptions {
    googleMapsApiKey: string | "";
    googleMapsClientId?: string | undefined;
    version?: string | undefined;
    language?: string | undefined;
    region?: string | undefined;
    libraries?: Libraries | undefined;
    channel?: string | undefined;
    mapIds?: string[] | undefined;
    authReferrerPolicy?: 'origin' | undefined;
}


/* *****************************************************
*   This type didn't export from @react-google-maps/api 
*   lib so manually copy to here!
*   TODO: Report this issue to @react-google-maps/api
*  ****************************************************/
interface UseLoadScriptOptions extends LoadScriptUrlOptions {
    id?: string | undefined;
    nonce?: string | undefined;
    preventGoogleFontsLoading?: boolean | undefined;
}


export type MapProps = GoogleMapProps & {
    jsApiLoaderProps: UseLoadScriptOptions
    children: React.ReactNode
}


const Map = (props: MapProps) => {
    const {
        jsApiLoaderProps,
        children,
        ...mapProps
    } = props
    const { isLoaded } = useJsApiLoader(jsApiLoaderProps)


    return (
        <>
            {
                isLoaded &&
                <>
                    <GoogleMap
                        options={{
                            zoomControl: false,
                            fullscreenControl: false,
                            mapTypeControl: false,
                            streetViewControl: false,
                            minZoom: 3,
                        }}
                        mapContainerStyle={{
                            width: '100%',
                            height: '100%',
                        }}
                        {...mapProps}>
                    </GoogleMap>
                    {children}
                </>
            }
        </>
    )
}


export default Map