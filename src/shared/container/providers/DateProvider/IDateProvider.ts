export default interface IDateProvider {
  dateNow(): Date;
  isBefore(start_date: Date, end_date: Date): boolean;
  compareInDays(start_date: Date, end_date: Date): number;
}
