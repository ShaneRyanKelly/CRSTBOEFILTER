import { Component }          from '@angular/core';

import { CountyService } from "./county/county.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ CountyService ]
})
export class AppComponent {

}
