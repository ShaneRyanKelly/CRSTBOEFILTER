import { Http, Response, Headers,  RequestOptions }    from '@angular/http';
import { Injectable, EventEmitter }                    from '@angular/core';
import 'rxjs/Rx';
import { Observable }                                  from 'rxjs';

@Injectable()
export class ImportService {

  constructor(private http: Http){}

  getHeaders(path: string){
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get('http://localhost:3000/import/', headers)
      .map((response: Response) => {
        console.log("in service: ");
        console.log(response['_body']);
        const fileHeaders = response['_body'];
        var seperatedHeaders = fileHeaders.split(',');
        console.log(seperatedHeaders);
        return seperatedHeaders;
      })
      .catch((error: Response) => Observable.throw(console.log(error)));
  }
  loadQuery(headerString: string, selectedCounty: string){
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://localhost:3000/import/' + headerString + '/' + selectedCounty, {headers: headers} )
    .map(res => res.json())
    .catch(error => Observable.throw(error));
  }
  uploadFile(formData: FormData){
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Content-Disposition', 'text/csv');
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/import/', formData, options )
      .map(res => res.json())
      .catch(error => Observable.throw(error));
  }

  sendQuery(query: string){
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://localhost:3000/import/' + query, {headers: headers} )
    .map(res => res.json())
    .catch(error => Observable.throw(error));
  }

}
