export interface UserRoutes {
  admin: ["users"],
  logisticsManager: ["deliveryPlan","paths"],
  warehouseManager: ["warehouses,deliveries"],
  fleetManager: ["trucks"],
}
