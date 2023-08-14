import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = `${environment.BaseUrl}/api/v1/employee`

  constructor( private http: HttpClient, private route:Router ) { }

  getEmployee(){
    return this.http.get<any>(`${this.baseUrl}`)
  }

  deleteEmployee(id:any){
    return this.http.delete(`${this.baseUrl}/${id}/delete`)
  }
}
