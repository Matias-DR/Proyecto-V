import { MongoClient } from 'mongodb'

import { DB_NAME, URI } from './config'

const options = {}

const client = new MongoClient(URI as string, options)

export default async function db() {
  const connection = await client.connect()
  return connection.db(DB_NAME)
}

export async function dbClient() {
  const connection = await client.connect()
  return {
    client: connection,
    connection: connection.db(DB_NAME)
  }
}
