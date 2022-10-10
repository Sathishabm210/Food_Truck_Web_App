import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { TruckService } from "../../services/truck.service";
import { ITruck } from "../model/truck";

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Todays food Trucks';
  sub!: Subscription;
  filteredtrucks: ITruck[] = [];
  trucks: ITruck[] = [];
  errorMessage = '';
  imageWidth = 50;
  imageMargin = 2;
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  constructor(private truckService: TruckService) {}

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
        this.trucks = this.filterTrucks(trucks);
        this.filteredtrucks = this.trucks;
      },
      error: err => this.errorMessage = err
    });
  }

  filterTrucks(filtertrucks: any): any {
    return filtertrucks.filter((truck: ITruck) => 
    (truck.availableDate?.toString() === new Date().toISOString().split('T')[0] && 
    this.monthNames.indexOf(truck.publishedMonth) === new Date().getMonth())
  );
  }
}


