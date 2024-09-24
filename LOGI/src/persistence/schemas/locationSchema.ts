import mongoose from 'mongoose';
import {ILocationPersistence} from "../../dataschema/ILocationPersistence";

const LocationSchema = new mongoose.Schema(
  {
    locationId: { type: String, unique: true },
    name: { type: String, unique: false },
    latitude: { type: Number, unique: false },
    longitude: { type: Number, unique: false },
    altitude: { type: Number, unique: false },
    warehouseOrientation: { type: Number, unique: false },
    warehouseModelUrl: { type: String, unique: false },
    nodeRadius: { type: Number, unique: false },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ILocationPersistence & mongoose.Document>('Location', LocationSchema);
