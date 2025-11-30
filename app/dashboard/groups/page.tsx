

import dbConnect from "@/lib/dbConnect";
import {getIdFromIdentity } from "@/lib/ts-models/User";
import { getUsersGroups, GroupUI, toGroupsUI } from "@/lib/ts-models/Group";
import GroupCard from "@/app/ui/dashboard/groups/groupBox"; // your UI component

export default async function GroupsPage() {
  await dbConnect();

  const ID = await getIdFromIdentity();
//   console.log(ID)

  const groups = await getUsersGroups(ID ?? 1);  
//   console.log(groups)

  const uiGroups: GroupUI[] = toGroupsUI(groups);
  console.log(uiGroups)

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    {uiGroups.length === 0 ? (
      <p>No groups found.</p>
    ) : (
      uiGroups.map((group, index) => (
        <GroupCard
          key={group.name ?? index} 
          group={group}             
        />
      ))
    )}
  </div>
);
}
