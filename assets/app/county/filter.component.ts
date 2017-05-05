import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { IMultiSelectOption }   from 'angular-2-dropdown-multiselect';
import { IMultiSelectTexts }    from 'angular-2-dropdown-multiselect';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { Results }              from './results.model';
import { FilterService }        from './filter.service';
import { CountyName }           from './countyName.model';
import { Field }                from './field.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent implements OnInit{

  results: Results[] = [];
  resultCount: number;
  gotResults: boolean = false;
  confirmed: boolean = false;
  csv: string = "";
  row: string = "";

  constructor(
    private route: ActivatedRoute,
    private filterService: FilterService
   ){}
   // receives selected county from the county component
   // and then fetches the data from the data base related
   // to that county this pushes data to the select arrays
   // which are of the type IMultiSelect, an npm package
   // for making responsive drop downs in angular
  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.countyName = new CountyName(params['name']);
    });
    this.filterService.fetchData(this.countyName, 'Zipcode').subscribe(
      (zips: Field[]) => {
        this.zipcodes = zips;
        var count: any = 0;
        for (let zip of this.zipcodes){
          this.zipSelect.push({id: count, name: zip.fieldValue + ' - ' + zip.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'City').subscribe(
      (cities: Field[]) => {
        this.cities = cities;
        var count: any = 0;
        for (let city of this.cities){
          this.citySelect.push({id: count, name: city.fieldValue + ' - ' + city.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'State').subscribe(
      (states: Field[]) => {
        this.states = states;
        var count: any = 0;
        for (let state of this.states){
          this.stateSelect.push({id: count, name: state.fieldValue + ' - ' + state.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'Affiliation').subscribe(
      (affiliations: Field[]) => {
        this.affiliations = affiliations;
        var count: any = 0;
        for (let affiliation of this.affiliations){
          this.affiliationSelect.push({id: count, name: affiliation.fieldValue + ' - ' + affiliation.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'Town').subscribe(
      (towns: Field[]) => {
        this.towns = towns;
        var count: any = 0;
        for (let town of this.towns){
          this.townSelect.push({id: count, name: town.fieldValue + ' - ' + town.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'Ward').subscribe(
      (wards: Field[]) => {
        this.wards = wards;
        var count: any = 0;
        for (let ward of this.wards){
          this.wardSelect.push({id: count, name: ward.fieldValue + ' - ' + ward.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'District').subscribe(
      (districts: Field[]) => {
        this.districts = districts;
        var count: any = 0;
        for (let district of this.districts){
          this.districtSelect.push({id: count, name: district.fieldValue + ' - ' + district.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'CongressionalDistrict').subscribe(
      (congressionalDistricts: Field[]) => {
        this.congressionalDistricts = congressionalDistricts;
        var count: any = 0;
        for (let congressionalDistrict of this.congressionalDistricts){
          this.congressionalSelect.push({id: count, name: congressionalDistrict.fieldValue + ' - ' + congressionalDistrict.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'SenatorialDistrict').subscribe(
      (senatorialDistricts: Field[]) => {
        this.senatorialDistricts = senatorialDistricts;
        var count: any = 0;
        for (let senatorialDistrict of this.senatorialDistricts){
          this.senatorialSelect.push({id: count, name: senatorialDistrict.fieldValue + ' - ' + senatorialDistrict.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'LegislativeDistrict').subscribe(
      (legislativeDistricts: Field[]) => {
        this.legislativeDistricts = legislativeDistricts;
        var count: any = 0;
        for (let LegislativeDistrict of this.legislativeDistricts){
          this.legislativeSelect.push({id: count, name: LegislativeDistrict.fieldValue + ' - ' + LegislativeDistrict.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'SchoolDistrict').subscribe(
      (schoolDistricts: Field[]) => {
        this.schoolDistricts = schoolDistricts;
        var count: any = 0;
        for (let schoolDistrict of this.schoolDistricts){
          this.schoolSelect.push({id: count, name: schoolDistrict.fieldValue + ' - ' + schoolDistrict.count});
          count = count + 1;
        }
      }
    );
    this.filterService.fetchData(this.countyName, 'VoterHistoryCode1').subscribe(
      (voterHistory: Field[]) => {
        this.voterHistories = voterHistory;
        var count: any = 0;
        for (let voterHistory of this.voterHistories){
          this.historySelect.push({id: count, name: voterHistory.fieldValue + ' - ' + voterHistory.count});
          count = count + 1;
        }
      }
    );
  }

  // this function is called if you choose not to
  // export csv, it clears the strings used to save
  // queries
  cancel() {
    this.gotResults = false;
    this.zipQuery = "";
    this.cityQuery = "";
    this.stateQuery = "";
    this.affiliationQuery = "";
    this.townQuery = "";
    this.wardQuery = ""
    this.districtQuery = "";
    this.congressionalQuery = "";
    this.senatorialQuery = "";
    this.legislativeQuery = "";
    this.schoolQuery = "";
    this.historyQuery = "";
    this.confirmed = false;
  }

  /*  aftert the user has selected from the drop drop downs
      this function is called to get the selected elements from
      the arrays created by ngOnInit
  */
  confirmSelection(event){
    this.selectedZipCodes = [];
    for (let selection of this.zipModel)
      this.selectedZipCodes.push(this.zipcodes[selection].fieldValue);
    this.selectedCities = [];
    for (let selection of this.cityModel)
      this.selectedCities.push(this.cities[selection].fieldValue);
    this.selectedStates = [];
    for (let selection of this.stateModel)
      this.selectedStates.push(this.states[selection].fieldValue);
    this.selectedAffiliations = [];
    for (let selection of this.affiliationModel)
      this.selectedAffiliations.push(this.affiliations[selection].fieldValue);
    this.selectedTowns = [];
    for (let selection of this.townModel)
      this.selectedTowns.push(this.towns[selection].fieldValue);
    this.selectedWards = [];
    for (let selection of this.wardModel)
      this.selectedWards.push(this.wards[selection].fieldValue);
    this.selectedDistricts = [];
    for (let selection of this.districtModel)
      this.selectedDistricts.push(this.districts[selection].fieldValue);
    this.selectedCongressional = [];
    for (let selection of this.congressionalModel)
      this.selectedCongressional.push(this.congressionalDistricts[selection].fieldValue);
    this.selectedSenatorial = [];
    for (let selection of this.senatorialModel)
      this.selectedSenatorial.push(this.senatorialDistricts[selection].fieldValue);
    this.selectedLegislative = [];
    for (let selection of this.legislativeModel)
      this.selectedLegislative.push(this.legislativeDistricts[selection].fieldValue);
    this.selectedSchools = [];
    for (let selection of this.schoolModel)
      this.selectedSchools.push(this.schoolDistricts[selection].fieldValue);
    for (let selection of this.historyModel)
      this.selectedHistories.push(this.voterHistories[selection].fieldValue);
    this.sendQuery();
    this.confirmed = true;
  }

  /*  This function creates a massive string which will
      be downloaded as a csv when the user decides to do so
  */
  downloadCSV(){
    this.csv = this.csv.concat("FirstName, MiddleName, LastName, Suffix, StreetNumber, HalfCode, StreetName, APT, AddressLine2, AddressLine3, City, State, ZipCode, ZipCodePlus4\r\n");
    this.row = "";

    for ( let result of this.results ){
      this.row = this.row.concat(result.FirstName + ', ');
      this.row = this.row.concat(result.MiddleName + ', ');
      this.row = this.row.concat(result.LastName + ', ');
      this.row = this.row.concat(result.Suffix + ', ');
      this.row = this.row.concat(result.StreetNumber + ', ');
      this.row = this.row.concat(result.HalfCode + ', ');
      this.row = this.row.concat(result.StreetName + ', ');
      this.row = this.row.concat(result.APT + ', ');
      this.row = this.row.concat(result.AddressLine2 + ', ');
      this.row = this.row.concat(result.AddressLine3 + ', ');
      this.row = this.row.concat(result.City + ', ');
      this.row = this.row.concat(result.State + ', ');
      this.row = this.row.concat(result.ZipCode + ', ');
      this.row = this.row.concat(result.ZipCodePlus4 + '\r\n');
      this.csv = this.csv.concat(this.row);
      this.row = "";
    }
    var blob = new Blob([this.csv], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  /*  this function does not actually export the csv
      it simply gets the resulting mailing information
      from the database with respect to user selection
  */
  export(){
    console.log('calling filterService');
    this.filterService.getCSV(this.countyName.Name, this.zipQuery, this.cityQuery, this.stateQuery,
            this.affiliationQuery, this.townQuery, this.wardQuery,
            this.districtQuery, this.congressionalQuery,
            this.senatorialQuery, this.legislativeQuery,
            this.schoolQuery, this.historyQuery).subscribe(
              (results: Results[]) => {
                this.results = results;
                this.resultCount = this.results.length;
                this.gotResults = true;
              }
            );
  }

  /*
      this function us used to create strings to be sent to the export
      function in order to retreive data from the database
  */
  sendQuery(){
    var count = 0;
    if (this.selectedZipCodes.length > 0){
      for (let selection of this.selectedZipCodes){
        if (count === this.selectedZipCodes.length - 1)
          this.zipQuery = this.zipQuery.concat("'" + selection + "'");
        else
          this.zipQuery = this.zipQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.zipQuery = this.zipQuery.concat('null');
    }
    console.log(this.zipQuery);
    count = 0;
    if (this.selectedCities.length > 0) {
      for (let selection of this.selectedCities){
        if (count === this.selectedCities.length - 1)
          this.cityQuery = this.cityQuery.concat("'" + selection + "'");
        else
          this.cityQuery = this.cityQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.cityQuery = this.cityQuery.concat('null');
    }
    console.log(this.cityQuery);
    count = 0;
    if (this.selectedStates.length > 0) {
      for (let selection of this.selectedStates){
        if (count === this.selectedStates.length - 1)
          this.stateQuery = this.stateQuery.concat("'" + selection + "'");
        else
          this.stateQuery = this.stateQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.stateQuery = this.stateQuery.concat('null');
    }
    console.log(this.stateQuery);
    count = 0;
    if (this.selectedAffiliations.length > 0) {
      for (let selection of this.selectedAffiliations){
        if (count === this.selectedAffiliations.length - 1)
          this.affiliationQuery = this.affiliationQuery.concat("'" + selection + "'");
        else
          this.affiliationQuery = this.affiliationQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.affiliationQuery = this.affiliationQuery.concat('null');
    }
    console.log(this.affiliationQuery);
    count = 0;
    if (this.selectedTowns.length > 0) {
      for (let selection of this.selectedTowns){
        if (count === this.selectedTowns.length - 1)
          this.townQuery = this.townQuery.concat("'" + selection + "'");
        else
          this.townQuery = this.townQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.townQuery = this.townQuery.concat('null');
    }
    console.log(this.townQuery);
    count = 0;
    if (this.selectedWards.length > 0) {
      for (let selection of this.selectedWards){
        if (count === this.selectedWards.length - 1)
          this.wardQuery = this.wardQuery.concat("'" + selection + "'");
        else
          this.wardQuery = this.wardQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.wardQuery = this.wardQuery.concat('null');
    }
    console.log(this.wardQuery);
    count = 0;
    if (this.selectedDistricts.length > 0){
      for (let selection of this.selectedDistricts){
        if (count === this.selectedDistricts.length - 1)
          this.districtQuery = this.districtQuery.concat("'" + selection + "'");
        else
          this.districtQuery = this.districtQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.districtQuery = this.districtQuery.concat('null');
    }
    console.log(this.districtQuery);
    count = 0;
    if (this.selectedCongressional.length > 0) {
      for (let selection of this.selectedCongressional){
        if (count === this.selectedCongressional.length - 1)
          this.congressionalQuery = this.congressionalQuery.concat("'" + selection + "'");
        else
          this.congressionalQuery = this.congressionalQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.congressionalQuery = this.congressionalQuery.concat('null');
    }
    console.log(this.congressionalQuery);
    count = 0;
    if (this.selectedLegislative.length > 0) {
      for (let selection of this.selectedLegislative){
        if (count === this.selectedLegislative.length - 1)
          this.legislativeQuery = this.legislativeQuery.concat("'" + selection + "'");
        else
          this.legislativeQuery = this.legislativeQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.legislativeQuery = this.legislativeQuery.concat('null');
    }
    console.log(this.legislativeQuery);
    count = 0;
    if (this.selectedSenatorial.length > 0) {
      for (let selection of this.selectedSenatorial){
        if (count === this.selectedSenatorial.length - 1)
          this.senatorialQuery = this.senatorialQuery.concat("'" + selection + "'");
        else
          this.senatorialQuery = this.senatorialQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.senatorialQuery = this.senatorialQuery.concat('null');
    }
    console.log(this.senatorialQuery);
    count = 0;
    if (this.selectedSchools.length > 0){
      for (let selection of this.selectedSchools){
        if (count === this.selectedSchools.length - 1)
          this.schoolQuery = this.schoolQuery.concat("'" + selection + "'");
        else
          this.schoolQuery = this.schoolQuery.concat("'" + selection + "', ");
        count = count + 1;
      }
    }
    else {
      this.schoolQuery = this.schoolQuery.concat('null');
    }
    console.log(this.schoolQuery);
    count = 0;
    if ( this.selectedHistories.length > 0){
      for (let selection of this.selectedHistories){
        if (count === this.selectedHistories.length - 1)
          this.historyQuery = this.historyQuery.concat("'" + selection + "'");
        else
          this.historyQuery = this.historyQuery.concat("'" + selection + "', ");
        count = count + 1;
        }
    }
    else{
      this.historyQuery = this.historyQuery.concat('null');
    }

  }

// Settings configuration for multiselects
  mySettings: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };

// Text configuration for multiselects
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };

  private countyName: CountyName
  private sub: any;

  // each field has the same associated arrays
  // zipcodes contains the distinct values from the database
  // zipSelect is used to create drop downs
  // zipModel is used to map user selection to the zipcodes arrays
  // selectedZipCodes is used to contain the selected zipcodes
  // zipQuery is used to construct a string of quote enclosed values
  private zipcodes: Field[] = [];
  private zipSelect: IMultiSelectOption[] = [];
  private zipModel: number[] = [];
  private selectedZipCodes: string[] = [];
  private zipQuery: string = "";

  private cities: Field[] = [];
  private citySelect: IMultiSelectOption[] = [];
  private cityModel: number[] = [];
  private selectedCities: string[] = [];
  private cityQuery : string = "";

  private states: Field[] = [];
  private stateSelect: IMultiSelectOption[] = [];
  private stateModel: number[] = [];
  private selectedStates : string[] = [];
  private stateQuery: string = "";

  private affiliations: Field[] = [];
  private affiliationSelect: IMultiSelectOption[] = [];
  private affiliationModel: number[] = [];
  private selectedAffiliations: string[] = [];
  private affiliationQuery: string = "";

  private towns: Field[] = [];
  private townSelect: IMultiSelectOption[] = [];
  private townModel: number[] = [];
  private selectedTowns: string[] = [];
  private townQuery: string = "";

  private wards: Field[] = [];
  private wardSelect: IMultiSelectOption[] = [];
  private wardModel: number[] = [];
  private selectedWards: string[] = [];
  private wardQuery: string = "";

  private districts: Field[] = [];
  private districtSelect: IMultiSelectOption[] = [];
  private districtModel: number[] = [];
  private selectedDistricts: string[] = [];
  private districtQuery: string = "";

  private congressionalDistricts: Field[] = [];
  private congressionalSelect: IMultiSelectOption[] = [];
  private congressionalModel: number[] = [];
  private selectedCongressional: string[] = [];
  private congressionalQuery: string = "";

  private senatorialDistricts: Field[] = [];
  private senatorialSelect: IMultiSelectOption[] = [];
  private senatorialModel: number[] = [];
  private selectedSenatorial: string[] = [];
  private senatorialQuery: string = "";

  private legislativeDistricts: Field[] = [];
  private legislativeSelect: IMultiSelectOption[] = [];
  private legislativeModel: number[] = [];
  private selectedLegislative: string[] = [];
  private legislativeQuery: string = "";

  private schoolDistricts: Field[] = [];
  private schoolSelect: IMultiSelectOption[] = [];
  private schoolModel: number[] = [];
  private selectedSchools: string[] = [];
  private schoolQuery: string = "";

  private voterHistories: Field[] = [];
  private historySelect: IMultiSelectOption[] = [];
  private historyModel: number[] = [];
  private selectedHistories: string[] = [];
  private historyQuery: string = "";

}
