import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    truckId: { type: String, unique: true },
    tare: { type: Number, unique: false },
    capacity: { type: Number, unique: false },
    batteryCharge: { type: Number, unique: false },
    autonomy: { type: Number, unique: false },
    rechargeBattery: { type: Number, unique: false },
    active: { type: Boolean, unique: false },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);
