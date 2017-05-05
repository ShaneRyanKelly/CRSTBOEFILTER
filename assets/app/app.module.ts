import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { HttpModule }                       from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule }                     from 'ng2-select';
import { MultiselectDropdownModule }        from 'angular-2-dropdown-multiselect';
import { CsvService }                       from 'angular2-json2csv';

import { AppComponent }                     from "./app.component";
import { CountyComponent }                  from "./county/county.component";
import { CountyService }                    from "./county/county.service";
import { FilterComponent }                  from "./county/filter.component";
import { FilterService }                    from "./county/filter.service";
import { ImportComponent }                  from "./import/import.component";
import { ImportService }                    from "./import/import.service";
import { HeaderComponent }                  from "./header.component";
import { routing }                          from "./app.routing";


@NgModule({
    declarations: [
      AppComponent,
      CountyComponent,
      FilterComponent,
      ImportComponent,
      HeaderComponent
    ],
    imports: [
      BrowserModule,
      HttpModule,
      routing,
      FormsModule,
      ReactiveFormsModule,
      SelectModule,
      MultiselectDropdownModule
    ],
    providers: [
      CountyService,
      FilterService,
      ImportService,
      CsvService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
