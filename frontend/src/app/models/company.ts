export class Company {
    _id : String;
    name: String;
    CIF: String;
    address: String;
    city: String;
    sector: String;

    constructor(_id='', name='', CIF='', address='', city='', sector=''){
        this._id = _id;
        this.name = name;
        this.CIF = CIF;
        this.address = address;
        this.city = city;
        this.sector = sector;
    }
}

