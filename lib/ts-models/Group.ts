import dbConnect from "@/lib/dbConnect";
import GroupModel from "@/lib/db-models/GroupModel";
import { getSessionIdentity } from "@/lib/auth/getSessionIdentity";

export async function getGroupById(groupID: number) {
  await dbConnect();
  const group = await GroupModel.findOne({ groupID: groupID });
  return group || null;
}

export async function getUsersGroups(userID: number){
    await dbConnect();
    return await GroupModel.find({ "members.userID" : userID });
}


export async function getUserRoleInGroup(groupID: number, userID: number){
    const group = await getGroupById(groupID);

    const member = group.members.find((m: any) => m.userID === userID);

    return member?.role || null;
}

export async function getGroupName(groupID: number) {

  const group = await getGroupById(groupID);
  return group?.groupName || null;
}


export type GroupUI = {
  groupID: number;
  name: string;
  description: string;
};

export function toGroupUI(g: any): GroupUI {
  return {
    groupID: g.groupID,                        
    name: g.groupName ?? g.name ?? "",
    description: g.groupDescription ?? g.description ?? "",
  };
}

export function toGroupsUI(groups: any | null | undefined): GroupUI[] {
  if (!Array.isArray(groups)) return [];
  return groups.map(toGroupUI);
}


export async function getGroupDescription(groupID: number) {
  const group = await getGroupById(groupID);
  return group?.groupDescription || null;
}

export async function isUserInGroup(groupID: number, userID: number) {

   const group = await getGroupById(groupID);
   if (!group) return false;
   const member = group.members.find((m: any) => m.userID === userID);
   if (!member) return false;

  return true;
}

export async function isUserLeader(groupID: number, userID: number) {

  return await getUserRoleInGroup(groupID, userID) == "leader";

}

export async function createGroup(groupID : number, groupName : String, groupDescription : String){
    await dbConnect();

    const newGroup = new GroupModel({
        groupID: groupID,
        groupName: groupName,
        groupDescription: groupDescription
    })
}


export async function addMemberToGroup(groupID: number, userID: number, role: "leader" | "member" = "member") {
  const group = await getGroupById(groupID);
  if (!group) throw new Error("Group not found");

  const alreadyMember = group.members.some((m: any) => m.userID === userID);
  if (alreadyMember) {
    throw new Error("User is already a member of this group");
  }

  group.members.push({ userID, role });
  await group.save();

  return group;
}

