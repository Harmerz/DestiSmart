import { useGetBridgingStatus } from '../onboarding'

export const useGetOtasFromBridge = () => {
  const bridge = useGetBridgingStatus()
  if (!bridge.data) return { ...bridge, data: undefined }

  const selectedOtas = bridge.data.selected_hotels.data.map((hotel) => hotel.ota)
  const uniqueOtasId = selectedOtas
    .map(({ _id }) => _id)
    .filter((value, index, current_value) => current_value.indexOf(value) === index)
  const uniqueOtas = uniqueOtasId.map((id) => selectedOtas.filter(({ _id }) => _id === id)[0])

  return {
    ...bridge,
    data: uniqueOtas,
  }
}

export const useGetOtas = () => {
  const data = useGetOtasFromBridge()
  return data
}

export const useGetHotels = () => {
  const bridge = useGetBridgingStatus()
  if (!bridge.data) return { ...bridge, data: undefined }

  return {
    ...bridge,
    data: bridge.data.selected_hotels.data,
  }
}

export const useGetHotel = () => {
  const hotels = useGetHotels()
  if (!hotels.data) return { ...hotels, data: undefined }

  return {
    ...hotels,
    data: hotels.data[0],
  }
}
