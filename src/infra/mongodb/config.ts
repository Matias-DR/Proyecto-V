export const URI = process.env.MONGODB_BACKEND_URI

export const DB_NAME = process.env.MONGODB_DB_NAME

export const COLLECTION_NAMES = {
  users: process.env.MONGODB_USERS_COLLECTION_NAME ?? '',
  sessions: process.env.MONGODB_SESSIONS_COLLECTION_NAME ?? '',
  posts: process.env.MONGODB_POSTS_COLLETION_NAME ?? '',
  buckets: process.env.MONGODB_BUCKETS_COLLETION_NAME ?? ''
}
