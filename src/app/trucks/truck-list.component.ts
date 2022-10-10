import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ITruck } from "../model/truck";
import { TruckService } from "../../services/truck.service";

@Component({
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit, OnDestroy {
  pageTitle = 'Food Truck List';
  imageWidth = 50;
  imageMargin = 2;
  showAddButton = true;
  showUpdateButton = false;
  errorMessage = '';
  sub!: Subscription;
  truckId=0;
  truckName = null;
  publishedMonth = null;
  availableDate = null;
  filteredtrucks: ITruck[] = [];
  trucks: ITruck[] = [];

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredtrucks = this.performFilter(value);
  }

  
  constructor(private truckService: TruckService) {}

  performFilter(filterBy: string): ITruck[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.trucks.filter((truck: ITruck) =>
    truck.truckName.toLocaleLowerCase().includes(filterBy));
  }


  ngOnInit(): void {
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event: any) {
        if (!form?.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })

    this.getTrucks();
  }

  getTrucks(){
    this.sub = this.truckService.getTrucks().subscribe({
      next: trucks => {
        this.trucks = trucks;
        this.filteredtrucks = this.trucks;
      },
      error: err => this.errorMessage = err
    });
  }

  createTruck(form: any): void {
   let truck: ITruck = {
    truckName: form.value.inputTruckName,
    publishedMonth: form.value.inputMonth,
    availableDate: form.value.inputAvailableDate
   }
   if(truck.truckName) {
    this.sub = this.truckService.createTruck(truck).subscribe({
      next: (trucks) => {
        this.trucks = trucks;
        this.filteredtrucks = this.trucks;
        this.getTrucks();
        form.reset();
      },
      error: err => this.errorMessage = err
    });
   }
  }

  editTruck(selectedItem: any): void{
    this.showAddButton = false;
    this.showUpdateButton = true;
    this.truckName = selectedItem.truckName;
    this.publishedMonth = selectedItem.publishedMonth;
    this.availableDate= selectedItem.availableDate;
    this.truckId = selectedItem.id;
  }

  updateTruck(form: any): void{
    this.showAddButton = true;
    this.showUpdateButton = false;
    let truck: ITruck = {
      id: this.truckId,
      truckName: form.value.inputTruckName,
      publishedMonth: form.value.inputMonth,
      availableDate: form.value.inputAvailableDate
     }
     if(truck.truckName) {
      this.sub = this.truckService.updateTruck(truck).subscribe({
        next: (trucks) => {
          this.trucks = trucks;
          this.filteredtrucks = this.trucks;
          this.getTrucks();
          form.reset();
        },
        error: err => this.errorMessage = err
      });
     }
  }

  clearForm(){

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
