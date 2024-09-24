import mongoose from 'mongoose';

import {IShipmentPersistence} from "../../dataschema/IShipmentPersistence";

const ShipmentSchema = new mongoose.Schema(
  {
    shipmentId: { type: String, unique: true },
    truckId: { type: String, unique: false },
    toBeDeliveredDay: { type: Number, unique: false },
    toBeDeliveredMonth: { type: Number, unique: false },
    toBeDeliveredYear: { type: Number, unique: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IShipmentPersistence & mongoose.Document>('Shipment', ShipmentSchema);
