import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { NgForm } from '@angular/forms';
import { Company } from '../../models/company';

declare var M: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [CompaniesService]
})
export class CompaniesComponent implements OnInit {

  constructor(private companyService: CompaniesService) {}

  ngOnInit() {
    this.getCompanies();
  }

  addCompany(form: NgForm) {

    if(form.value._id){
      this.companyService.editCompany(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
          M.toast({html: 'Company update succesfully'});
          this.getCompanies();
        });
    } else{
      this.companyService.createCompany(form.value)
      .subscribe(res => {
        console.log(res);
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
        console.log(res);
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


}
