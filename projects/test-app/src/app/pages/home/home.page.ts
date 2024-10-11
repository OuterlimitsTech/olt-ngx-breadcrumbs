import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: `<h3>Home Page</h3>`,
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {

  ngOnInit(): void { }

}
