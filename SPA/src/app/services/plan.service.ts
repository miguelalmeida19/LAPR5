import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {filter, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Plan} from '../domain/plan';
import {MessageService} from './message.service';
import {AppConfigService} from "../../AppConfigService";
import {FleetPlan} from "../domain/fleet-plan";
import {PlanTimePaths} from "../domain/plan-time-paths";


@Injectable({providedIn: 'root'})
export class PlanService {

  plansUrl = AppConfigService.planApi + '/deliveries';  // URL to web api
  updateUrl = AppConfigService.planApi + '/update';  // URL to web api

  plansUrlFromLogi = AppConfigService.logiApi + '/api/plan';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  /** GET plans from the server */
  getPlan(): Observable<Plan> {
    this.http.get(this.updateUrl)
    console.log(this.plansUrl)
    return this.http.get<Plan>(this.plansUrl)
  }

  /** GET fleet plan from the server */
  getSimulatedFleetPlan(): Observable<FleetPlan> {
    console.log(this.plansUrlFromLogi + "/simulate/trucks")
    return this.http.get<FleetPlan>(this.plansUrlFromLogi + "/simulate/trucks")
  }

  /** GET fleet plan from the server */
  getFleetPlan(): Observable<FleetPlan> {
    console.log(this.plansUrlFromLogi + "/trucks")
    return this.http.get<FleetPlan>(this.plansUrlFromLogi + "/trucks")
  }

  /** POST ask for the time and the list to the server */
  getTimeList(body: any): Observable<PlanTimePaths> {
    console.log(this.plansUrlFromLogi + "/generate/sublist")
    return this.http.post<PlanTimePaths>(this.plansUrlFromLogi + "/generate/sublist", body)
  }

  /** POST ask for the time and the list to the server */
  getSimulatedTimeList(body: any): Observable<PlanTimePaths> {
    console.log(this.plansUrlFromLogi + "/simulate/generate/sublist")
    return this.http.post<PlanTimePaths>(this.plansUrlFromLogi + "/simulate/generate/sublist", body)
  }
}
