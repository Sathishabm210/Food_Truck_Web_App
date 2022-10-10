import { NgModule } from '@angular/core';
import { TruckListComponent } from './truck-list.component';
import { TruckDetailComponent } from './truck-detail.component';
import { RouterModule } from '@angular/router';
import { TruckDetailGuard } from './truck-detail.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    TruckListComponent,
    TruckDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: 'trucks', component: TruckListComponent },
      {
        path: 'trucks/:id',
        canActivate: [TruckDetailGuard],
        component: TruckDetailComponent
      }
    ]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TruckModule { }
