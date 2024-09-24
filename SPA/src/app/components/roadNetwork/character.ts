import * as THREE from "three";
import {Box3, Euler, Group, Object3D, Scene, Vector3} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import {kData} from "./default_data";

export class Character {
  get wheels(): Group {
    return this._wheels;
  }

  set wheels(value: Group) {
    this._wheels = value;
  }
  private _wheels!: Group;
  set orientation(value: Euler) {
    this._orientation = value;
  }
  set location(value: Vector3) {
    this._location = value;
  }
  set horizontal_velocity(value: number) {
    this._horizontal_velocity = value;
  }

  get height(): number {
    return this._height;
  }
  get location(): Vector3 {
    return this._location;
  }
  get orientation(): Euler {
    return this._orientation;
  }
  get horizontal_velocity(): number {
    return this._horizontal_velocity;
  }
  get object(): Object3D {
    return this._object;
  }

  private _height!: number;
  private _location!: THREE.Vector3;
  private _orientation!: Euler;
  private _horizontal_velocity: number = 0;
  private _object:Group = new Group();

  constructor(location: Vector3, modelPath: string) {
    this._location = location;
    const url2 = '../../../assets/models/' + modelPath;
    const url3 = '../../../assets/models/trucks/front-wheels.glb';
    const gltfLoader = new GLTFLoader();


    // Set the initial position and rotation
    this._location = new THREE.Vector3(location.x + 1, location.y - 2.7, location.z + kData.K_HEIGHT*3);
    this._orientation = new THREE.Euler(Math.PI/2, 0, 0, 'XYZ');

    // Truck

    gltfLoader.load(url2, gltf => {
      const root = gltf.scene;
      gltf.scene.scale.multiplyScalar(1 / 2.5); // adjust scalar factor to match your scene scale

      let bbox = new THREE.Box3().setFromObject(root);
      let size = bbox.getSize(new THREE.Vector3());
      this._height = size.z

      root.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      root.setRotationFromEuler(this.orientation)
      this._object.add(root);

    });

    // Wheels

    gltfLoader.load(url3, gltf => {
      const root = gltf.scene;
      gltf.scene.scale.multiplyScalar(1 / 2.5); // adjust scalar factor to match your scene scale

      root.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      root.setRotationFromEuler(this.orientation)

      this._wheels = root

      this._object.add(root);

    });

  }

}
