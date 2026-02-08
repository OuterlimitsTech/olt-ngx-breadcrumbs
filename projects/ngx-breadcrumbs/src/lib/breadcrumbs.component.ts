import { Component, inject } from '@angular/core';
import { BreadcrumbsService } from './services/breadcrumbs.service';
import { BreadcrumbsConfig } from './services';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'olt-ngx-breadcrumbs',
    imports: [CommonModule, RouterModule],
    providers: [
        BreadcrumbsService,
        {
            provide: BreadcrumbsConfig,
            useFactory: () => new BreadcrumbsConfig()
        }
    ],
    template: `
   @if (crumbs().length > 0) {
     <ol class="breadcrumbs__container">
       @for (crumb of crumbs(); track crumb; let last = $last) {
         <li
           [ngClass]="{ 'breadcrumbs__item--active': last }"
           class="breadcrumbs__item"
           >
           @if (!last) {
             <a [routerLink]="crumb.path">{{ crumb.text }}</a>
           }
           @if (last) {
             <span>{{ crumb.text }}</span>
           }
         </li>
       }
     </ol>
   }
   `,
    styles: ``
})
export class BreadcrumbsComponent {
  private breadcrumbsService = inject(BreadcrumbsService);

  public crumbs = this.breadcrumbsService.crumbs;
}
