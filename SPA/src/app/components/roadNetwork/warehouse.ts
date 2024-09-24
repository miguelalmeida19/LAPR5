import {Group, TextureLoader, Vector3} from "three";
import ConnectionElement from "./connectionElement";
import Arc from "./arc";
import * as THREE from "three";
// @ts-ignore
import {kData} from "./default_data";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default class WarehousePath {
  get angle(): number {
    return this._angle;
  }
  get warehousePath(): Group {
    return this._warehousePath;
  }

  private _warehousePath = new THREE.Group()
  private _angle = 0;


  constructor(orientation: number, nodeICenter: Vector3, nodeIRadius: number, warehouseModelUrl : string, active: boolean) {
    this._angle = orientation
    let fakePositon = new Vector3(1,1,1)
    const connectionElement = new ConnectionElement(nodeICenter, fakePositon, nodeIRadius, 1.5,"Warehouse","Roundabout")

    fakePositon = new Vector3(nodeICenter.x+2,nodeICenter.y+2,nodeICenter.z+2)
    const arc = new Arc(nodeICenter, fakePositon,this._angle,connectionElement.length,connectionElement.length,1.5, connectionElement,"Warehouse");
    arc.object.rotation.x = 0

    const geometry = new THREE.BoxGeometry( kData.K_WAREHOUSEDIMENSIONS, kData.K_WAREHOUSEDIMENSIONS, kData.K_HEIGHT );
    const texture = new TextureLoader().load( '../../../assets/textures/warehouseGround.jpg' );

    const material = new THREE.MeshLambertMaterial( {map: texture} );
    const cube = new THREE.Mesh( geometry, material );
    cube.receiveShadow = true;

    geometry.translate( 0, (kData.K_WAREHOUSEDIMENSIONS/2), 0);
    cube.position.y = connectionElement.length + arc.sij

    this._warehousePath.add(connectionElement.object);
    this._warehousePath.add(arc.object);
    this._warehousePath.add(cube);

    function random(min: number,max:number) {
      return Math.floor((Math.random())*(max-min+1))+min;
    }

    const gltfLoader = new GLTFLoader();
    //console.log(location)
    const number = random(0,2)
    gltfLoader.load(warehouseModelUrl, (gltf) => {
      gltf.scene.scale.multiplyScalar(1 / 2300); // adjust scalar factor to match your scene scale

      const root = gltf.scene;
      root.position.set(cube.position.x,cube.position.y,cube.position.z)
      root.translateY(kData.K_WAREHOUSEDIMENSIONS/2)
      root.rotation.x = Math.PI/2
      root.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      this._warehousePath.add(root);
    });

    if (!active){
      gltfLoader.load("../../../assets/models/warehouses/warehouse_deactivated.glb", (gltf) => {
        gltf.scene.scale.multiplyScalar(1 / 1800); // adjust scalar factor to match your scene scale

        const root = gltf.scene;
        root.position.set(cube.position.x,cube.position.y,cube.position.z)
        root.translateY(-kData.K_WAREHOUSEDIMENSIONS/2+1)
        root.rotation.x = Math.PI/2
        root.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });

        this._warehousePath.add(root);
      });
    }
  }


  getPerfectAngle(aijAngles: number[]) {

    // sort array
    aijAngles.sort()

    // find the least difference between angles
    let biggestDifference = -10;
    let angle = 0;
    for (let i=aijAngles.length-1;i>0;i--){
      if (Math.abs(aijAngles[i])-Math.abs(aijAngles[i-1])>biggestDifference){
        biggestDifference = Math.abs(aijAngles[i])-Math.abs(aijAngles[i-1])
        // get the angle between the least difference
        angle = Math.abs(aijAngles[i-1]) + (biggestDifference/2)
      }
    }

    // check if the biggest difference is bigger than the rest of the arc
    if (Math.abs((2*Math.PI) - (Math.abs(aijAngles[aijAngles.length-1]) - Math.abs(aijAngles[0])))>biggestDifference) {
      biggestDifference = Math.abs((2*Math.PI) - (Math.abs(aijAngles[aijAngles.length-1]) - Math.abs(aijAngles[0])))
      angle = aijAngles[aijAngles.length-1] + biggestDifference/2
    }

    return angle;
  }

}
