export class Booking {
   _id : String;
   user: String;
   company: String;
   date: String;
   time: String;

   constructor(_id='', user='', company='', date='', time=''){
       this._id = _id;
       this.user = user;
       this.company = company;
       this.date = date;
       this.time = time;
   }
}
