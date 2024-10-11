import { Component, inject } from '@angular/core';
import { Breadcrumb } from './models/breadcrumb';
import { Observable } from 'rxjs';
import { BreadcrumbsService } from './services/breadcrumbs.service';
import { BreadcrumbsConfig } from './services';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'olt-ngx-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [
    BreadcrumbsService,
    { 
      provide: BreadcrumbsConfig, 
      useFactory: () => new BreadcrumbsConfig() 
    }    
  ],  
  template: `
   <ol *ngIf="crumbs$ | async as crumbs" class="breadcrumbs__container">
      <li *ngFor="let crumb of crumbs; let last = last"
        [ngClass]="{ 'breadcrumbs__item--active': last }"
        class="breadcrumbs__item"
      >
        <a *ngIf="!last" [routerLink]="crumb.path">{{ crumb.text }}</a>
        <span *ngIf="last">{{ crumb.text }}</span>
      </li>
    </ol>
  `,
  styles: ``
})
export class BreadcrumbsComponent {
  breadcrumbsService = inject(BreadcrumbsService);

  public crumbs$: Observable<Breadcrumb[]> = this.breadcrumbsService.getCrumbs();

  
}
