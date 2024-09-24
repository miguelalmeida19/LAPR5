import IPlanDTO from "../../../../src/dto/IPlanDTO";
import {Plan} from "../../../../src/domain/plan/plan";

describe('Plan Unit Tests', () => {
  let number_of_generations: number = 2
  let population_dimension: number = 3
  let crossing_probability: number = 4
  let mutation_probability: number = 5
  let truck1: number[] = [1,2,3,4]
  let planDto: IPlanDTO = {
    number_of_generations: 2,
    population_dimension: 3,
    crossing_probability: 4,
    mutation_probability: 5,
    truck1: [1,2,3,4]
  }

  const resetNumberOfGenerations=()=>planDto.number_of_generations=number_of_generations;
  const resetPopulationDimension=()=>planDto.population_dimension=population_dimension;
  const resetCrossingProbability=()=>planDto.crossing_probability=crossing_probability;
  const resetMutationProbability=()=>planDto.mutation_probability=mutation_probability;
  const resetTruck1=()=>planDto.truck1=truck1;


  it('create valid plan', () => {
    const plan = Plan.create(planDto);
    expect(plan.isSuccess).toEqual(true);
    expect(plan.getValue().number_of_generations).toEqual(number_of_generations);
    expect(plan.getValue().population_dimension).toEqual(population_dimension);
    expect(plan.getValue().crossing_probability).toEqual(crossing_probability);
    expect(plan.getValue().mutation_probability).toEqual(mutation_probability);
    expect(plan.getValue().warehouses).toEqual(truck1);
  })


  it('should throw an error when number_of_generations is negative', () => {
    planDto.number_of_generations = -1;
    expect(() => Plan.create(planDto)).toThrowError("Number of generations cannot be under 0");
    resetNumberOfGenerations()
  });

  it('should throw an error when population_dimension is negative', () => {
    planDto.population_dimension = -1;
    expect(() => Plan.create(planDto)).toThrowError("Population dimension cannot be under 0");
    resetPopulationDimension()
  });

  it('should throw an error when crossing_probability is negative', () => {
    planDto.crossing_probability = -1;
    expect(() => Plan.create(planDto)).toThrowError("Crossing probability must be between 0 and 100 as it is a percentage.");
    resetCrossingProbability()
  });

  it('should throw an error when mutation_probability is negative', () => {
    planDto.mutation_probability = -1;
    expect(() => Plan.create(planDto)).toThrowError("Mutation probability must be between 0 and 100 as it is a percentage.");
    resetMutationProbability()
  });

  it('should throw an error when crossing_probability is greater than 100', () => {
    planDto.crossing_probability = 101;
    expect(() => Plan.create(planDto)).toThrowError("Crossing probability must be between 0 and 100 as it is a percentage.");
    resetCrossingProbability()
  });

  it('should throw an error when mutation_probability is greater than 100', () => {
    planDto.mutation_probability = 101;
    expect(() => Plan.create(planDto)).toThrowError("Mutation probability must be between 0 and 100 as it is a percentage.");
    resetMutationProbability()
  });

  it('should throw an error when truck1 is empty', () => {
    planDto.truck1 = [];
    expect(() => Plan.create(planDto)).toThrowError("Warehouses must not be empty.");
    resetTruck1()
  });


});
