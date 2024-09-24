export interface ITruckPersistence {
  truckId: string;
  tare: number;
  capacity: number;
  batteryCharge: number;
  autonomy: number;
  rechargeBattery: number;
  active: boolean;
}
