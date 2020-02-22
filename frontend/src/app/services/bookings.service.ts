import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  readonly URL_API = 'http://localhost:4000/api/booking';
  selectedBooking: Booking;
  bookings: Booking[];

  constructor(private http: HttpClient) {
    this.selectedBooking = new Booking ();
   }

   getBookings() {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      })
  };
    return this.http.get(this.URL_API,httpOptions);
  }

  createBooking(booking: Booking) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      })
  };
    return this.http.post(this.URL_API, booking,httpOptions);
  }

  editBooking(booking: Booking) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      })
  };
    return this.http.put(this.URL_API + `/${booking._id}`, booking, httpOptions);
  }

  deleteBooking(_id : String) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
      })
  };
    return this.http.delete(this.URL_API + `/${_id}`,httpOptions);
  }
}
