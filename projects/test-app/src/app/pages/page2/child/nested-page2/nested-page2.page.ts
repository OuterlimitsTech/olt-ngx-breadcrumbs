import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
  <h6 class="text-danger">nested-page2 works!</h6>
  <div class="mt-4 ms-4">
    <button class="btn btn-secondary" routerLink="/page2/nested-page1"><<< Back to Nested Page 1</button>
  </div>
  `,
  styleUrl: './nested-page2.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedPage2Page implements OnInit {

  ngOnInit(): void { }

}
