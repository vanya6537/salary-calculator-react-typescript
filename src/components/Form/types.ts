// export interface Props {
// handleSubmit: () => void;
// reset: () => void;
// }
export enum PaymentType {
  MONTHLY = "MONTHLY",
  MROT = "MROT",
  DAILY = "DAILY",
  HOURLY = "HOURLY",
}

export enum Multiplier {
  MONTHLY = 1,
  MROT = 1,
  DAILY = 27,
  HOURLY = 27 * 8,
}
