import { MediaType, TweetAudience, TweetType } from '@/enum/tweet'

export interface Tweet {
  _id: string
  user_id: string
  type: TweetType
  audience: TweetAudience
  conent: string
  parent_id: string
  hashtags: string[]
  mentions: string[]
  medias: Media[]
  guest_views: number
  user_views: number
  created_at: Date
  updated_at: Date
}

export interface Media {
  url: string
  type: MediaType
}

export interface Bookmark {
  _id: string
  user_id: string
  tweet_id: string
  created_at: Date
}

export interface Like {
  _id: string
  user_id: string
  tweet_id: string
  created_at: Date
}

export interface Hashtags {
  _id: string
  name: string
  created_at: Date
}
