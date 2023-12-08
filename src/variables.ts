import { MongoClient, ServerApiVersion } from "mongodb";

const mongoURL: string = process.env.MONGODB_URL || "";

export const mongo_client = new MongoClient(mongoURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
