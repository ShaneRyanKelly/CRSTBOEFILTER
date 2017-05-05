import { Http, Response, Headers }    from '@angular/http';
import { Injectable, EventEmitter }   from '@angular/core';
import 'rxjs/Rx';
import { Observable }                 from 'rxjs';

import { County }                     from './county.model';
import { CountyName }                 from './countyName.model';

@Injectable()
export class CountyService{
  private counties: CountyName [] = [];
  private countyName: "";


  constructor(
    private http: Http
  ){}

  /*fetchData(){
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get('http://localhost:3000/county/:name', {headers: headers})
      .map((response: Response) => {
        console.log(response.json().obj);
      })
      .catch((error: Response) => Observable.throw(error.json().error));
    }*/

    getCounties(){
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.get('http://localhost:3000/county', {headers: headers})
        .map((response: Response) => {
          const counties = response.json().data;
          let transformedCounties: CountyName[] = [];
          for ( let county of counties ) {
            transformedCounties.push(new CountyName( JSON.parse(JSON.stringify(county.Tables_in_boe_database))));
          }
          this.counties = transformedCounties;
          return transformedCounties;
        })
        .catch((error: Response) => Observable.throw(console.log(error)));
    }
}
