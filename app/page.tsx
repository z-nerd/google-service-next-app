"use client"
import classes from './home.module.scss'
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Autocomplete from "@/components/map/Autocomplete"
import Map from "@/components/map/map"
import { usePageHooks } from "./hooks"


export default function Home() {
  const {
    center,
    zoom,
    onLoad,
    onUnmount,
    onDestinationChange,
    onOriginChange,
    parcel,
    parcelsData,
    onParcelChange,
    getParcelsImage,
    pricingIsFetched,
    pricingIsFetching,
    pricingData,
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

          <FormControl variant="standard" fullWidth>
            <InputLabel id="parcel-type-label">Parcel Type</InputLabel>
            <Select
              labelId="parcel-type-label"
              id="parcel-type-select"
              label="Parcel Type"
              value={parcel !== -1 ? String(parcel) : ""}
              onChange={onParcelChange}>
              {
                parcelsData &&
                parcelsData.map((item, index) => {
                  return (
                    <MenuItem
                      className={classes['parcel']}
                      key={item.parcel_type}
                      value={index}>
                      <div className={classes['parcel-title']}>
                        {
                          (getParcelsImage(index)?.isFetched &&
                            getParcelsImage(index)?.data)
                            ?
                            <img
                              className={classes['parcel-title_img']}
                              src={getParcelsImage(index).data?.url as string || ""}
                              alt={item.parcel_description}
                            />
                            :
                            <CircularProgress className={classes['parcel-title_img']} />
                        }
                        <p>{item.parcel_type}</p>
                      </div>
                      <div className={classes['parcel-description']}>
                        <p>{item.parcel_min_weight} - {item.parcel_max_weight} kg max</p>
                        <p>{item.parcel_description}</p>
                      </div>
                    </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
          {
            !pricingIsFetching ?
              (pricingIsFetched && pricingData) &&
              <div className={classes['transport']}>
                <h2>Transport Options</h2>

                <div className={classes['transport-cards']}>
                  <div className={
                    `${classes['transport-card']} ${pricingData?.riding && classes['transport-card--active']}`
                  }>
                    <img src="/riding.png" alt="" />
                    {
                      pricingData?.riding && <>
                        <p>$ {pricingData.riding.price}</p>
                        <p>{pricingData.riding.time}</p>
                      </>
                    }

                  </div>
                  <div className={
                    `${classes['transport-card']} ${pricingData?.cycling && classes['transport-card--active']}`
                  }>
                    <img src="/cycling.png" alt="" />
                    {
                      pricingData?.cycling && <>
                        <p>$ {pricingData.cycling.price}</p>
                        <p>{pricingData.cycling.time}</p>
                      </>
                    }
                  </div>
                  <div className={
                    `${classes['transport-card']} ${pricingData?.walking && classes['transport-card--active']}`
                  }>
                    <img src="/walking.png" alt="" />
                    {
                      pricingData?.walking && <>
                        <p>$ {pricingData.walking.price}</p>
                        <p>{pricingData.walking.time}</p>
                      </>
                    }
                  </div>
                </div>
              </div>
              :
              <div style={{ textAlign: 'center', marginBlockStart: '2rem' }}>
                <CircularProgress />
              </div>
          }
        </Box>
      </Map>
    </main>
  )
}