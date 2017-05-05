import { Component }                from "@angular/core";
import { Http, Response, Headers }  from "@angular/http";

import { ImportService }            from "./import.service";
import { COUNTIES }                 from "./county";
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html'
})
export class ImportComponent{
  // Variables for File Upload
  private fileList: FileList;
  private file: File;
  private formData: FormData;

  // String Variables for constructing queries
  private headers: string[] = [];
  private counties: string[] = COUNTIES;
  private selectedCounty: string;
  private query: string = '';
  private dropQuery: string = '';
  private loadQuery: string = '';
  private headerString: string = '';

  // Booleans used to load specific page elements
  private fileUploaded: boolean;
  private headersSet: boolean;
  private countySelected: boolean;

  constructor(
    private importService: ImportService
  ){}

  doQuery(query: string) {
    this.importService.sendQuery(query).subscribe(
      (response: Response) => {
        console.log("query response: " + response);
      }
    );
  }

  dropTable(){
    this.dropQuery = "DROP TABLE IF EXISTS ";
    this.dropQuery = this.dropQuery.concat(this.selectedCounty + ";");
    this.importService.sendQuery(this.dropQuery).subscribe(
      (response: Response) => {
        console.log("drop response: " + response);
      }
    );
    this.doQuery(this.query);
  }

  fileChange(event) {
    this.fileList = event.target.files;
    this.file = this.fileList[0];
    this.formData = new FormData();
    this.formData.append('uploadFile', this.file, this.file.name);
    console.log(this.formData);
  }

  loadData() {
    this.loadQuery = "LOAD DATA LOCAL INFILE '/home/bodhi/fast/public/upload/uploadFile.csv' INTO TABLE ";
    this.loadQuery = this.loadQuery.concat(this.selectedCounty + " FIELDS TERMINATED BY ',' ");
    this.loadQuery = this.loadQuery.concat("LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES (");
    var count = 0;
    for (let header of this.headers){
      if ( count === 0)
        this.loadQuery = this.loadQuery.concat(header + ', ');
      else if ( count === (this.headers.length - 1) )
        this.loadQuery = this.loadQuery.concat(header + ');')
      else
        this.loadQuery = this.loadQuery.concat(header + ', ');

      count = count + 1;
    }
    this.load(this.loadQuery);
  }
  load(query: string){
    var count = 0;
    for (let header of this.headers){
      if ( count === (this.headers.length - 1) )
        this.headerString = this.headerString.concat(header)
      else
        this.headerString = this.headerString.concat(header + ', ');

      count = count + 1;
    }
    this.importService.loadQuery(this.headerString, this.selectedCounty).subscribe(
      (response: Response) => {
        console.log("query response: " + response);
      }
    );
  }

  readCSVHeaders(){
    this.importService.getHeaders('public/upload/uploadFile.csv')
      .subscribe(
        (headers: string[]) => {
          this.headers = headers;
        }
      );
      this.headersSet = true;
  }

  selectCounty(event){
    var count = 0;
    this.selectedCounty = event;
    this.query = 'CREATE TABLE ' + this.selectedCounty + ' (';
    for (let header of this.headers){
      if ( count === 0)
        this.query = this.query.concat(header + ' INT NOT NULL PRIMARY KEY, ');
      else if ( count === (this.headers.length - 1) )
        this.query = this.query.concat(header + ' VARCHAR(50));')
      else
        this.query = this.query.concat(header + ' VARCHAR(50), ');

      count = count + 1;
    }
    this.countySelected = true;
    this.dropTable();
  }

  upload() {
    this.importService.uploadFile(this.formData).subscribe(
      (response: Response) => {
        console.log("in component: " + response);
      }
    );
    this.fileUploaded = true;
  }
}
