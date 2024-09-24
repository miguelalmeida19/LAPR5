import {Service, Inject} from 'typedi';

import IPlanRepo from "../services/IRepos/IPlanRepo";
import {Plan} from "../domain/plan/plan";

import {Document, FilterQuery, Model} from 'mongoose';
import {IPlanPersistence} from '../dataschema/IPlanPersistence';
import * as http from "http";
import IPlanDTO from "../dto/IPlanDTO";
import axios from "axios";
import {shuffle} from 'lodash';

@Service()
export default class PlanRepo implements IPlanRepo {
  private models: any;

  constructor(@Inject('planSchema') private planSchema: Model<IPlanPersistence & Document>,) {
  }

  public async findAll(): Promise<Plan[]> {
    const plans = await this.planSchema.find();
    return plans.map(plan => Plan.createExisted(plan).getValue());
  }

  public async exists(t: Plan): Promise<boolean> {
    return Promise.resolve(false);
  }

  public divideArrayRandomly(array: number[]): [number[], number[]] {
    // Shuffle the array
    const shuffled = shuffle(array)

    // Divide the shuffled array into two halves
    const middle = Math.floor(shuffled.length / 2);
    const firstHalf = shuffled.slice(0, middle);
    const secondHalf = shuffled.slice(middle);
    return [firstHalf, secondHalf];
  }

  public async getSimulatedTruckWarehouses(): Promise<number[]> {
    let array = [3, 4, 5];
    const randomTruckNumber = array[Math.floor(Math.random() * array.length)];

    let zones = [[1, 2, 3, 4], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17]]
    let result = []
    let currentZoneIndex = 0
    for (let i = 0; i < randomTruckNumber; i++) {
      // check if it can divide a zone
      if (randomTruckNumber - i > zones.length) {
        const randomZoneNumber = Math.floor(Math.random() * (zones.length));
        let currentZone = zones[randomZoneNumber]
        const [firstHalf, secondHalf] = this.divideArrayRandomly(currentZone)
        result.push(firstHalf)
        zones[randomZoneNumber] = secondHalf
      }
      // if it cannot divide no more zones, it should add it all
      else {
        currentZoneIndex = Math.floor(Math.random() * (zones.length - 1));
        let currentZone = zones[currentZoneIndex]
        zones.splice(currentZoneIndex, 1);
        result.push(currentZone)
      }
    }
    return result
  }

  public async getTruckWarehouses(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      http.get('http://vs614.dei.isep.ipp.pt/plan/trucks', (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const response = JSON.parse(data);
          const warehouses = response.trucks;
          resolve(warehouses);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  public async getTruckTime(planDTO: IPlanDTO): Promise<string> {
    try {
      const response = await axios.post('http://vs614.dei.isep.ipp.pt/plan/generate/sublist', planDTO, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  public async getSimulatedTruckTime(planDTO: IPlanDTO): Promise<{ H: number[]; Z: string }> {

    let zones = [[1, 2, 3, 4], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17]]
    let returnZ = "0"
    let returnH = []

    if (zones[0].includes(planDTO.truck1[0])) {
      returnH = shuffle(planDTO.truck1)
      returnZ = String(planDTO.truck1.length * this.getRandomFloat(112, 118))
    } else if (zones[1].includes(planDTO.truck1[0])) {
      returnH = shuffle(planDTO.truck1)
      returnZ = String(planDTO.truck1.length * this.getRandomFloat(101, 108))
    } else if (zones[2].includes(planDTO.truck1[0])) {
      returnH = shuffle(planDTO.truck1)
      returnZ = String(planDTO.truck1.length * this.getRandomFloat(92, 98))
    }

    let body = {
      "Z": returnZ,
      "H": returnH
    }
    return body
  }

  public async save(t: Plan): Promise<Plan> {
    return Promise.resolve(undefined);
  }
}
