import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: `<p>page1 works!</p>`,
  styleUrl: './page1.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page1Page implements OnInit {

  ngOnInit(): void { }

}
