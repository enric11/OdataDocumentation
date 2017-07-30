import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import { Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/toPromise';
import {Parser} from 'xml2js'

@Injectable()
export class OdataReadService {

	httpServ;
	ProjectName = "";
	Associations = [];
	Functions = [];
	EntitySets = [];
	Entity = [];
	odataUrl = "../../../../opu/odata/sap/";
	url = "assets/data/ERP/allinone.xml";

  	constructor(private http: Http) { 

    this.getHttpMetadata(this.url);
   };


/************ get metadata info from backend ************/
  getMetadata(inputForm){

  	this.EntitySets = [];
  	this.Entity = [];
  	this.Associations = [];
  	this.Functions = [];
  	this.ProjectName = inputForm.url;
  	this.url = this.odataUrl+inputForm.url+"/$metadata?sap-documentation=all";
  	//this.url = "/assets/data/ERP/"+inputForm.url;
 	//this.url = inputForm.url;
  	this.getHttpMetadata(this.url);

  }

/************ get metadata info from backend ************/
  getHttpMetadata(url){

      var EntitySetsReaded = [];
      var EntityReaded = [];
      var AssociationsReaded = [];
      var FunctionsReaded = [];
      var nameSpace;
      var entityName = "";

       var result = this.http.get(url)
      .toPromise()
      .then(
        res => { 
          	// Get metadata information
			var parser = new Parser();
			parser.parseString(res["_body"], function (err, result) {

				// Get all entityes SET
				EntitySetsReaded = result["edmx:Edmx"]["edmx:DataServices"][0]["Schema"][0]["EntityContainer"][0]["EntitySet"];	

				// Get all entities
				EntityReaded = result["edmx:Edmx"]["edmx:DataServices"][0]["Schema"][0]["EntityType"];

				// Get name space
				nameSpace = result["edmx:Edmx"]["edmx:DataServices"][0]["Schema"][0]["$"]["Namespace"];

				// Get Associations
				AssociationsReaded = result["edmx:Edmx"]["edmx:DataServices"][0]["Schema"][0]["Association"];

				//Get functions
				FunctionsReaded = result["edmx:Edmx"]["edmx:DataServices"][0]["Schema"][0]["EntityContainer"][0]["FunctionImport"];

			});

			/* Prepare date with all entities */
			for (let entity of EntityReaded) {				

				var entityDetail = [];

				/* Get keys of entity */
				for (let fieldsEntity of entity["Property"]) {
					fieldsEntity["$"]["Key"] = false;
					for (let entityKey of entity["Key"][0]["PropertyRef"]) {

						if (entityKey["$"]["Name"] === fieldsEntity["$"]["Name"]) { 
							fieldsEntity["$"]["Key"] = true;
							break; 
						}
					}
				}

				entityDetail["Name"] = entity["$"];
				entityDetail["Property"] = entity["Property"];

				this.Entity[nameSpace+"."+entity["$"]["Name"]]= entityDetail; 
			}


			/* Prepare date with all entities SET */
			for (let entitySet of EntitySetsReaded) {
				 //Add entity into array
				 var entitySetDetail = [];

				 entitySetDetail = entitySet;
				 entitySetDetail["Entity"] = entitySet["$"]["EntityType"];
				 entitySetDetail["EntityInfo"] = this.Entity[entitySet["$"]["EntityType"]];

				 this.EntitySets.push(entitySetDetail);
			}

			/* Prepare date with all for associations */
			for (let association of AssociationsReaded) {
				var assosiationDetail = []; 

				assosiationDetail["From"] = this.Entity[association["End"][0]["$"]["Type"]];
				assosiationDetail["From"]["Entity"] = association["End"][0]["$"]["Type"];
				assosiationDetail["From"]["Cardinality"] = association["End"][0]["$"]["Multiplicity"]; 
				assosiationDetail["To"] = this.Entity[association["End"][1]["$"]["Type"]];
				assosiationDetail["To"]["Entity"] = association["End"][1]["$"]["Type"];
				assosiationDetail["To"]["Cardinality"] = association["End"][1]["$"]["Multiplicity"]; 
				assosiationDetail["Definition"] = association["$"];		
				
				this.Associations.push(assosiationDetail);
				
			}

			for (let functionDetail of FunctionsReaded) {
				var functionDetailObject = [];
				functionDetailObject["Definition"] = functionDetail["$"];

				
				if(functionDetailObject["Definition"]["ReturnType"].search("Collection") != -1 ){
									
					entityName = functionDetailObject["Definition"]["ReturnType"].substring(11, (functionDetailObject["Definition"]["ReturnType"].length - 1));

					functionDetailObject["Definition"]["ReturnType"] = entityName;
					functionDetailObject["Definition"]["ReturnType_collection"] = "X";

				}
				

				functionDetailObject["Parameter"] = functionDetail["Parameter"];
				functionDetailObject["outputEntity"] = this.Entity[functionDetail["$"]["ReturnType"]];

				this.Functions.push(functionDetailObject);
			}

			/* Get expands with entitySet and association */
			for (let EntitySetExpands of this.EntitySets){
			var expands = [];
				for (let associationExpand of this.Associations) {
					if(EntitySetExpands["$"]["EntityType"] === associationExpand["From"]["Entity"]){
						expands.push(associationExpand["Definition"]["Name"]);
						EntitySetExpands["expands"] = expands;
					}
				}
			}

			console.log("================ Entity ====================");
			console.log(this.Entity);
			console.log("================ EntitySet==================");
			console.log(this.EntitySets);
			console.log("================ Associations ==============");
			console.log(this.Associations);
			console.log("================ Functions ==============");
			console.log(this.Functions);

			/* console.log(this.getEntity("ZALLINONE_SRV.Notification")); */

        }
      );

  }

  getEntity(entityName){
  	return this.Entity[entityName];
  }

   /************ Show button ************************/
  showDetails(idDetail){
	  	if (document.getElementById(idDetail+"_detail").className === "elementHidden"){
	  		document.getElementById(idDetail+"_detail").className = "elementShow";
	  		document.getElementById(idDetail+"_butDetail").innerHTML = "Hidde fields";
	  		
	  	}else { 
   			document.getElementById(idDetail+"_detail").className = "elementHidden";
   			document.getElementById(idDetail+"_butDetail").innerHTML = "Show fields";
		} 
  }

 showDetailsAss(idDetail){
	  	if (document.getElementById(idDetail+"_Ass_detail").className === "elementHidden"){
	  		document.getElementById(idDetail+"_Ass_detail").className = "elementShow";
	  		document.getElementById(idDetail+"_butDetailAss").innerHTML = "Hidde fields";
	  		
	  	}else { 
   			document.getElementById(idDetail+"_Ass_detail").className = "elementHidden";
   			document.getElementById(idDetail+"_butDetailAss").innerHTML = "Show fields";
		} 
  }

  showDetailsFun(idDetail){
	  	if (document.getElementById(idDetail+"_Fun_detail").className === "elementHidden"){
	  		document.getElementById(idDetail+"_Fun_detail").className = "elementShow";
	  		document.getElementById(idDetail+"_butDetailFun").innerHTML = "Hidde fields";
	  		
	  	}else { 
   			document.getElementById(idDetail+"_Fun_detail").className = "elementHidden";
   			document.getElementById(idDetail+"_butDetailFun").innerHTML = "Show fields";
		} 
  }

  showDetailsAssEntFrom(idDetail){
	  	if (document.getElementById(idDetail+"_DetailAssEntityFrom").className === "elementHidden"){
	  		document.getElementById(idDetail+"_DetailAssEntityFrom").className = "elementShow";
	  		document.getElementById(idDetail+"_butDetailAssEntityFrom").innerHTML = "Hidde fields";
	  		
	  	}else { 
   			document.getElementById(idDetail+"_DetailAssEntityFrom").className = "elementHidden";
   			document.getElementById(idDetail+"_butDetailAssEntityFrom").innerHTML = "Show fields";
		} 
  }

    showDetailsAssEntTo(idDetail){
	  	if (document.getElementById(idDetail+"_DetailAssEntityTo").className === "elementHidden"){
	  		document.getElementById(idDetail+"_DetailAssEntityTo").className = "elementShow";
	  		document.getElementById(idDetail+"_butDetailAssEntityTo").innerHTML = "Hidde fields";
	  		
	  	}else { 
   			document.getElementById(idDetail+"_DetailAssEntityTo").className = "elementHidden";
   			document.getElementById(idDetail+"_butDetailAssEntityTo").innerHTML = "Show fields";
		} 
  }



 /************ Top button ************************/
 	topButton(){
 		document.body.scrollTop = 0;
 	}

 /************ Button ejecute actions ************/
	get(entitySetName){
		var urlEntitySet = "";
		urlEntitySet = this.odataUrl+this.ProjectName+'/'+entitySetName;

		var win = window.open(urlEntitySet, '_blank');
 		win.focus();

	}

	post(entitySetName){
		console.log("post:" + entitySetName)
	}  
	update(entitySetName){
		console.log("update:" + entitySetName)
	}  
	delete(entitySetName){
		console.log("delete:" + entitySetName)
	}   

	isMethodImplemented(operation){
	  var result;
	  
	  result = this.http.get("");
      result.toPromise()
      .then(
        res => { 
          	// Get metadata information
			var parser = new Parser();
			parser.parseString(res["_body"], function (err, result) {
				if(result["error"] != undefined){
					if(result["error"]["code"][0]==='/IWBEP/CM_MGW_RT/021'){
						console.log("Error");
					}
				}
			});
			}
      	);
	}

}
