import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const HARDCODED_URI = 'mongodb+srv://arksvgnss_db_user:u4tG9wlcLJ1vaOod@cluster0.irkqomo.mongodb.net/samsculinary?retryWrites=true&w=majority&appName=Cluster0';

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI || HARDCODED_URI);
  await client.connect();
  const db = client.db('samsculinary');

  const docs = await db.collection('onboarding').find({}).toArray();
  console.log('Found docs:', docs.length);

  for (const doc of docs) {
    let changed = false;
    let newIdProof = doc.idProofImageUrl;
    if (newIdProof && newIdProof.includes('cloudinary.com') && /\.pdf$/i.test(newIdProof)) {
      newIdProof = newIdProof.replace(/\.pdf$/i, '.png');
      changed = true;
    }
    if (changed) {
      console.log(`Updating ${doc.name}: ${doc.idProofImageUrl} -> ${newIdProof}`);
      await db.collection('onboarding').updateOne(
        { id: doc.id },
        { $set: { idProofImageUrl: newIdProof } }
      );
    }
  }

  const updatedDocs = await db.collection('onboarding').find({}).toArray();
  console.log('Final docs:', updatedDocs.map(d => ({ name: d.name, idProofImageUrl: d.idProofImageUrl })));

  await client.close();
}

run().catch(console.error);
