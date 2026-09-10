import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dns from 'dns';

// Optimize DNS lookup order for MongoDB Atlas SRV resolution
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore in environments where not available
}

let cachedClient = null;
let cachedDb = null;

const HARDCODED_URI = 'mongodb+srv://arksvgnss_db_user:u4tG9wlcLJ1vaOod@cluster0.irkqomo.mongodb.net/samsculinary?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
  dotenv.config({ override: true });

  let MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI || !MONGODB_URI.includes('irkqomo')) {
    MONGODB_URI = HARDCODED_URI;
  }
  const MONGODB_DB = process.env.MONGODB_DB || 'samsculinary';

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });

    await client.connect();
    const db = client.db(MONGODB_DB);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (err) {
    cachedClient = null;
    cachedDb = null;
    console.error('Direct MongoDB Atlas Connection Error:', err);
    throw err;
  }
}

// Read database records directly from real MongoDB Atlas
export async function readDb() {
  const { db } = await connectToDatabase();
  const webinarsColl = db.collection('webinars');
  const registrationsColl = db.collection('registrations');
  const onboardingColl = db.collection('onboarding');

  const webinars = await webinarsColl.find({}).toArray();
  const registrations = await registrationsColl.find({}).toArray();
  const onboarding = await onboardingColl.find({}).toArray();

  // Strip internal MongoDB _id field for clean JSON serialization
  const cleanedWebinars = webinars.map(({ _id, ...rest }) => rest);
  const cleanedRegistrations = registrations.map(({ _id, ...rest }) => rest);
  const cleanedOnboarding = onboarding.map(({ _id, ...rest }) => rest);

  return {
    webinars: cleanedWebinars,
    registrations: cleanedRegistrations,
    onboarding: cleanedOnboarding
  };
}

// Write database records directly to real MongoDB Atlas
export async function writeDb(data) {
  const webinars = data.webinars || [];
  const registrations = data.registrations || [];
  const onboarding = data.onboarding || [];

  const { db } = await connectToDatabase();
  const webinarsColl = db.collection('webinars');
  const registrationsColl = db.collection('registrations');
  const onboardingColl = db.collection('onboarding');

  // Replace webinars collection records in real MongoDB
  await webinarsColl.deleteMany({});
  if (webinars.length > 0) {
    await webinarsColl.insertMany(webinars.map((w) => ({ ...w })));
  }

  // Replace registrations collection records in real MongoDB
  await registrationsColl.deleteMany({});
  if (registrations.length > 0) {
    await registrationsColl.insertMany(registrations.map((r) => ({ ...r })));
  }

  // Replace onboarding collection records in real MongoDB
  await onboardingColl.deleteMany({});
  if (onboarding.length > 0) {
    await onboardingColl.insertMany(onboarding.map((o) => ({ ...o })));
  }
}
