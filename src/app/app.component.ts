import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import { OdataReadService } from './odata-read.service';
import {enableProdMode} from '@angular/core';

//enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

	constructor(){}
}