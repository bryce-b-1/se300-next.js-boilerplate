import Link from "next/link";

type Group = {
  groupID: number;
  name: string;
  description: string;
};

export default function GroupCard({ group }: { group: Group }) {
  return (
    <Link href={`/dashboard/groups/${group.groupID}`}>
      <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition cursor-pointer">
        <h2 className="text-xl font-semibold">{group.name}</h2>
        <p className="text-gray-700 mt-1">{group.description}</p>
      </div>
    </Link>
  );
}
