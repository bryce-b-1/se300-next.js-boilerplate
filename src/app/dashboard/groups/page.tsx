import dbConnect from "@/src/lib/dbConnect";
import {getIdFromIdentity } from "@/src/lib/ts-models/User";
import { getUsersGroups, GroupUI, toGroupsUI } from "@/src/lib/ts-models/Group";
import GroupCard from "@/src/ui/dashboard/groups/groupBox";

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
