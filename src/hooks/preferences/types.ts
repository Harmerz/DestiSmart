export type Otas = {
  quota: number
  usage: number
  selected_otas: {
    _id: number
    ota: string
    url: string
    icon: string
  }[]
}

export type Hotel = any[]

export type TAddOta = {
  ota_id: number
}

// export type TAddHotel = {
//   'official-name': string
//   location: [number, number]
//   info: {
//     hotel_profile: string
//   }
// }

export type TAddHotel = {
  selected_hotels: SelectedHotels[]
}

export type SelectedHotels = {
  created_date: string
  crawled: string
  name: string
  type: string
  accomodation_type: string
  location: {
    address: string
    coordinate: {
      lat: string
      lon: string
    }
  }
  id: string
  source: string
}
