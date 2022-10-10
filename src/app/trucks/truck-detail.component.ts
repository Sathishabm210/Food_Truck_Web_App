import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITruck } from '../model/truck';
import { TruckService } from '../../services/truck.service';

@Component({
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.css']
})
export class TruckDetailComponent implements OnInit {
  pageTitle = 'Food Truck Details';
  errorMessage = '';
  truck: ITruck | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private truckService: TruckService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getTruck(id);
    }
  }

  getTruck(id: number): void {
    this.truckService.getTruck(id).subscribe({
      next: truck => this.truck = truck,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/trucks']);
  }
}
