import mongoose from 'mongoose';

import {IPackagePersistence} from "../../dataschema/IPackagePersistence";

const PackageSchema = new mongoose.Schema(
  {
    packageId: { type: String, unique: true },
    xCoordinate: { type: Number, unique: false },
    yCoordinate: { type: Number, unique: false },
    zCoordinate: { type: Number, unique: false },
    shipmentId: { type: String, unique: false },
    deliveryId: { type: String, unique: true },
    pathId: { type: String, unique: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPackagePersistence & mongoose.Document>('Package', PackageSchema);
