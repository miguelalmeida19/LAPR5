import { IPathPersistence } from '../../dataschema/IPathPersistence';
import mongoose from 'mongoose';

const pathSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    departureWarehouse: { type: String, unique: false },
    arrivalWarehouse: { type: String, unique: false },
    distance: { type: Number, unique: false },
    duration: { type: Number, unique: false },
    consumedEnergy: { type: Number, unique: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', pathSchema);
