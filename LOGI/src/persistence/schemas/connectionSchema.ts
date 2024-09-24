import mongoose from 'mongoose';
import {IConnectionPersistence} from "../../dataschema/IConnectionPersistence";

const ConnectionSchema = new mongoose.Schema(
  {
    connectionId: { type: String, unique: true },
    cityX: { type: Number, unique: false },
    cityY: { type: Number, unique: false },
    width: { type: Number, unique: false },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IConnectionPersistence & mongoose.Document>('Connection', ConnectionSchema);
