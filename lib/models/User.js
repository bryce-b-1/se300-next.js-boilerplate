import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/db-models/UserModel';
import Group from './Group';
import mongoose from 'mongoose';


//This is an interface class for Members and Leaders
class User 
{
    //Private attributes
    #userID;
    #email;
    #passwordHash;

    constructor(userID, email, passwordHash) 
    {
        this.#userID = userID;
        this.#email = email;
        this.#passwordHash = passwordHash;
    }

    //GETTERS for private attributes
    get userID() 
    {
        return this.#userID;
    }

    get email() 
    {
        return this.#email;
    }


    /*
    *
    * PASSWORD HASH does not get a GETTER because of security
    *
    */


    //METHODS for Users
    static async login(email, password) {
        
        try 
        {
            console.log('LOGIN called with email:', email);

            await dbConnect();
            console.log('DB connected');

            console.log("Connected DB name:", mongoose.connection.name);

            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log(
            "Collections in this DB:",
            collections.map((c) => c.name)
            );
                        
            const allUsers = await UserModel.find({});
            console.log('All users in DB:', allUsers);

            const dbUser = await UserModel.findOne({ email: email });
            console.log('dbUser from Mongo:', dbUser);

            if (!dbUser) 
            {
                console.log('User.js: Login failed: User not found. ');
                return false;
            }

            //Check the password (plain text check)
            if (password === dbUser.passwordHash) 
            {
                console.log(dbUser.email + ' has logged in successfully.');
                return true;
            } else 
            {
                console.log(dbUser.email + ' failed to log in: Invalid password.');
                return false;
            }
        } catch (error) {
            console.error('Error in User.login:', error);
            return false;
        }
  }

    logout() 
    {
        console.log(this.#email + ' has logged out.');
        //Logic for destroying the session/token
    }

    updateProfile(newData) 
    {
        console.log('Updating profile for ' + this.#email + '.');
        // Example of updating the private email field
        if (newData.email) 
        {
            this.#email = newData.email;
        }
    }

    createGroup(groupDetails) 
    {
        const newGroup = new Group(groupDetails.GroupID, groupDetails.GroupName, groupDetails.GroupDescription);
        console.log('User ' + this.#userID + ' is creating group: ' + newGroup.GroupName + '.');

        return newGroup;
    }

    deleteGroup(group)
    {
        console.log('User ' + this.#userID + ' is deleting group: ' + group.GroupName + '.');
        //MongoDB logic to delete a group
    }
}

export default User;