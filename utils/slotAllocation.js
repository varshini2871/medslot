const SLOT_DURATION = 30;

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function allocateSlot(appointments, date, fromTime, untilTime) {
  const start = timeToMinutes(fromTime);
  const end = timeToMinutes(untilTime);

  if (start >= end) {
    return null;
  }

  const bookedTimes = appointments
    .filter(
      (appointment) =>
        appointment.date === date &&
        appointment.status !== "Cancelled"
    )
    .map((appointment) => appointment.time);

  for (
    let current = start;
    current + SLOT_DURATION <= end;
    current += SLOT_DURATION
  ) {
    const slot = minutesToTime(current);

    if (!bookedTimes.includes(slot)) {
      return slot;
    }
  }

  return null;
}