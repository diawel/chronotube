export type ChannelType = {
  id: string
  name: string
  subscribeDate: Date
  thumbnail: ThumbnailsType
}

export type ThumbnailsType = {
  default: ThumbnailType
  high: ThumbnailType
  medium: ThumbnailType
}

export type ThumbnailType = {
  url: string
}
