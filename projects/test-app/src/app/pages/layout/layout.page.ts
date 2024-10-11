import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from 'ngx-breadcrumbs';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  standalone: true,
  imports: [RouterModule, BreadcrumbsComponent, NavBarComponent],
  template: `
  <header class="fixed-top">    
    <app-nav-bar />
    <div class="d-none d-md-block">
      <olt-ngx-breadcrumbs />
    </div>
  </header>
  <div class="app-content">
    <div>
      <router-outlet></router-outlet>
    </div>  
  </div>  
  `,
  styleUrl: './layout.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPage implements OnInit {

  ngOnInit(): void { }

}
