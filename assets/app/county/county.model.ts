export class County{
  VoterID: string;
  FirstName: string;
  LastName: string;
  ZipCode: string;
  City: string;

  constructor(VoterID: string, FirstName: string,
      LastName: string, ZipCode: string,
      City: string){
    this.VoterID = VoterID;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.ZipCode = ZipCode;
    this.City = City;
  }
}
