"use client"
import classes from './home.module.scss'
import { Box, Drawer } from "@mui/material"
import Autocomplete from "@/components/map/Autocomplete"
import Map from "@/components/map/map"
import { usePageHooks } from "./hooks"
import { useEffect } from 'react'


export default function Home() {
  const {
    center,
    zoom,
    onLoad,
    onUnmount,
    onDestinationChange,
    onOriginChange,
  } = usePageHooks()


  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Map
        jsApiLoaderProps={{
          id: 'google-map-script',
          googleMapsApiKey: "AIzaSyASGf3xaQKOEsMZaYET96y4yh0GI9oI4pk",
          libraries: ['maps', 'marker', 'places'],
        }}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        <Box className={classes['autocomplete']}>
          <img id="zero" />
        <Autocomplete
          label="Origin"
          onChosen={onOriginChange}
        />
        <Autocomplete
          label="Destination"
          onChosen={onDestinationChange}
        />
        </Box>
      </Map>
    </main>
  )
}
