import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OdataReadService } from '../odata-read.service';

@Component({
  selector: 'app-get-operation',
  templateUrl: './get-operation.component.html',
  styleUrls: ['./get-operation.component.css']
})

export class GetOperationComponent implements OnInit {

	private sub: any;
	entitySetName = "";
  entityName = "";

  entitySet = "";
  entity = "";

  constructor(private route: ActivatedRoute,private oDataService: OdataReadService) { } 

  ngOnInit() {

      /* Get parameters */
  	  this.sub = this.route.params.subscribe(params => {
      		this.entitySetName = params['entitySet']; /* Amb + ho convertim a numeric */
          this.entityName = params['entity']; /* Amb + ho convertim a numeric */

    	});

      this.entitySet = this.oDataService.getEntitySet(this.entitySetName);
      this.entity = this.oDataService.getEntity(this.oDataService.ProjectName+'.'+this.entityName);

  }

  onSubmit = function(odataForm)
  {
    console.log(odataForm);
  }

}
