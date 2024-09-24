import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:730906ee77280f5c461950cd@vsgate-s1.dei.isep.ipp.pt:10634/admin?authMechanism=DEFAULT",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    plan: {
      name: "PlanController",
      path: "../controllers/planController"
    },
    location: {
      name: "LocationController",
      path: "../controllers/locationController"
    },
    connection: {
      name: "ConnectionController",
      path: "../controllers/connectionController"
    },
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    truck: {
      name: "TruckController",
      path: "../controllers/truckController"
    },
    path: {
      name: "PathController",
      path: "../controllers/pathController"
    },
    warehouse: {
      name: "WarehouseController",
      path: "../controllers/warehouseController"
    },
    shipment: {
      name: "ShipmentController",
      path: "../controllers/shipmentController"
    },
    package: {
      name: "PackageController",
      path: "../controllers/packageController"
    },
    user: {
      name: "UserController",
      path: "../controllers/userController"
    }
  },

  repos: {
    plan: {
      name: "PlanRepo",
      path: "../repos/planRepo"
    },
    location: {
      name: "LocationRepo",
      path: "../repos/locationRepo"
    },
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    truck: {
      name: "TruckRepo",
      path: "../repos/truckRepo"
    },
    path: {
      name: "PathRepo",
      path: "../repos/pathRepo"
    },
    connection: {
      name: "ConnectionRepo",
      path: "../repos/connectionRepo"
    },
    warehouse: {
      name: "WarehouseRepository",
      path: "../repo/warehouseRepo"
    },
    shipment: {
      name: "ShipmentRepo",
      path: "../repos/shipmentRepo"
    },
    package: {
      name: "PackageRepo",
      path: "../repos/packageRepo"
    },
  },

  services: {
    plan: {
      name: "PlanService",
      path: "../services/planService"
    },
    location: {
      name: "LocationService",
      path: "../services/locationService"
    },
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    truck: {
      name: "TruckService",
      path: "../services/truckService"
    },
    path: {
      name: "PathService",
      path: "../services/pathService"
    },
    warehouse: {
      name: "WarehouseService",
      path: "../services/warehouseService"
    },
    connection: {
      name: "ConnectionService",
      path: "../services/connectionService"
    },
    shipment: {
      name: "ShipmentService",
      path: "../services/shipmentService"
    },
    package: {
      name: "PackageService",
      path: "../services/packageService"
    },
    user: {
      name: "UserService",
      path: "../services/userService"
    }
  }
};
