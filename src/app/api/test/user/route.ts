import dbConnect from "@/src/lib/dbConnect";
import { getCurrentUser, setUserEmail, setUserFirstName } from "@/src/lib/ts-models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request){

    
    try {

        const { firstName, email, userID, type } = await request.json();
        await dbConnect();
        console.log("variables recieved");
        console.log("Recieved First Name: " + firstName)
        console.log("Recieved Email: " + email)
        console.log("Recieved UserID: " + userID)
        console.log("Recieved type: " + type)

        console.log( await getCurrentUser());

        let result = 'defaultResult';

        const numericType = Number(type);
            switch(numericType){
                case 0:
                    result = await setUserFirstName(userID, firstName);
                    console.log(result);
                    break;
                case 1:
                    result = await setUserEmail(userID ,email);
                    console.log(result);
                    break;

                default:
                    result = "invalid 'type'";
                    
            }

        return NextResponse.json({ message: 'User Edited Succesfully', result });
    } catch (error) {
        console.error("WHAT IS GOING ONNNN (ye theres an error in user route.ts)", error)
    }
    

    

}