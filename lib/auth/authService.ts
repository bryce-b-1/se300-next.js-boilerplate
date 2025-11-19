import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/db-models/UserModel";
import bcrypt from "bcryptjs";
import { ExistingUserError, InvalidCredentialsError } from "./erorrs";
import mongoose, { mongo } from "mongoose";


export async function authenticateUser(email: string, password: string) {

  await dbConnect();
  
  const dbUser = await UserModel.findOne({ email })
  //.lean() Can i please figure ts out


  if (!mongoose.connection.db) {
    throw new Error("Database not initialized");
  }



  if (!dbUser) {
    throw new InvalidCredentialsError();
  }

  const ok = await bcrypt.compare(password, dbUser.passwordHash);

  if (!ok) {
    throw new InvalidCredentialsError();
  }

  return dbUser;
}


export async function createUser(email: string, password: string, firstName: string) {

    console.log('Trying to connect to DB');

    await dbConnect();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        console.log('Registration failed: User already exists.');
        throw new ExistingUserError();
    }

    const userCount = await UserModel.countDocuments(); // TODO: this needs to grab user couont not documents

    console.log("Uhh count is " + userCount);

    const passwordHash = await bcrypt.hash(password, 10);
    
    console.log("passwordHash set as " + passwordHash);

    const newUser = new UserModel({
        userID: userCount + 1,
        email: email,
        passwordHash: passwordHash,
        firstName: firstName,
    });

    await newUser.save();

    console.log(email + ' registered successfully.');

    return { success: true };


}



async function printUtility(){ // expand this more later
  console.log('DB connected');
  console.log("Connected DB name:", mongoose.connection.name);

  if (!mongoose.connection.db) {
    throw new Error("Database not initialized");
  }
    
  const collections = await mongoose.connection.db.listCollections().toArray();
  
  console.log(
    "Collections in this DB:",
    collections.map((c: { name: any; }) => c.name)
  );

  

              
  const allUsers = await UserModel.find({});
  console.log('All users in DB:', allUsers);


}