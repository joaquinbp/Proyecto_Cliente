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
    return this.http.get(this.URL_API);
  }

  createCompany(company: Company) {
    return this.http.post(this.URL_API, company);
  }

  editCompany(company: Company) {
    return this.http.put(this.URL_API + `/${company._id}`, company);
  }

  deleteCompany(_id : String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
