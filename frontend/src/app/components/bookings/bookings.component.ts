import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { Booking } from '../../models/booking';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingsService]
})
export class BookingsComponent implements OnInit {

  constructor(private bookingService: BookingsService) { }

  ngOnInit() {
    this.getBookings();
  }

  addBooking(form: NgForm) {

    if(form.value._id){
      this.bookingService.editBooking(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
          M.toast({html: 'Booking update succesfully'});
          this.getBookings();
        });
    } else{
      this.bookingService.createBooking(form.value)
      .subscribe(res => {
        console.log(res);
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
        console.log(res);
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
