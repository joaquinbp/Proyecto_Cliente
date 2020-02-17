import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Teacher } from '../models/teacher';



@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  readonly URL_API = 'http://localhost:4000/api/teachers';
  selectedTeacher: Teacher;
  teachers: Teacher[];

  constructor(private http: HttpClient) {
    this.selectedTeacher = new Teacher();
   }

  getTeachers() {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      })
  };
    return this.http.get(this.URL_API, httpOptions);
  }

  createTeacher(teacher: Teacher) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      })
  };
    return this.http.post(this.URL_API, teacher);
  }

  editTeacher(teacher: Teacher) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      })
  };
    return this.http.put(this.URL_API + `/${teacher._id}`, teacher);
  }

  deleteTeacher(_id : String) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      })
  };
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
