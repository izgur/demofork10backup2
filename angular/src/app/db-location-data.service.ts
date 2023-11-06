import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Location } from "./location-list/location-list.component";
@Injectable({
  providedIn: "root",
})
export class DbLocationDataService {
  constructor(private http: HttpClient) {}
  //private apiUrl = "http://localhost:3000/api";
  private apiUrl = "https://lp-izgur-web-service.onrender.com/api";
  public getLocations(
    lng: number,
    lat: number,
    distance: number,
    nResults: number
  ): Observable<Location[]> {
    const url: string = `${this.apiUrl}/locations/distance?lng=${lng}&lat=${lat}&distance=${distance}&nResults=${nResults}`;
    return this.http
      .get<Location[]>(url)
      .pipe(retry(1), catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error.message || error.statusText);
  }
}