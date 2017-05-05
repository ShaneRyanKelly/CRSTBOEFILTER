import { Http, Response, Headers }    from '@angular/http';
import { Injectable, EventEmitter }   from '@angular/core';
import 'rxjs/Rx';
import { Observable }                 from 'rxjs';
import { CsvService }                 from 'angular2-json2csv';

import { Results }                    from './results.model';
import { County }                     from './county.model';
import { CountyName }                 from './countyName.model';
import { Field }                      from './field.model';

@Injectable()
export class FilterService {
  private zipCode: any[];
  private city: any[];
  private currentField: string[] = [];
  private count: number = 0;
  private filterResults: Results[] = [];

  constructor(
    private http: Http,
    private csvService: CsvService
  ){}

  fetchData(countyName: CountyName, field: string){
    this.currentField.push(field);
    const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.get('http://localhost:3000/county/' + countyName.Name + '/' + field, {headers: headers})
        .map((response: Response) => {
          const fields = response.json().data;
          let transformedFields : Field[] = [];
          for ( let thisField of fields ) {
            transformedFields.push(new Field(JSON.parse(JSON.stringify(thisField[field])), JSON.stringify(thisField.count)));
          }
          return transformedFields;
        })
        .catch((error: Response) => Observable.throw(console.log(error)));
      }

    getCSV(countyName: string, zipCodes: string, cities: string, states: string,
            affiliations: string, towns: string, wards: string,
            districts: string, congressionalDistricts: string,
            senatorialDistricts: string, legislativeDistricts: string,
            schoolDistricts: string, voterHistories: string){
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.get("http://localhost:3000/county/" + countyName + "/" + zipCodes + '/' + cities + '/' + states + '/' + affiliations + '/' + towns + '/' + wards + '/' + districts + '/' + congressionalDistricts +
              '/' + senatorialDistricts + '/' + legislativeDistricts + '/' + schoolDistricts + '/' + voterHistories)
      .map((response: Response) => {
        console.log(response.json().data);
        const results = response.json().data;
        let transformedResults: Results[] = [];
        for (let resultss of results){
          for (let result of resultss){
            transformedResults.push(new Results( JSON.stringify(result.FirstName), JSON.parse(JSON.stringify(result.MiddleName)),
              JSON.parse(JSON.stringify(result.LastName)), JSON.parse(JSON.stringify(result.Suffix)), JSON.parse(JSON.stringify(result.StreetNumber)),
              JSON.parse(JSON.stringify(result.HalfCode)), JSON.parse(JSON.stringify(result.StreetName)), JSON.parse(JSON.stringify(result.APT)),
              JSON.parse(JSON.stringify(result.AddressLine2)), JSON.parse(JSON.stringify(result.AddressLine3)), JSON.parse(JSON.stringify(result.City)),
              JSON.parse(JSON.stringify(result.State)), JSON.parse(JSON.stringify(result.ZipCode)), JSON.parse(JSON.stringify(result.ZipCodePlus4))));
          }
        }
        this.filterResults = transformedResults;
        return transformedResults;

      })
      .catch((error: Response) => Observable.throw(console.log(error)));
    }
  }
