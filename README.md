<img src="https://user-images.githubusercontent.com/1365728/127748628-47575d74-a2fb-4539-a31e-74d8b435fc21.png" width="30%" >

# @outerlimitstech/ngx-breadcrumbs

Angular Library for generating breadcrumbs based on the routing state.

This package is a modified fork of original [@exalif/ngx-breadcrumbs](https://github.com/exalif/angular-libs)

_(The old component was lib-breadcrumbs)_



## Standalone Usage
```typescript
import { BreadcrumbsComponent } from '@outerlimitstech/ngx-breadcrumbs';

@Component({
  standalone: true,
  imports: [BreadcrumbsComponent, RouterModule],
  template: `
  <header class="fixed-top">    
    <div  class="p-1 d-none d-md-block bg-primary-subtle bg-gradient">
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

## Module Import/Export
```typescript
import { BreadcrumbsComponent } from '@outerlimitstech/ngx-breadcrumbs';

@NgModule({
  declarations: [],
  imports: [
    BreadcrumbsComponent
  ],
  exports: [
    BreadcrumbsComponent
  ]
export class SharedModule { }  
```


## Example scss
```scss

$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;


// scss-docs-start breadcrumb-variables
$breadcrumb-font-size: 12px !default;
$breadcrumb-padding-y: 5px !default;
$breadcrumb-padding-x: 10px !default;
$breadcrumb-item-padding-x: 0.5rem !default;
$breadcrumb-margin-bottom: 1rem !default;
$breadcrumb-bg: $gray-400 !default;
$breadcrumb-divider-color: $gray-600 !default;
$breadcrumb-active-color: $gray-600 !default;
$breadcrumb-item-active-color: $gray-500 !default;
$breadcrumb-divider: quote("/") !default;
$breadcrumb-divider-flipped: $breadcrumb-divider !default;
$breadcrumb-border-radius: 15px !default;
// scss-docs-end breadcrumb-variables


.breadcrumbs__container {
  display: flex;
  flex-wrap: wrap;
  padding: $breadcrumb-padding-y $breadcrumb-padding-x;
  margin-bottom: $breadcrumb-margin-bottom;
  list-style: none;
  background-color: $breadcrumb-bg;
}

.breadcrumbs__item {
  // The separator between breadcrumbs (by default, a forward-slash: "/")
  + .breadcrumbs__item {
    padding-left: $breadcrumb-item-padding-x;

    &::before {
      float: left; // Suppress inline spacings and underlining of the separator
      padding-right: $breadcrumb-padding-x;
      color: $breadcrumb-divider-color;
      content: $breadcrumb-divider;
    }    
  }

  a {
    text-decoration: none;
    color: $gray-800;

    &:hover {
      text-decoration: underline;
    }
  }

  &.active {
    color: $breadcrumb-item-active-color;
    font-weight: bolder;
  }
}

```
