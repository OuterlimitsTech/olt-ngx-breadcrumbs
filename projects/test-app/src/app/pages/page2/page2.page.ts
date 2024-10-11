import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
  <h4>page2 Header</h4>
  <div class="mt-3">
  <router-outlet></router-outlet>
  </div>
  `,
  styleUrl: './page2.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page2Page implements OnInit {

  ngOnInit(): void { }

}
