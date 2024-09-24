import * as THREE from "three";
import {BoxGeometry, Group, Mesh, MeshLambertMaterial, Object3D, TextureLoader, Vector3} from "three";
// @ts-ignore
import {kData} from "./default_data";
import ConnectionElement from "./connectionElement";

export default class Arc {
  get arcName(): string {
    return this._arcName;
  }

  set arcName(value: string) {
    this._arcName = value;
  }
  get bij(): number {
    return this._bij;
  }

  set bij(value: number) {
    this._bij = value;
  }
  private _bij: number;
  get connectionElement(): ConnectionElement {
    return this._connectionElement;
  }

  set connectionElement(value: ConnectionElement) {
    this._connectionElement = value;
  }
  _connectionElement: ConnectionElement;
  get wij(): number {
    return this._wij;
  }

  set wij(value: number) {
    this._wij = value;
  }
  private _wij: number;
  get aij(): number {
    return this._aij;
  }

  set aij(value: number) {
    this._aij = value;
  }
  private _aij: number;
  get pij(): number {
    return this._pij;
  }

  set pij(value: number) {
    this._pij = value;
  }
  private _pij: number;
  get hij(): number {
    return this._hij;
  }
  _hij: number;
  get sij(): number {
    return this._sij;
  }

  get object(): Mesh<BoxGeometry, MeshLambertMaterial> {
    return this._object;
  }
  _object: Mesh<BoxGeometry, MeshLambertMaterial>;

  _sij : number;

  _arcName !: string;

  constructor(nodeiCenter:THREE.Vector3,nodejCenter:THREE.Vector3,aij:number,si:number,sj:number,wij:number, connectionElement: ConnectionElement, arcName: string) {

    this.arcName = arcName
    this._connectionElement = connectionElement
    this._aij = aij
    this._wij = wij
    const x = Math.pow(nodejCenter.x-nodeiCenter.x,2);
    const y = Math.pow(nodejCenter.y-nodeiCenter.y,2);
    this._pij = Math.sqrt(x+y) - si - sj;
    this._hij = nodejCenter.z - nodeiCenter.z;
    this._sij = Math.sqrt(Math.pow(this.pij,2)+Math.pow(this.hij,2))
    this._bij = Math.atan(this.hij/this.pij);

    const geometry = new THREE.BoxGeometry( wij, this.sij, kData.K_HEIGHT );

    geometry.translate( 0, (this.sij/2), 0);

    const texture = new TextureLoader().load( '../../../assets/textures/road.jpg' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.set( 1, 1 );
    texture.repeat.set( 2, 1 );
    const material = new THREE.MeshLambertMaterial( {map: texture} );
    this._object = new THREE.Mesh( geometry, material );
    this._object.receiveShadow = true;

    this._object.rotation.x = this.bij
    this._object.position.z = -kData.K_HEIGHT
    this._object.position.y = si
  }
}
