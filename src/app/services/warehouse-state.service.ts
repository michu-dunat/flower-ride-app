import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WarehouseState } from '../classes/warehouse-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WarehouseStateService {
  constructor(private http: HttpClient) {}

  addWarehouseState(warehouseState: WarehouseState) {
    return this.http.post<any>(
      'http://localhost:8080/add-warehouse-state',
      warehouseState
    );
  }

  getAllWarehouseStates(): Observable<WarehouseState[]> {
    return this.http.get<WarehouseState[]>(
      'http://localhost:8080/warehouse-states'
    );
  }
}
