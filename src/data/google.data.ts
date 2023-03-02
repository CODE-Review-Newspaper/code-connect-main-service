type DateTime = string; // "2023-02-06T16:18:30.000Z"
type Email = string;

export interface GetGoogleResourceSchedulesRequest {
  items: GoogleItemId[];
  timeMin: Date;
  timeMax: Date;
}

export interface GoogleTimeFrame {
  start: string | Date;
  end: string | Date;
}

export interface GoogleItemId {
  id: string;
}

export interface GoogleResourceScheduleResponse {
  kind: "calendar#freeBusy";
  timeMin: DateTime;
  timeMax: DateTime;
  // maps the email of a resource (aka room) to its schedule
  calendars: Record<Email, GoogleResourceSchedule>;
}

export interface GoogleResourceSchedule {
  busy: GoogleStringTimeFrame[];
}

export interface GoogleStringTimeFrame {
  start: string;
  end: string;
}
