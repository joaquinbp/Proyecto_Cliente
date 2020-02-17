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
    return this.http.get(this.URL_API);
  }

  createBooking(booking: Booking) {
    return this.http.post(this.URL_API, booking);
  }

  editBooking(booking: Booking) {
    return this.http.put(this.URL_API + `/${booking._id}`, booking);
  }

  deleteBooking(_id : String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
