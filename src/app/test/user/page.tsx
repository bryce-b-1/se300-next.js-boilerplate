'use client';

import dbConnect from "@/src/lib/dbConnect";
import { getGroupById } from "@/src/lib/ts-models/Group";
import React, { useState } from "react";


export default function Groups(){
    const [userID, setUserID] = useState (1);
    const [firstName, setFirstName] = useState('Test Name');
    const [email, setEmail] = useState('Test Email');
    const [type, setType] = useState(0);
    const [result, setResult] = useState(null);
    
    
    const handleSubmit = async (e: React.FormEvent) => {
       console.log("run???");
       e.preventDefault();

       console.log("Current type is" + type);

        const res = await fetch('/api/test/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, email, userID, type }),
        });

         const resultBrug = await res.json();
         setResult(resultBrug.result);
        
    }

    return (
    <div>


        <form onSubmit={() => {}}>
            <p> Target User ID : {userID}</p>
        <input
          value={userID}
          onChange={(e) => setUserID(Number(e.target.value))}
          placeholder="User ID"
        />  
        </form>

      <form onSubmit = {(e) => {setType(0); handleSubmit(e);}}>
        <p> Target User First Name: {firstName}</p>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter new first name"
        />
        <button
        type="submit"
        className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white font-medium 
                    hover:bg-blue-700 focus:outline-none focus:ring-2 
                    focus:ring-blue-400 focus:ring-offset-2 transition"
        >
        First Name Changer
        </button>     


        </form>
        
        <form onSubmit={(e) => {setType(1); handleSubmit(e)}}>
        <p> Target User Email: {email}</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter new email"
        />
        <button
        type="submit"
        className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white font-medium 
                    hover:bg-blue-700 focus:outline-none focus:ring-2 
                    focus:ring-blue-400 focus:ring-offset-2 transition"
        >
        Email Changer
        </button>     


        </form>

      {result && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">API Response:</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
    
  );
}