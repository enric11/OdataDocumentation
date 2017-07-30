import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

import { OdataReadService } from '../odata-read.service';
import {enableProdMode} from '@angular/core';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],

})
export class EntityComponent implements OnInit {

  constructor( private oDataService: OdataReadService ) { }

  @Input() entity;

  ngOnInit() {

  }

}
