import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
  <h6 class="text-info">nested-page1 works!</h6>
  <div class="mt-4 ms-4">
    <button class="btn btn-outline-danger" routerLink="/page2/nested-page2">Nested Page 2 >>></button>
  </div>
  `,
  styleUrl: './nested-page1.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedPage1Page implements OnInit {

  ngOnInit(): void { }

}
