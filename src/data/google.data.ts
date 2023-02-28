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