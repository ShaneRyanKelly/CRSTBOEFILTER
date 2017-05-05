export class Results{

  FirstName: any;
  MiddleName: any;
  LastName: any;
  Suffix: any;
  StreetNumber: any;
  HalfCode: any;
  StreetName: any;
  APT: any;
  AddressLine2: any;
  AddressLine3: any;
  City: any;
  State: any;
  ZipCode: any;
  ZipCodePlus4: any;


  constructor(FirstName: any, MiddleName: any, LastName: any, Suffix: any,
              StreetNumber: any, HalfCode: any, StreetName: any,
              APT: any, AddressLine2: any, AddressLine3: any, City: any,
              State: any, ZipCode: any, ZipCodePlus4: any){
    this.FirstName = FirstName;
    this.MiddleName = MiddleName;
    this.LastName = LastName;
    this.Suffix = Suffix;
    this.StreetNumber = StreetNumber;
    this.HalfCode = HalfCode;
    this.StreetName = StreetName;
    this.APT = APT;
    this.AddressLine2 = AddressLine2;
    this.AddressLine3 = AddressLine3;
    this.City = City;
    this.State = State;
    this.ZipCode = ZipCode;
    this.ZipCodePlus4 = ZipCodePlus4;
  }
}
