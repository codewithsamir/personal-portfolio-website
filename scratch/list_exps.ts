import mongoose from 'mongoose';
import dbConnect from '../lib/mongodb';
import Experience from '../models/Experience';

async function list() {
  await dbConnect();
  const exps = await Experience.find({});
  console.log(JSON.stringify(exps, null, 2));
  process.exit(0);
}

list();
