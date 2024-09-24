import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {Result} from "../../core/logic/Result";
import {Document, Model} from "mongoose";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import IPlanDTO from "../../dto/IPlanDTO";
import {IPlanPersistence} from "../../dataschema/IPlanPersistence";

interface PlanProps {
  number_of_generations: number,
  population_dimension: number,
  crossing_probability: number,
  mutation_probability: number,
  warehouses: number[]
}

export class Plan extends AggregateRoot<PlanProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get number_of_generations(): number {
    return this.props.number_of_generations;
  }

  get population_dimension(): number {
    return this.props.population_dimension;
  }

  get crossing_probability(): number {
    return this.props.crossing_probability;
  }

  get mutation_probability(): number {
    return this.props.mutation_probability;
  }

  get warehouses(): number[] {
    return this.props.warehouses;
  }

  set number_of_generations(value: number) {
    this.props.number_of_generations = value;
  }

  set population_dimension(value: number) {
    this.props.population_dimension = value;
  }

  set crossing_probability(value: number) {
    this.props.crossing_probability = value;
  }

  set mutation_probability(value: number) {
    this.props.mutation_probability = value;
  }

  set warehouses(value: number[]) {
    this.props.warehouses = value;
  }

  public static validate(number_of_generations: number, population_dimension: number, crossing_probability: number,
                         mutation_probability: number, warehouses: number[]): void {

    if (number_of_generations < 0) {
      throw new Error("Number of generations cannot be under 0");
    } else if (population_dimension < 0) {
      throw new Error("Population dimension cannot be under 0");
    } else if (!(crossing_probability >= 0 && crossing_probability <= 100)) {
      throw new Error("Crossing probability must be between 0 and 100 as it is a percentage.");
    } else if (!(mutation_probability >= 0 && mutation_probability <= 100)) {
      throw new Error("Mutation probability must be between 0 and 100 as it is a percentage.");
    } else if (warehouses.length == 0) {
      throw new Error("Warehouses must not be empty.");
    }
  }

  public static create(planDTO: IPlanDTO): Result<Plan> {

    const number_of_generations = planDTO.number_of_generations
    const population_dimension = planDTO.population_dimension
    const crossing_probability = planDTO.crossing_probability
    const mutation_probability = planDTO.mutation_probability
    const warehouses = planDTO.truck1


    this.validate(number_of_generations, population_dimension, crossing_probability, mutation_probability, warehouses);
    const plan = new Plan({
      number_of_generations: number_of_generations,
      population_dimension: population_dimension,
      crossing_probability: crossing_probability,
      mutation_probability: mutation_probability,
      warehouses: warehouses
    });
    return Result.ok<Plan>(plan)
  }

  public static createExisted(plan: any | Model<IPlanPersistence & Document>): Result<Plan> {
    this.validate(plan.number_of_generations, plan.population_dimension, plan.crossing_probability, plan.mutation_probability, plan.warehouses);

    plan = new Plan({
      number_of_generations: plan.number_of_generations,
      population_dimension: plan.population_dimension,
      crossing_probability: plan.crossing_probability,
      mutation_probability: plan.mutation_probability,
      warehouses: plan.warehouses
    });
    return Result.ok<Plan>(plan)
  }

}
