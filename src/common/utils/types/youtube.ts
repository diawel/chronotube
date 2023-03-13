export type ChannelAbstractType = {
  id: string
  name: string
}

export type ThumbnailsType = {
  default: ThumbnailType
  high: ThumbnailType
  medium: ThumbnailType
}

export type ThumbnailType = {
  url: string
}

export type VideoType = {
  header: string
  id: string
  title: string
  uploader: ChannelAbstractType
}
