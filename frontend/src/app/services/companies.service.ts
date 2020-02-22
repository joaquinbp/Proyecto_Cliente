import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  readonly URL_API = 'http://localhost:4000/api/companies';
  selectedCompany: Company;
  companies: Company[];

  constructor(private http: HttpClient) {
    this.selectedCompany = new Company();
  }

  getCompanies() {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      })
  };
    return this.http.get(this.URL_API, httpOptions);
  }

  createCompany(company: Company) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      })
  };
    return this.http.post(this.URL_API, company, httpOptions);
  }

  editCompany(company: Company) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      })
  };
    return this.http.put(this.URL_API + `/${company._id}`, company, httpOptions);
  }

  deleteCompany(_id : String) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      })
  };
    return this.http.delete(this.URL_API + `/${_id}`,httpOptions);
  }
}
