import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://e-commerce:Dharmik%400137@cluster0.ry74mmc.mongodb.net/?appName=Cluster0';
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
  retryReads: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global;

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase() {
  try {
    const client = await clientPromise;
    return  client.db('Alpha-Lifestyle-A1');

  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Error details:', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
    });
    
    // If connection failed, try to reset and reconnect
    if (error?.message?.includes('SSL') || error?.message?.includes('TLS')) {
      console.error('SSL/TLS connection error detected. This might be a network or MongoDB Atlas configuration issue.');
      console.error('Please check:');
      console.error('1. Your IP address is whitelisted in MongoDB Atlas');
      console.error('2. The MongoDB cluster is running');
      console.error('3. Your network allows outbound connections to MongoDB Atlas');
    }
    
    throw new Error('Failed to connect to database: ' + (error?.message || 'Unknown error'));
  }
}

