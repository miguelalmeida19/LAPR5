import mongoose from 'mongoose';
import {IPlanPersistence} from "../../dataschema/IPlanPersistence";

const PlanSchema = new mongoose.Schema(
  {
    number_of_generations: { type: Number, unique: false },
    population_dimension:  { type: Number, unique: false },
    crossing_probability:  { type: Number, unique: false },
    mutation_probability:  { type: Number, unique: false },
    warehouses:  { type: Array, unique: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPlanPersistence & mongoose.Document>('Plan', PlanSchema);
