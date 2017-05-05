import { Routes, RouterModule } from "@angular/router";

import { CountyComponent } from "./county/county.component";
import { FilterComponent } from "./county/filter.component";
import { ImportComponent } from "./import/import.component";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/county', pathMatch:'full' },
  { path: 'county', component: CountyComponent },
  { path: 'county/:name', component: FilterComponent },
  { path: 'import', component: ImportComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
