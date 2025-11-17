"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import {enUS} from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

export default function MyCalendar() {
  interface CalendarEvent {
    title: string;
    start: Date | null;
    end: Date | null;
  }

  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({
    title: "",
    start: null,
    end: null,
  });

  function handleSelectSlot(slotInfo: any) {
    setNewEvent({
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setShowModal(true);
  }

  function saveEvent() {
    if (!newEvent.title.trim() || !newEvent.start || !newEvent.end) return;

    setAllEvents([
      ...allEvents,
      {
        ...newEvent,
        title: `${format(newEvent.start, "HH:mm")} - ${format(
          newEvent.end,
          "HH:mm"
        )} ${newEvent.title}`,
      },
    ]);
    setShowModal(false);
  }

  function handleSelectEvent(event: any) {
    const ok = confirm(`Delete event "${event.title}"?`);
    if (!ok) return;
    setAllEvents(allEvents.filter((e) => e !== event));
  }

  return (
    <>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
            }}
          >
            <h3>Add Event</h3>
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                margin: "10px 0",
              }}
            />
            <label>
              Start:
              <input
                type="datetime-local"
                value={
                  newEvent.start
                    ? format(newEvent.start, "yyyy-MM-dd'T'HH:mm")
                    : ""
                }
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    start: new Date(e.target.value),
                  })
                }
                style={{ width: "100%", margin: "5px 0" }}
              />
            </label>
            <label>
              End:
              <input
                type="datetime-local"
                value={
                  newEvent.end
                    ? format(newEvent.end, "yyyy-MM-dd'T'HH:mm")
                    : ""
                }
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    end: new Date(e.target.value),
                  })
                }
                style={{ width: "100%", margin: "5px 0" }}
              />
            </label>
            <button onClick={saveEvent} style={{ marginRight: 10 }}>
              Save
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <Calendar
        selectable
        localizer={localizer}
        events={allEvents}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        style={{ height: 500 }}
      />
    </>
  );
}
