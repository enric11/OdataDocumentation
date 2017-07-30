import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { OdataReadService } from './odata-read.service';
import { GetOperationComponent } from './get-operation/get-operation.component';
import { PutOperationComponent } from './put-operation/put-operation.component';
import { PostOperationComponent } from './post-operation/post-operation.component';
import { DelOperationComponent } from './del-operation/del-operation.component';
import { MetadataDetailsComponent } from './metadata-details/metadata-details.component';
import { EntityComponent } from './entity/entity.component';


@NgModule({
  declarations: [
    AppComponent,
    GetOperationComponent,
    PutOperationComponent,
    PostOperationComponent,
    DelOperationComponent,
    MetadataDetailsComponent,
    EntityComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    RouterModule.forRoot([
        {
          path: '',
          component: MetadataDetailsComponent
       },
       {
          path: 'get/:entitySet',
          component: GetOperationComponent
       },
       {
          path: 'post',
          component: PostOperationComponent
       },
       {
          path: 'put',
          component: PutOperationComponent
       },
       {
          path: 'del',
          component: DelOperationComponent
       },
    ])
  ],
  providers: [OdataReadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
