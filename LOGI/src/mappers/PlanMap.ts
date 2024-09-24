import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPlanPersistence } from '../dataschema/IPlanPersistence';

import IPlanDTO from "../dto/IPlanDTO";
import { Plan } from "../domain/plan/plan";

export class PlanMap extends Mapper<Plan> {

  public static toDTO( plan: Plan): IPlanDTO {
    return {
      number_of_generations: plan.number_of_generations,
      population_dimension: plan.population_dimension,
      crossing_probability: plan.crossing_probability,
      mutation_probability: plan.mutation_probability,
      truck1: plan.warehouses
    } as IPlanDTO;
  }

  public static toDomain (plan: any | Model<IPlanPersistence & Document> ): Plan {
    const planOrError = Plan.create(
      plan);

    planOrError.isFailure ? console.log(planOrError.error) : '';

    return planOrError.isSuccess ? planOrError.getValue() : null;
  }

  public static toPersistence (plan: Plan): any {
    return {
      number_of_generations: plan.number_of_generations,
      population_dimension: plan.population_dimension,
      crossing_probability: plan.crossing_probability,
      mutation_probability: plan.mutation_probability,
      warehouses: plan.warehouses
    }
  }
}
