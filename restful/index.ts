import { useQuery, useQueries } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { Parcel, PricingBody, PricingResult } from "./type";

const baseUrl = process.env.BASE_URL || '/api'
const baseUrlTimeout = Number(process.env.BASE_URL_TIMEOUT)


export const useGetParcels = () => useQuery({
  queryKey: ["useGetParcels"],
  queryFn: () => fetcher<Parcel[]>(baseUrl, "/parcels", { method: "GET" }),
})


export const useGetPricing = (body: PricingBody) => useQuery({
  enabled: false,
  queryKey: ["useGetPricing", body],
  queryFn: () => fetcher<PricingResult>(baseUrl, "/pricing", { 
    method: "POST",
    body: JSON.stringify(body)
   }),
})


export const useGetImages = (images: { parcel_img_url: string }[]) => useQueries({
  queries: images.map(item => {
    return {
      enabled: false,
      queryKey: ["useGetImages", item.parcel_img_url],
      queryFn: () => fetcher<any>(baseUrl, "/img", {
        method: "POST",
        body: JSON.stringify({ src: item.parcel_img_url })
      }),
    }
  })
})