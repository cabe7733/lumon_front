import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getTasks(id:any){
    let url = '/api/task';
    return this.http.get(url+id);
  }

  addTasks(data:any){
    let url ="/api/task";
    return this.http.post<any>(environment.urlApi+url,data);
  }

  editTasks(data:any){
    let url ="/api/task/";
    return this.http.post<any>(environment.urlApi+url+data.id,data);
  }

  deleteTasks(data:any){
    let url ="/api/task/";
    return this.http.delete(environment.urlApi+url+data.id);
  }

}
