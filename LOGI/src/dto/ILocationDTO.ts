export default interface ILocationDTO {
  locationId: string;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  warehouseOrientation: number;
  warehouseModelUrl: string;
  nodeRadius: number;
}
