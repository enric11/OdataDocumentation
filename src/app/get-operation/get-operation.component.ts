import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-operation',
  templateUrl: './get-operation.component.html',
  styleUrls: ['./get-operation.component.css']
})
export class GetOperationComponent implements OnInit {

	private sub: any;
	entitySet = "";

  constructor(private route: ActivatedRoute) { } 

  ngOnInit() {
  	    this.sub = this.route.params.subscribe(params => {
      		this.entitySet = params['entitySet']; /* Amb + ho convertim a numeric */
    	});
  }

}
