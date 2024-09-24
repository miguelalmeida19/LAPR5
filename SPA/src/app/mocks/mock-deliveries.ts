import { Delivery } from "../domain/delivery";

export const DELIVERIES: Delivery[] = [
  {
    id: "D01",
    weight: 10.1,
    day: 13,
    month: 7,
    year: 2023,
    placingTime: 11.2,
    removingTime: 12.3,
    xSize: 10.4,
    ySize: 30.5,
    zSize: 20.6,
    warehouseId: "W01"
  },
  {
    id: "D02",
    weight: 11.1,
    day: 14,
    month: 8,
    year: 2024,
    placingTime: 12.2,
    removingTime: 13.3,
    xSize: 11.4,
    ySize: 31.5,
    zSize: 21.6,
    warehouseId: "W01"
  }
];
