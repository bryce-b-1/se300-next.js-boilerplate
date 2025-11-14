import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/db-models/UserModel';
import Group from './Group';


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
            //Connect to the database
            await dbConnect();

            //Find the user
            const dbUser = await UserModel.findOne({ email: email });

            if (!dbUser) 
            {
                console.log('Login failed: User not found.');
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

    static async register(email, password) {
        try {
        // Connect to the database
        await dbConnect();

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log('Registration failed: User already exists.');
            return { success: false, error: 'User already exists' };
        }

        // Generate a userID (Increment based on previous count)
        const userCount = await UserModel.countDocuments();

        // Create new user document
        const newUser = new UserModel({
            userID: userCount + 1,
            email,
            passwordHash: password,
        });

        await newUser.save();

        console.log(email + ' registered successfully.');
        return { success: true };
        } catch (error) {
        console.error('Error in User.register:', error);
        return { success: false, error: 'Server error occurred' };
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