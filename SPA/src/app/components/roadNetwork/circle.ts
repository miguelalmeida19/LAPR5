import * as THREE from "three";
import {CylinderGeometry, Group, Mesh, MeshLambertMaterial, MeshPhongMaterial, TextureLoader} from "three";
// @ts-ignore
import {kData} from "./default_data";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default class Circle {
  get circle(): Mesh<CylinderGeometry, MeshLambertMaterial> {
    return this._circle;
  }

  _circle: Mesh<CylinderGeometry, MeshLambertMaterial>;

  get object(): Group {
    return this._object;
  }

  set object(value: Group) {
    this._object = value;
  }

  private _object: Group;

  constructor(center: THREE.Vector3, radius: number, location: string) {

    // Create a box geometry
    const geometry = new THREE.CylinderGeometry(radius, radius, kData.K_HEIGHT, 64);

    const texture = new TextureLoader().load( '../../../assets/textures/roundabout.png' );
    texture.wrapS = THREE.RepeatWrapping;

    const material = new THREE.MeshPhongMaterial( {map: texture} );


    this._object = new Group()

    // Create a mesh with the specified geometry and material
    this._circle = new THREE.Mesh(geometry, material);

    this._circle.position.set(center.x, center.y, center.z);
    this._circle.rotateX(Math.PI/2)
    this._circle.receiveShadow = true;

    this._object.add(this._circle)

    const gltfLoader = new GLTFLoader();
    //console.log(location)
    const url = '../../../assets/models/locations/' + location + '.gltf';
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;
      root.position.set(center.x,center.y,center.z)
      root.translateX(-0.5)
      root.translateY(-0.4)
      root.rotation.x = Math.PI/2

      root.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      this._object.add(root);
    });


    const url1 = '../../../assets/models/tree.gltf';
    gltfLoader.load(url1, (gltf) => {
      const root = gltf.scene;
      root.position.set(center.x,center.y,center.z)
      root.translateX(-0.8)
      root.translateY(0.7)
      root.rotation.x = Math.PI/2

      root.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      this._object.add(root);
    });

  }
}
