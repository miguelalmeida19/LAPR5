// @ts-ignore
import {kData} from "./default_data";
import * as THREE from "three";
import Circle from "./circle";
import {CylinderGeometry, Group, Mesh, MeshLambertMaterial} from "three";

export class NodePoint {
  get place(): string {
    return this._place;
  }

  set place(value: string) {
    this._place = value;
  }
  get ri(): number {
    return this._ri;
  }
  _ri: number;
  get location(): THREE.Vector3 {
    return this._location;
  }
  _location: THREE.Vector3;
  get circle(): Group {
    return this._circle;
  }
  K_CIRCLE = kData.K_CIRCLE;
  _circle: THREE.Group;
  _place!: string;

  constructor(latitude:number, longitude:number, altitude:number, wi:number, location: string) {

    this.place = location

    let coordinates = this.calculateCartesianCoordinates(latitude,longitude,altitude)

    const xi = coordinates[0]
    const yi = coordinates[1]
    const zi = coordinates[2]

    this._location = new THREE.Vector3(xi, yi, zi);

    this._ri = this.K_CIRCLE*wi/2.0;

    const circle = new Circle(this._location,this._ri, location)

    this._circle = new Group();
    this._circle.add(circle.object)

  }

  calculateCartesianCoordinates(latitude: number, longitude: number, altitude: number) : number[]{
    let xi = ((50-(-50))/(8.7613-8.2451))*(longitude-8.2451)+(-50)
    let yi = ((50-(-50))/(42.1115-40.8387))*(latitude-40.8387)+(-50)
    let zi = ((50-0)/(800-0))*(altitude-0)+(0)
    return [xi,yi,zi]
  }
}
