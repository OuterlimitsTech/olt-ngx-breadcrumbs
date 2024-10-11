# @outerlimitstech/ngx-breadcrumbs

Angular Library for generating breadcrumbs based on the routing state.

This package is a modified fork of original [@exalif/ngx-breadcrumbs](https://github.com/exalif/angular-libs)

_(The old component was lib-breadcrumbs)_



## Usage
```typescript
@Component({
  standalone: true,
  template: `
<header class="fixed-top">  
  <div class="p-1 d-none d-md-block">
    <olt-ngx-breadcrumbs />
  </div>
</header>
<div>
  <router-outlet></router-outlet>
</div>  
  `,  
  imports: [BreadcrumbsComponent],
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent  {
}
```

## Using Html Template
```html
<header class="fixed-top">  
  <div class="p-1 d-none d-md-block">
    <olt-ngx-breadcrumbs />
  </div>
</header>
<div>
  <router-outlet></router-outlet>
</div> 
```


