// 'use client';

// import dbConnect from "@/lib/dbConnect";
// import { getGroupById } from "@/lib/ts-models/Group";
// import React from "react";


// export default function Groups(){
//     const [groupId, setGroupId] = React.useState('');
    

    
//     const handleSubmit = async (e: React.FormEvent) => {
//        e.preventDefault();

//        try {
//         const res = await fetch('/api/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ groupId}),
//         });
        
//         const group = getGroupById(Number(groupId));
//        } catch (error) {
//         console.log("idk brah");
//        }
        
//     }

//     return (
//         <>
//         <p> nigga</p>
//         <form onSubmit={handleSubmit}>
//             <p> nigga</p>
//             <input
//                 type="text"
//                 id="groupId"
//                 placeholder="groupId"
//                 value={groupId}
//                 onChange={(e) => setGroupId(e.target.value)}
//                 required
//                 />
//             <button type="submit" className="@applys bg-[#0070f3] text-[white] rounded cursor-pointer no-underline text-base mt-2.5 p-3 border-[none]" >
//                  bruh 
//             </button>
//         </form>
//         </>
//     );
// }