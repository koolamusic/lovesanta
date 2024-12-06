export type EventStatus = 'upcoming' | 'active' | 'ended';

export interface Event {
  id: string;
  year: number;
  name: string;
  isPast: boolean;
  status: EventStatus;
  date: string; // ISO date string
  participants: number;
  description?: string;
}
export const events: Event[] = [
  {
    id: '8m5h4p2n',
    year: 2024,
    name: "Secret Santa 2024",
    status: "upcoming",
    date: "2024-12-08T00:00:00.000Z",
    participants: 0,
    isPast: false,
    description: "Join us for this year's Secret Santa celebration!"
  },
  {
    id: 'xhcd9j2v',
    year: 2023,
    name: "Secret Santa 2023",
    status: "ended",
    date: "2023-12-02T00:00:00.000Z",
    participants: 12,
    isPast: true,
    description: "Our annual Secret Santa event bringing joy to everyone."
  },
  {
    id: 'tf5n8w3y',
    year: 2022,
    name: "Secret Santa 2022",
    status: "ended",
    date: "2022-12-01T00:00:00.000Z",
    participants: 8,
    isPast: true,
    description: "A magical evening of gift-giving and festivities."
  }
];
