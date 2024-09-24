export default interface ITruckDTO {
  truckId: string;
  tare: number;
  capacity: number;
  batteryCharge: number;
  autonomy: number;
  rechargeBattery: number;
  active: boolean;
}
