import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { Booking } from '../../models/booking';
import { NgForm } from '@angular/forms';
import {UserService} from '../../services/users.service';
import { CompaniesService } from '../../services/companies.service';

declare var M: any;

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingsService]
})
export class BookingsComponent implements OnInit {

  public identity = null;
  public token = null;
  public companies;

  constructor(private bookingService: BookingsService, private userService: UserService, private companyService: CompaniesService ) { }

  ngOnInit() {
    this.getBookings();
    this.getCompanies();
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  getCompanies(){
    this.companyService.getCompanies()
    .subscribe (res => {
      this.companies = res;
    });
  }


  addBooking(form: NgForm) {

    if(form.value._id){
      this.bookingService.editBooking(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Booking update succesfully'});
          this.getBookings();
        });
    } else{
      this.bookingService.createBooking(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Booking save succesfully'});
        this.getBookings();
      });
    }
  }

  resetForm(form: NgForm) {
    if(form){
      form.reset();
      this.bookingService.selectedBooking = new Booking();
    }
  }

  getBookings(){
    this.bookingService.getBookings()
      .subscribe(res => {
        this.bookingService.bookings = res as Booking[];
      });
  }

  editBooking(booking: Booking){
    this.bookingService.selectedBooking = booking;
  }

  deleteBooking(_id: String){
    if(confirm('Are you sure you want delete it?')){
      this.bookingService.deleteBooking(_id)
        .subscribe( res => {
          this.getBookings();
          M.toast({html: 'Booking delete succesfully'});
        })
    }
  }
  


}
