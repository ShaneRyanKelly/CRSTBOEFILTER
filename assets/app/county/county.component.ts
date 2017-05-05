import { Component, Input, OnInit, Directive}   from "@angular/core";
import { ActivatedRoute, Params }                from '@angular/router';

import { County }               from "./county.model";
import { CountyService }        from "./county.service";
import { CountyName }           from "./countyName.model";

@Component({
  selector: 'app-county',
  templateUrl: './county.component.html'
})
export class CountyComponent implements OnInit{
  @Input() county: County;
  countyNames: CountyName[];
  @Input() selectedCounty: CountyName;

  constructor(
    private countyService: CountyService,
    private route: ActivatedRoute
  ){}

  selectCounty(selectedCounty: CountyName){
    this.selectedCounty = selectedCounty;
    /*this.countyService.fetchData(this.selectedCounty)
      .subscribe(

      );*/
  }

  ngOnInit(): void {
    this.countyService.getCounties()
      .subscribe(
        (countyNames: CountyName[]) => {
        this.countyNames = countyNames;
      }
    );
  }
}
