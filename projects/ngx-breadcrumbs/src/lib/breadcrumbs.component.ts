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
   <ol *ngIf="crumbs().length > 0" class="breadcrumbs__container">
      <li *ngFor="let crumb of crumbs(); let last = last"
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
  private breadcrumbsService = inject(BreadcrumbsService);

  public crumbs = this.breadcrumbsService.crumbs;
}
