import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import truck from './routes/truckRoute';
import path from './routes/pathRoute';
import connection from './routes/connectionRoute';
import plan from './routes/planRoute';
import location from './routes/locationRoute';
import shipment from './routes/shipmentRoute';
import _package from './routes/packageRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	truck(app);
	path(app);
	connection(app);
	location(app);
	plan(app);
  shipment(app);
  _package(app);

	return app
}
