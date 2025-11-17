// app/dashboard/events/page.tsx
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

type Event = {
  id: string;
  title: string;
  date: string;       // e.g. "March 30, 2025"
  time: string;       // e.g. "6:00 PM – 8:00 PM"
  host: string;       // person
  group: string;      // which group
  location?: string;
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Weekly Strategy Meeting',
    date: 'March 30, 2025',
    time: '6:00 PM – 7:00 PM',
    host: 'Alex Johnson',
    group: 'Leadership Team',
    location: 'Discord Voice Channel',
  },
  {
    id: '2',
    title: 'Cybersecurity Workshop',
    date: 'April 2, 2025',
    time: '3:30 PM – 5:00 PM',
    host: 'Sam Lee',
    group: 'Security Club',
    location: 'Room 205, Engineering Building',
  },
  {
    id: '3',
    title: 'Group Social Night',
    date: 'April 5, 2025',
    time: '7:00 PM – 9:30 PM',
    host: 'Taylor Smith',
    group: 'Developers Circle',
    location: 'Student Union Lounge',
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Events</h1>
        <p className="text-sm text-gray-600">
          Here are your upcoming events, who&apos;s hosting them, and which group
          they belong to.
        </p>
      </header>

      {/* Events grid */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockEvents.map((event) => (
          <article
            key={event.id}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Title */}
            <h2 className="text-lg font-medium text-gray-900">
              {event.title}
            </h2>

            {/* Date & time */}
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-500" />
                <span>{event.time}</span>
              </div>
            </div>

            {/* Host & group */}
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <span>
                  <span className="font-medium">Host:</span> {event.host}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-gray-500" />
                <span>
                  <span className="font-medium">Group:</span> {event.group}
                </span>
              </div>
            </div>

            {/* Location (optional) */}
            {event.location && (
              <p className="mt-3 text-xs text-gray-500">
                <span className="font-medium">Location: </span>
                {event.location}
              </p>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
