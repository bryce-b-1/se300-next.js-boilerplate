'use client';

import dbConnect from "@/src/lib/dbConnect";
import { getGroupById } from "@/src/lib/ts-models/Group";
import React, { useState } from "react";


export default function Groups(){
    const [groupId, setGroupId] = useState('');
    const [type, setType] = useState (1);
    const [result, setResult] = useState(null);
    

    
    const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
      
        const res = await fetch('/api/test/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, groupId }),
        });

         const resultBrug = await res.json();
         setResult(resultBrug.result);
         
        
        
    }

    return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          placeholder="Enter group ID"
        />
        <button
        type="submit"
        className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white font-medium 
                    hover:bg-blue-700 focus:outline-none focus:ring-2 
                    focus:ring-blue-400 focus:ring-offset-2 transition"
        >
        Lookup Group
        </button>     


        {/* <button
        type="submit"
        className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white font-medium 
                    hover:bg-blue-700 focus:outline-none focus:ring-2 
                    focus:ring-blue-400 focus:ring-offset-2 transition"
        >
        Lookup Groups
        </button> */}
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