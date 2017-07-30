import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

import { OdataReadService } from '../odata-read.service';
import {enableProdMode} from '@angular/core';

@Component({
  selector: 'app-metadata-details',
  templateUrl: './metadata-details.component.html',
  styleUrls: ['./metadata-details.component.css']
})
export class MetadataDetailsComponent implements OnInit {

  constructor(private oDataService: OdataReadService ){}

  	ngOnInit() {
  
  	}

	onSubmit = function(odataForm)
	{
		this.oDataService.getMetadata(odataForm);
	}


}
