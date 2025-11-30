// app/dashboard/groups/[groupID]/page.tsx

import dbConnect from "@/src/lib/dbConnect";
import GroupModel from "@/src/lib/db-models/GroupModel";
import EventModel from "@/src/lib/db-models/EventModel";
import PollModel from "@/src/lib/db-models/PollModel";
import AnnouncementModel from "@/src/lib/db-models/AnnouncementModel";

type GroupPageProps = {
  params: {
    groupID: string; // from the URL
  };
};

export default async function GroupPage({ params }: GroupPageProps) {
  await dbConnect();

  const groupID = Number(params.groupID);

  // Load group + related data in parallel
  const [group, events, announcements, polls] = await Promise.all([
    GroupModel.findOne({ groupID }).lean(),
    EventModel.find({ groupID }).sort({ startTime: 1 }).lean(),
    AnnouncementModel.find({ groupID }).sort({ createdAt: -1 }).lean(),
    PollModel.find({ groupID }).sort({ createdAt: -1 }).lean(),
  ]);

  if (!group) {
    return <div className="p-6">Group not found.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {/* Group name + description */}
      <h1 className="text-3xl font-bold">{group.groupName}</h1>
      {group.groupDescription && (
        <p className="text-gray-700">{group.groupDescription}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* LEFT: events, announcements, polls */}
        <div className="lg:col-span-2 space-y-4">
          {/* Events */}
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Events</h2>
            {(!events || events.length === 0) ? (
              <p className="text-gray-500 text-sm">No events yet.</p>
            ) : (
              <ul className="space-y-2">
                {events.map((event: any) => (
                  <li key={event._id.toString()} className="border-b pb-1">
                    <div className="font-medium">{event.title}</div>
                    {event.description && (
                      <div className="text-sm text-gray-700">
                        {event.description}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      {event.startTime &&
                        new Date(event.startTime).toLocaleString()}
                      {event.endTime && (
                        <> - {new Date(event.endTime).toLocaleString()}</>
                      )}
                      {event.location && ` · ${event.location}`}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Announcements */}
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Announcements</h2>
            {(!announcements || announcements.length === 0) ? (
              <p className="text-gray-500 text-sm">No announcements yet.</p>
            ) : (
              <ul className="space-y-3">
                {announcements.map((a: any) => (
                  <li key={a._id.toString()} className="border-b pb-2">
                    <div className="font-medium">{a.title}</div>
                    <div className="text-sm text-gray-700 mt-1">{a.body}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {a.createdAt &&
                        new Date(a.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Polls */}
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Polls</h2>
            {(!polls || polls.length === 0) ? (
              <p className="text-gray-500 text-sm">No polls yet.</p>
            ) : (
              <ul className="space-y-3">
                {polls.map((p: any) => (
                  <li key={p._id.toString()} className="border-b pb-2">
                    <div className="font-medium mb-1">{p.question}</div>
                    <ul className="ml-4 space-y-1 text-sm">
                      {p.options?.map((opt: any) => (
                        <li
                          key={opt.optionID}
                          className="flex justify-between"
                        >
                          <span>{opt.text}</span>
                          <span className="text-xs text-gray-500">
                            {opt.votes ?? 0} votes
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-gray-500 mt-1">
                      {p.createdAt &&
                        new Date(p.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* RIGHT: members */}
        <aside className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Members</h2>
          {!group.members || group.members.length === 0 ? (
            <p className="text-gray-500 text-sm">No members yet.</p>
          ) : (
            <ul className="space-y-1 max-h-96 overflow-y-auto">
              {group.members.map((m: any) => (
                <li
                  key={m._id?.toString() ?? m.userID}
                  className="flex justify-between text-sm border-b pb-1"
                >
                  <span>User {m.userID}</span>
                  <span className="text-xs uppercase text-gray-500">
                    {m.role}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
