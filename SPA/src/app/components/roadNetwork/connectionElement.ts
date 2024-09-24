// @ts-ignore
import {kData} from "./default_data.js";
import * as THREE from "three";
import {BoxGeometry, Group, Mesh, MeshLambertMaterial, TextureLoader, Vector3} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default class ConnectionElement{
  get nodeJCenter(): Vector3 {
    return this._nodeJCenter;
  }

  set nodeJCenter(value: Vector3) {
    this._nodeJCenter = value;
  }
  private _nodeJCenter: Vector3;
  get nodeiCenter(): Vector3 {
    return this._nodeiCenter;
  }

  set nodeiCenter(value: Vector3) {
    this._nodeiCenter = value;
  }
  private _nodeiCenter: Vector3;
  get origin(): string {
    return this._origin;
  }

  set origin(value: string) {
    this._origin = value;
  }
  private _origin: string;

  get destination(): string {
    return this._destination;
  }

  set destination(value: string) {
    this._destination = value;
  }

  private _destination!:string;

  set aij(value: number) {
    this._aij = value;
  }
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }
  _width: number;
  get length(): number {
    return this._length;
  }
  _length: number;
  get aij(): number {
    return this._aij;
  }
  private _aij: number;
  get object(): Group {
    return this._object;
  }
  _object: Group;
  constructor(nodeiCenter:THREE.Vector3,nodejCenter:THREE.Vector3,radius:number,wij:number,destination:string, origin: string) {

    this._nodeiCenter = nodeiCenter
    this._nodeJCenter = nodejCenter

    this._origin = origin
    this.destination = destination

    this._length = kData.K_CONNECTION * radius;
    this._width = wij
    //ATAN2(a;b) é igual a ATAN(b/a),
    // Mudar aqui
    this._aij = Math.atan2(nodejCenter.x-nodeiCenter.x,nodejCenter.y-nodeiCenter.y)

    const geometry = new THREE.BoxGeometry( this.width,this._length,  kData.K_HEIGHT );
    geometry.translate( 0, this._length/2, -kData.K_HEIGHT );

    const texture = new TextureLoader().load( '../../../assets/textures/road.jpg' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.set( 1, 1 );
    texture.repeat.set( 2, 1 );
    const material = new THREE.MeshLambertMaterial( {map: texture} );
    const connectionElement = new THREE.Mesh( geometry, material );
    connectionElement.receiveShadow = true;
    this._object = new Group();
    this._object.add(connectionElement)

    const gltfLoader = new GLTFLoader();
    const url = '../../../assets/models/roundabout_sign.gltf';
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;
      root.translateY(this._length)
      root.translateZ(-kData.K_HEIGHT)
      root.translateX((-this.width/2)+0.1)
      root.rotateX(Math.PI/2)
      root.rotateY(Math.PI)
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
