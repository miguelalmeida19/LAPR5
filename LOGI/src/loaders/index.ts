import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const connectionSchema = {
    // compare with the approach followed in repos and services
    name: 'connectionSchema',
    schema: '../persistence/schemas/connectionSchema',
  };

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const truckSchema = {
    // compare with the approach followed in repos and services
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const pathSchema = {
    // compare with the approach followed in repos and services
    name: 'pathSchema',
    schema: '../persistence/schemas/pathSchema',
  };

  const locationSchema = {
    // compare with the approach followed in repos and services
    name: 'locationSchema',
    schema: '../persistence/schemas/locationSchema',
  };

  const shipmentSchema = {
    // compare with the approach followed in repos and services
    name: 'shipmentSchema',
    schema: '../persistence/schemas/shipmentSchema',
  };

  const packageSchema = {
    // compare with the approach followed in repos and services
    name: 'packageSchema',
    schema: '../persistence/schemas/packageSchema',
  }

  const planSchema = {
    // compare with the approach followed in repos and services
    name: 'planSchema',
    schema: '../persistence/schemas/planSchema',
  }

  const planController = {
    name: config.controllers.plan.name,
    path: config.controllers.plan.path
  }

  const locationController = {
    name: config.controllers.location.name,
    path: config.controllers.location.path
  }

  const connectionController = {
    name: config.controllers.connection.name,
    path: config.controllers.connection.path
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  }

  const pathController = {
    name: config.controllers.path.name,
    path: config.controllers.path.path
  }

  const shipmentController = {
    name: config.controllers.shipment.name,
    path: config.controllers.shipment.path
  }

  const packageController = {
    name: config.controllers.package.name,
    path: config.controllers.package.path
  }

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }

  const planRepo = {
    name: config.repos.plan.name,
    path: config.repos.plan.path
  }

  const locationRepo = {
    name: config.repos.location.name,
    path: config.repos.location.path
  }

  const connectionRepo = {
    name: config.repos.connection.name,
    path: config.repos.connection.path
  }

  const shipmentRepo = {
    name: config.repos.shipment.name,
    path: config.repos.shipment.path
  }

  const packageRepo = {
    name: config.repos.package.name,
    path: config.repos.package.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }

  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const planService = {
    name: config.services.plan.name,
    path: config.services.plan.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  }

  const locationService = {
    name: config.services.location.name,
    path: config.services.location.path
  }

  const pathService = {
    name: config.services.path.name,
    path: config.services.path.path
  }

  const conectionService = {
    name: config.services.connection.name,
    path: config.services.connection.path
  }

  const shipmentService = {
    name: config.services.shipment.name,
    path: config.services.shipment.path
  }

  const packageService = {
    name: config.services.package.name,
    path: config.services.package.path
  }

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      truckSchema,
      pathSchema,
      connectionSchema,
      locationSchema,
      shipmentSchema,
      packageSchema,
      planSchema
    ],
    controllers: [
      planController,
      roleController,
      truckController,
      pathController,
      connectionController,
      locationController,
      shipmentController,
      packageController,
      userController
    ],
    repos: [
      planRepo,
      roleRepo,
      userRepo,
      truckRepo,
      pathRepo,
      connectionRepo,
      locationRepo,
      shipmentRepo,
      packageRepo
    ],
    services: [
      planService,
      roleService,
      truckService,
      pathService,
      conectionService,
      locationService,
      shipmentService,
      packageService,
      userService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
