import {Component, ElementRef, OnInit, Renderer2, ViewChild} from "@angular/core";
import {PathService} from "../../services/path.service";
import {PlanService} from "../../services/plan.service";
import {Path} from "../../domain/path";
import {Plan} from "../../domain/plan";
import {LocationService} from "../../services/location.service";
import {Location} from "../../domain/location";
import {FleetPlan} from "../../domain/fleet-plan";
import {PlanSubList} from "../../domain/planSubList";
import {PlanTimePaths} from "../../domain/plan-time-paths";
import {SimulatedPlanSubList} from "../../domain/simulatedPlanSubList";
import {considerSettingUpAutocompletion} from "@angular/cli/src/utilities/completion";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  isSimulated!: boolean

  number_of_trucks?: number
  canvasDrawn = false;
  selectedPath!: number[]
  currentPathPage: number = 0

  entity: string = "Plan"
  color: string = "info"
  currentPlan!: FleetPlan
  fleetPlan!: FleetPlan;
  simulatedFleetPlan!: FleetPlan;
  subLists: PlanSubList[] = [];
  simulatedSubLists: SimulatedPlanSubList[] = [];
  timesLists: PlanTimePaths[] = [];
  simulatedTimesLists: PlanTimePaths[] = [];
  locations: Location[] = [];
  maxZRecord!: number;
  longestPath!: string[];

  @ViewChild('myCanvas') canvasRef!: ElementRef;

  constructor(private planService: PlanService, private locationsService: LocationService,
              private elementRef: ElementRef, private renderer: Renderer2) {
  }

  getLocations(): void {
    this.locationsService.getLocations()
      .subscribe(locations => {
        this.locations = locations
      });
  }

  getFleetPlan(): void {
    this.planService.getFleetPlan()
      .subscribe(fleetPlan => {
        this.fleetPlan = fleetPlan
      });
  }

  getSimulatedFleetPlan(): void {
    this.planService.getSimulatedFleetPlan()
      .subscribe(fleetPlan => {
        this.simulatedFleetPlan = fleetPlan
      });
  }

  getTimeList(body: any): void {
    this.planService.getTimeList(body)
      .subscribe(timeList => {
        this.timesLists.push(timeList)
        this.fleetPlan.plan[this.currentPathPage - 1] = timeList.H
        this.currentPlan = this.fleetPlan
      });
  }

  getSimulatedTimeList(body: any, index: number): void {

  }

  setSelectedPath(path: number[]) {
    this.selectedPath = path
    this.canvasDrawn = false
  }

  ngOnInit(): void {
    //this.getPlan();
    this.getLocations();
    this.getFleetPlan();
    this.getSimulatedFleetPlan();
  }

  ngAfterViewChecked() {
    if (this.number_of_trucks && !this.canvasDrawn) {
      const locationsArr = [[1330, 1454], [382, 1392], [635, 967], [487, 710]
        , [266, 811], [639, 1888], [999, 739], [321, 899]
        , [123, 91], [507, 1531], [825, 384], [691, 1638]
        , [529, 432], [1058, 1867], [710, 804], [313, 326], [388, 1082]];

      let canvas = this.canvasRef.nativeElement;
      let ctx = canvas.getContext('2d');

      let image = new Image();
      image.src = "../../../assets/Map.png";
      image.onload = () => { // use an arrow function here

        canvas.height = image.height;
        canvas.width = image.width;

        ctx.drawImage(image, 0, 0);

        ctx.strokeStyle = "#4d0000";
        ctx.lineWidth = 8;
        ctx.setLineDash([10, 10]);

        // An array of points to draw lines between
        let points = this.selectedPath.slice();
        points.unshift(5)
        points.push(5)

        // Loop through the array of points
        for (let i = 0; i < points.length; i++) {
          let point = points[i] - 1;
          let x = locationsArr[point][0];
          let y = locationsArr[point][1];

          ctx.fillStyle = "#000000";

          // If this is the first point, move to it
          if (i === 0) {
            ctx.moveTo(x, y);
          }
          // Otherwise, draw a line to it
          else {
            if (i === points.length - 1) {
              ctx.fillStyle = "#008de5";
            }

            // Reset the path
            ctx.beginPath();
            // Move to the previous point
            ctx.moveTo(locationsArr[points[i - 1] - 1][0], locationsArr[points[i - 1] - 1][1]);

            // Draw a line to the current point
            ctx.lineTo(x, y);

            // Stroke the current path
            ctx.stroke();
          }

          // Draw a circle at the current point
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2, true);
          ctx.fill();
        }
      };
      this.canvasDrawn = true;
    }
  }

  simulatePlan() {
    this.getSimulatedFleetPlan()
    this.simulatedTimesLists = []
    this.canvasDrawn = false;
    this.currentPlan = this.simulatedFleetPlan
    this.isSimulated = true
    this.number_of_trucks = this.simulatedFleetPlan?.numberOfTrucks
    this.selectedPath = this.simulatedFleetPlan?.plan[0]
    this.currentPathPage = 0

    // create an array of observables by calling getSimulatedTimeList for each item in simulatedFleetPlan.plan
    const observables = this.simulatedFleetPlan.plan.map(item => {
      let body: SimulatedPlanSubList = {
        truck1: item
      };
      return this.planService.getSimulatedTimeList(body);
    });

    // wait for all observables to complete using forkJoin
    forkJoin(observables).subscribe(timeLists => {
      // timeLists is an array containing the result of each observable
      timeLists.forEach(timeList => {
        let pl: PlanTimePaths = {
          Z: timeList.Z,
          H: timeList.H,
        };
        this.simulatedTimesLists.push(pl)
      });

      // now that all observables have completed, you can access the updated value of simulatedTimesLists
      for (let i = 0; i < this.simulatedTimesLists.length; i++) {
        this.currentPlan.plan[i] = this.simulatedTimesLists[i].H;
      }

      let record = this.simulatedTimesLists.reduce((maxRecord, currentRecord) => {
        return currentRecord.Z > maxRecord.Z ? currentRecord : maxRecord;
      }, {Z: -Infinity, H: []})

      const names = record.H.map(locationId => {
        const location = this.locations.find(location => location.locationId === String(locationId));
        return location ? location.name : '';
      });

      this.maxZRecord = record.Z;
      this.longestPath = names

    });

    /*
    for (let i = 0; i < this.simulatedFleetPlan.plan.length; i++) {
      let body: SimulatedPlanSubList = {
        truck1: this.simulatedFleetPlan.plan[i]
      };
      this.planService.getSimulatedTimeList(body)
        .subscribe(timeList => {
          let pl: PlanTimePaths = {
            Z: timeList.Z,
            H: timeList.H,
          };
          this.simulatedTimesLists.push(pl)
          this.simulatedFleetPlan.plan[i] = timeList.H
          this.currentPlan = this.simulatedFleetPlan
        });
    }

    let record = this.simulatedTimesLists.reduce((maxRecord, currentRecord) => {
      return currentRecord.Z > maxRecord.Z ? currentRecord : maxRecord;
    }, {Z: -Infinity, H: []})

    const names = record.H.map(locationId => {
      const location = this.locations.find(location => location.locationId === String(locationId));
      return location ? location.name : '';
    });

    this.maxZRecord = record.Z;
    this.longestPath = names
     */
  }

  loadTrucks() {
    this.getFleetPlan()
    this.canvasDrawn = false;
    this.currentPlan = this.fleetPlan
    this.isSimulated = false
    this.number_of_trucks = this.fleetPlan?.numberOfTrucks
    this.selectedPath = this.fleetPlan?.plan[0]
    this.currentPathPage = 0
  }

  nextPath(numberOfGenerations: HTMLInputElement, populationDimension: HTMLInputElement, crossingProbability: HTMLInputElement, mutationProbability: HTMLInputElement) {

    if (numberOfGenerations.value != "" && populationDimension.value != "" && crossingProbability.value != "" && mutationProbability.value != "") {
      let sublist: PlanSubList = {
        ng: Number(numberOfGenerations.value),
        dp: Number(populationDimension.value),
        p1: Number(crossingProbability.value),
        p2: Number(mutationProbability.value),
        truck1: this.fleetPlan.plan[this.currentPathPage]
      };
      this.getTimeList(sublist);
      this.subLists.push(sublist)
      numberOfGenerations.value = ""
      populationDimension.value = ""
      crossingProbability.value = ""
      mutationProbability.value = ""
      this.currentPathPage++

      if (this.currentPathPage >= this.fleetPlan.plan.length) {

        let record = this.timesLists.reduce((maxRecord, currentRecord) => {
          return currentRecord.Z > maxRecord.Z ? currentRecord : maxRecord;
        }, {Z: -Infinity, H: []})

        const names = record.H.map(locationId => {
          const location = this.locations.find(location => location.locationId === String(locationId));
          return location ? location.name : '';
        });

        this.maxZRecord = record.Z;
        this.longestPath = names
      }

    }
  }

}
