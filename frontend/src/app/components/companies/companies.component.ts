import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { NgForm } from '@angular/forms';
import { Company } from '../../models/company';
import {UserService} from '../../services/users.service';

declare var M: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [CompaniesService]
})
export class CompaniesComponent implements OnInit {
  public identity = null;
  public token = null;

  constructor(private companyService: CompaniesService,  private userService: UserService) {}

  ngOnInit() {
    this.getCompanies();
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  addCompany(form: NgForm) {

    if(form.value._id){
      this.companyService.editCompany(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Company update succesfully'});
          this.getCompanies();
        });
    } else{
      this.companyService.createCompany(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Company save succesfully'});
        this.getCompanies();
      });
    }
  }

  resetForm(form: NgForm) {
    if(form){
      form.reset();
      this.companyService.selectedCompany = new Company();
    }
  }

  getCompanies(){
    this.companyService.getCompanies()
      .subscribe(res => {
        this.companyService.companies = res as Company[];
      });
  }

  editCompany(company: Company){
    this.companyService.selectedCompany = company;
  }

  deleteCompany(_id: String){
    if(confirm('Are you sure you want delete it?')){
      this.companyService.deleteCompany(_id)
        .subscribe( res => {
          this.getCompanies();
          M.toast({html: 'Company delete succesfully'});
        })
    }
  }

  showForm(){
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, {accordion: false});
    }
  
  }
