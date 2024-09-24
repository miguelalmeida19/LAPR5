import * as THREE from "three";
import {BoxGeometry, CubeTextureLoader, Group, Mesh, MeshLambertMaterial, Vector3} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {NodePoint} from "./node_point";
// @ts-ignore
import {kData, locationsData} from "./default_data.js";
import ConnectionElement from "./connectionElement";
import Arc from "./arc";
import WarehousePath from "./warehouse";
// @ts-ignore
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min';
import {Connection} from "../../domain/connection";
import {Location} from "../../domain/location";
import {Character} from "./character";
import {Warehouse} from "../../domain/warehouse";

export class RoadNetwork {
  get thirdCamera(): boolean {
    return this._thirdCamera;
  }

  set thirdCamera(value: boolean) {
    this._thirdCamera = value;
  }
  get currentOrigin(): string {
    return this._currentOrigin;
  }

  set currentOrigin(value: string) {
    this._currentOrigin = value;
  }

  private _currentOrigin!: string;

  get currentDestination(): string {
    return this._currentDestination;
  }

  set currentDestination(value: string) {
    this._currentDestination = value;
  }

  private _currentDestination !: string;

  currentCircleNumber!: number

  set currentCircle(value: string) {
    this._currentCircle = value;
  }

  private _currentCircle: string = "";

  get arcList(): Map<number, Arc[]> {
    return this._arcList;
  }

  get connectionElements(): Map<number, ConnectionElement[]> {
    return this._connectionElements;
  }

  private _arcList: Map<number, Arc[]> = new Map();

  private _connectionElements: Map<number, ConnectionElement[]> = new Map();

  private _aijAngles!: Map<number, number[]>;

  get currentLocationOfTruck(): string {
    return this._currentLocationOfTruck;
  }

  set currentLocationOfTruck(value: string) {
    this._currentLocationOfTruck = value;
  }

  _currentLocationOfTruck: string = "";

  truck!: Character;

  get arcs(): Mesh<BoxGeometry, MeshLambertMaterial>[] {
    return this._arcs;
  }

  // Create a scene
  private scene: THREE.Scene = new THREE.Scene();
  // Create a perspective camera
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(60.0, window.innerWidth / window.innerHeight, 0.2, 150.0);
  // Create a renderer
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias: true});
  // Create orbit controls
  private controls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
  private nodeList!: NodePoint[];
  nodes!: THREE.Group;
  private _arcs: Mesh<BoxGeometry, MeshLambertMaterial>[] = [];
  private connections: Connection[] = []
  private locations: Location[] = []
  private warehouses: Warehouse[] = []

  private dataLoaded: number = 0;
  private speed: number;
  private keyDown: any[];
  private keyPress: any[];
  private _thirdCamera: boolean = false;

  constructor() {
    this.speed = 0;
    this.keyDown = [];
    this.keyPress = [];
    for (let i = 0; i < 300; i++) {
      this.keyDown[i] = false;
      this.keyPress[i] = false;
    }

    document.onkeydown = (event) => {
      (this.keyDown)[event.keyCode] = true;
      (this.keyPress)[event.keyCode] = true;
    }

    document.onkeyup = (event) => {
      (this.keyDown)[event.keyCode] = false;
    }
  }

  windowResize(event: UIEvent) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  update() {

    const dampingFactor = 0.98; // adjust this value to control the strength of the damping effect

    this.controls.update()

    let translaction = 0.001
    let rotation = 0.008

    let t = 0
    let r = 0

    if ((this.keyDown)[38]) {
      t = -translaction
    }
    if ((this.keyDown)[40]) {
      t = translaction
    }
    if ((this.keyDown)[37]) {
      r = rotation
    }
    if ((this.keyDown)[39]) {
      r = -rotation
    }
    if ((this.keyPress)[69]) {
      (this.keyPress)[69] = false
      this.thirdCamera = !this.thirdCamera
    }


    if (this.truck != undefined) {
      // apply damping effect to truck velocity
      this.truck.horizontal_velocity *= dampingFactor;

      // check colisions
      this.checkCurrentTruckPosition(t, r)

      if (this.currentLocationOfTruck != "") {
        // update truck position based on velocity
        this.truck.horizontal_velocity += t;
        this.truck.object.rotateZ(r);

        this.truck.object.translateY(this.truck.horizontal_velocity);
        if (this.truck.object.children[0] != undefined) {
          this.truck.object.children[0].rotation.x += (this.truck.horizontal_velocity * -3);
        }
        // create a bounce back effect to not let the truck bypass the limits
      } else {
        this.truck.horizontal_velocity += translaction;
        this.truck.object.translateY(this.truck.horizontal_velocity);
        this.truck.horizontal_velocity = 0;
      }

    }

    if (this._thirdCamera){
      this.camera.position.x = this.truck.object.position.x + 4;
      this.camera.position.y = this.truck.object.position.y + 4;
      this.camera.position.z = this.truck.object.position.z + 5;

      this.camera.lookAt(this.truck.object.position);
    }

    // Update the camera's position and orientation to follow the truck
    /*
    this.camera.position.x = this.truck.object.position.x + 4;
    this.camera.position.y = this.truck.object.position.y + 4;
    this.camera.position.z = this.truck.object.position.z + 5;

    this.camera.lookAt(this.truck.object.position);
     */

    this.renderer.render(this.scene, this.camera);
  }

  predictPosition(translation: number, r: number): [number, number] {
    // predict next x and y coordinates based on current position and translation
    const x = this.truck.object.position.x + Math.cos(this.truck.object.rotation.z + r) * translation;
    const y = this.truck.object.position.y + Math.sin(this.truck.object.rotation.z + r) * translation;

    return [x, y];
  }

  checkCurrentTruckPosition(t: number, r: number) {

    // calculate next position
    // predict next x and y coordinates based on rotation and translation
    if (this.truck != undefined) {
      const [x, y] = this.predictPosition(t, r);

      this._currentLocationOfTruck = ""

      // we don't want 3 things:
      // if a truck is on a circle, it should not match with any other circle
      // also if the truck is on a circle, it should not try to go into a connection element or an arc of another node

      // if a truck is on a connection element, it should not match with any other connectionElement
      // also if a truck is on a connection element, it should not try to go to a circle of an arc of any other node

      // if a truck is on an arc, it should not match with any other arc
      // also if a truck is on an arc, it should try to go into a connection element or circle of another node

      this.isInCircle(x, y)
      this.isInConnectionElement(x, y)
      this.isInArc(x, y)
    }
  }

  isInCircle(x: number, y: number): void {
    // Create a Vector3 object with the given x and y coordinates
    const point = new THREE.Vector3(x, y, 0);

    // Loop through the nodeList
    for (const node of this.nodeList) {
      // Calculate the distance between the point and the center of the circle
      let vector3 = new Vector3()
      vector3.set(node.location.x, node.location.y, 0)
      const distance = point.distanceTo(vector3);
      // Check whether the distance is less than the radius of the circle
      if (distance <= node.ri && distance > 0) {
        if (this.currentCircleNumber == undefined || this.currentOrigin===node.place) {
          this.currentCircle = node.place
          this.currentCircleNumber = this.locations.findIndex((location) => location.name == node.place)
          this.currentOrigin = node.place

          // If the point is inside the circle, set the truck's z position to the circle's z position
          this.truck.object.position.z = node.location.z + kData.K_HEIGHT * 3;
          this._currentLocationOfTruck = node.place
          // Stop looping through the nodeList
          break;
        }
      }
    }
  }

  belongsArc(xi: number, yi: number, x0: number, y0: number, angle: number, x1: number, y1: number, W: number, L: number,arc: Arc): boolean {
    const a = y1 - y0;
    const b = x0 - x1;
    const c = x1 * y0 - x0 * y1;

    const d = Math.abs((a * xi + b * yi + c) / Math.sqrt(a ** 2 + b ** 2));

    const xp = xi;
    const yp = yi;

    const xpp = Math.abs((xp - x0) * Math.cos(angle) + (yp - y0) * Math.sin(angle));
    const ypp = (yp - y0) * Math.cos(angle) + (xp - x0) * Math.sin(angle);

    //console.log(this.truck.object.position.z)

    return L <= xpp && xpp <= L+arc.pij && W / 2 >= d && d >= -W / 2;
  }

  belongsRectangle(xi: number, yi: number, x0: number, y0: number, angle: number, x1: number, y1: number, W: number, L: number): boolean {
    const a = y1 - y0;
    const b = x0 - x1;
    const c = x1 * y0 - x0 * y1;

    const d = Math.abs((a * xi + b * yi + c) / Math.sqrt(a ** 2 + b ** 2));

    const xp = xi;
    const yp = yi;

    const xpp = ((xp - x0) * Math.cos(angle) + (yp - y0) * Math.sin(angle));
    const ypp = (yp - y0) * Math.cos(angle) + (xp - x0) * Math.sin(angle);

    return 0 <= xpp && xpp <= L && W / 2 >= d && d >= -W / 2;
  }

  isInConnectionElement(x: number, y: number): void {
    // Create a Vector3 object with the given x and y coordinates
    const xiyi = new THREE.Vector3(x, y, 0);

    let index = this.locations.findIndex((location) => location.name == this.currentOrigin)

    // Current Node
    const node = this.nodeList[index];

    // Calculate the distance between the point and the center of the circle
    let x0y0 = new Vector3();
    x0y0.set(node.location.x, node.location.y, 0);

    for (const connectionElement of this.connectionElements.get(index)!) {
      const L = connectionElement.length
      const W = connectionElement.width
      const angle = Math.PI / 2 - connectionElement.aij

      const x1: number = x0y0.x + L * Math.cos(angle);
      const y1: number = x0y0.y + L * Math.sin(angle);

      if (this.belongsRectangle(xiyi.x, xiyi.y, x0y0.x, x0y0.y, angle, x1, y1, W, L)) {
        this.currentLocationOfTruck = "Connection Element que vai para " + connectionElement.destination
        this.currentDestination = connectionElement.destination
        this.currentOrigin = connectionElement.origin

        this.truck.object.children[0].rotation.x = Math.PI / 2
        this.truck.object.children[1].rotation.x = Math.PI / 2
      }

    }


  }

  isInArc(x: number, y: number): void {
    // Create a Vector3 object with the given x and y coordinates
    const xiyi = new THREE.Vector3(x, y, 0);

    // Current Node
    const node = this.nodeList[this.currentCircleNumber];

    // Calculate the distance between the point and the center of the circle
    let x0y0 = new Vector3();
    x0y0.set(node.location.x, node.location.y, 0);

    for (const arc of this.arcList.get(this.currentCircleNumber)!) {
      const L = arc.connectionElement.length
      const L1 = arc.sij
      const W = arc.connectionElement.width // same as the connection element

      const angle = Math.PI / 2 - arc.connectionElement.aij

      const x1: number = x0y0.x + L * Math.cos(angle);
      const y1: number = x0y0.y + L * Math.sin(angle);

      if (this.belongsArc(xiyi.x, xiyi.y, x0y0.x, x0y0.y, angle, x1, y1, W, L,arc)) {
        this.currentLocationOfTruck = "Arc " + arc.arcName
        let xpp = (xiyi.x - x0y0.x) * Math.cos(angle) + (xiyi.y - x0y0.y) * Math.sin(angle);
        let bij = arc.bij

        let destinationNode

        if (xpp<0){
          xpp = -xpp
          bij = -bij
          destinationNode = arc.connectionElement.nodeiCenter
          this.currentOrigin = arc.connectionElement.origin
        }else {
          destinationNode = arc.connectionElement.nodeJCenter
          this.currentOrigin = arc.connectionElement.destination
        }


        const z = node.location.z + ((xpp - L) / (arc.pij) * (destinationNode.z-node.location.z) + kData.K_HEIGHT*3)
        this.truck.object.position.z = z

        this.truck.object.children[1].rotation.x = Math.PI / 2 - bij


        //this.currentDestination = connectionElement.destination
        //this._currentOrigin = connectionElement.origin
      }

    }
  }

  alreadyLoaded() {
    this.dataLoaded++
    if (this.dataLoaded == 3) {
      // Vector up to Positive Z Axis
      THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      document.getElementById("canva")?.appendChild(this.renderer.domElement);

      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.01
      this.controls.minDistance = 0;
      this.controls.maxDistance = 80;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.update();

      // Skybox
      this.scene.background = new CubeTextureLoader()
        .setPath("../../../assets/textures/ambient/")
        .load([
          "posx.jpg",
          "negx.jpg",
          "posz.jpg",
          "negz.jpg",
          "posy.jpg",
          "negy.jpg",
        ])


      // Set up lights
      const ambientLight = new THREE.AmbientLight(0x404040);
      this.scene.add(ambientLight);

      const shadowIntensity = 0.9;

      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.castShadow = true;
      dirLight.intensity = shadowIntensity;

      const lightPoint2 = dirLight.clone();
      lightPoint2.intensity = 1 - shadowIntensity;
      lightPoint2.castShadow = false;
      this.scene.add(lightPoint2);

      const mapSize = 1024; // Default 512
      const cameraNear = 0.5; // Default 0.5
      const cameraFar = 500; // Default 500
      dirLight.shadow.mapSize.width = mapSize;
      dirLight.shadow.mapSize.height = mapSize;
      dirLight.shadow.camera.near = cameraNear;
      dirLight.shadow.camera.far = cameraFar;


      dirLight.castShadow = true;
      dirLight.position.set(80, 40, 70);

      dirLight.shadow.camera.far = 1000;
      dirLight.shadow.camera.near = -500;

      dirLight.shadow.camera.left = -20;
      dirLight.shadow.camera.right = 20;
      dirLight.shadow.camera.top = 15;
      dirLight.shadow.camera.bottom = -15;
      dirLight.shadow.camera.zoom = 1;

      // Register the event handler to be called on window resize
      window.addEventListener("resize", event => this.windowResize(event));

      let ct = 0
      for (const location of this.locations) {
        this.connectionElements.set(ct, [])
        this.arcList.set(ct, [])
        ct++
      }


      this.nodeList = [];
      const locations = this.locations;
      const connections = this.connections;
      const warehouses = this.warehouses;
      this.nodes = new THREE.Group();
      for (let i = 0; i < locations.length; i++) {
        const node = new NodePoint(locations[i].latitude, locations[i].longitude, locations[i].altitude, locations[i].nodeRadius, locations[i].name)
        this.nodeList.push(node)
        this.nodes.add(new THREE.Group().add(node.circle))
      }

      this.scene.add(this.nodes)

      //this.controls.target = this.nodeList[3].location
      this.camera.position.set(this.nodeList[3].location.x, this.nodeList[3].location.y, this.nodeList[3].location.z + 1)

      this.truck = new Character(this.nodeList[3].location, "trucks/tesla_semi1.glb")
      this.truck.object.up = new Vector3(0, 0, 1)
      this.scene.add(this.truck.object)
      this.truck.object.position.set(this.truck.location.x, this.truck.location.y, this.truck.location.z)

      const targetObject = new THREE.Object3D();
      targetObject.position.set(-50, -82, -10);
      dirLight.target = targetObject;

      this.scene.add(dirLight);
      this.scene.add(dirLight.target);

      this._aijAngles = new Map<number, number[]>();

      for (let i = 0; i < locations.length; i++) {
        const connectionElements = this.nodes.children[i]; // grupo que já tem o node lá dentro
        const nodeICenter = this.nodeList[i].location;  // Three.vector3(x,y,z)
        const nodeIRadius = this.nodeList[i].ri; // raio

        //console.log(locations[i].name)

        for (let f = 0; f < connections.length; f++) {

          if (Number(locations[i].locationId) === connections[f].cityX) {
            const nodeJCenter = this.nodeList[connections[f].cityY - 1].location // Three.vector3(x,y,z)

            //console.log("Ligação com " + locations[connections[f].cityY - 1].name)

            const connectionElement = new ConnectionElement(nodeICenter, nodeJCenter, nodeIRadius, 1.5, locations[connections[f].cityY - 1].name, locations[connections[f].cityX - 1].name)
            const connectionElement1 = new ConnectionElement(nodeJCenter, nodeICenter, nodeIRadius, 1.5, locations[connections[f].cityX - 1].name, locations[connections[f].cityY - 1].name)
            //connectionElement1.aij = -connectionElement.aij

            connectionElements.add(connectionElement.object)

            this.connectionElements.get(connections[f].cityX - 1)?.push(connectionElement)

            this.connectionElements.get(connections[f].cityY - 1)?.push(connectionElement1)

            //this.connectionElements.get(Number(locations[i].locationId) - 1)?.push(connectionElement1)
            //console.log(this.connectionElements)

            let arcName = this.locations[connections[f].cityX - 1].name + " - " + this.locations[connections[f].cityY - 1].name
            const arc = new Arc(nodeICenter, nodeJCenter, connectionElement.aij, connectionElement.length, connectionElement.length, 1.5, connectionElement, arcName);
            this.arcs.push(arc._object);
            this.arcList.get(connections[f].cityX - 1)?.push(arc)
            this.arcList.get(connections[f].cityY - 1)?.push(arc)

            //console.log("Ligação entre " + Number(connections[f].cityX - 1) + " e " + Number(connections[f].cityY - 1))

            const road = new THREE.Group()
            road.add(connectionElement.object)

            road.add(arc.object)

            connectionElements.add(road)

            road.rotation.z = -connectionElement.aij
            road.position.set(nodeICenter.x, nodeICenter.y, nodeICenter.z)

            connectionElement1.object.position.set(nodeJCenter.x, nodeJCenter.y, nodeJCenter.z)
            connectionElement1.object.rotation.z = -connectionElement.aij + Math.PI

            connectionElements.add(connectionElement1.object)
          }
        }

        const warehousePath = new WarehousePath(locations[i].warehouseOrientation, nodeICenter, nodeIRadius, locations[i].warehouseModelUrl, warehouses[i].active)
        const wp = warehousePath.warehousePath
        wp.rotation.z = warehousePath.angle
        wp.position.set(nodeICenter.x, nodeICenter.y - kData.K_HEIGHT, nodeICenter.z)


        this.scene.add(wp)


      }
    }
  }

  connection(conn: Connection[]) {
    //console.log(conn)
    this.connections = conn
  }

  location(loca: Location[]) {
    //console.log(loca)
    this.locations = loca
  }

  warehouse(ware: Warehouse[]) {
    //console.log(loca)
    this.warehouses = ware
  }

}

