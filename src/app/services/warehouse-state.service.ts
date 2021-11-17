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
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.post<any>(
      'http://localhost:8080/add-warehouse-state',
      warehouseState,
    );
  }
}
