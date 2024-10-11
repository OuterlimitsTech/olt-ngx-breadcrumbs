import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Breadcrumb } from '../models/breadcrumb';
import { Observable, of } from 'rxjs';
import { BreadcrumbsUtils } from '../utils/breadcrumbs.utils';

// export const breadcrumbsResolver: ResolveFn<Breadcrumb[]> = (route, state) => {
//   return new Array<Breadcrumb>();
// };


export class BreadcrumbsResolver  {
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb[]> | Promise<Breadcrumb[]> | Breadcrumb[] {

    
    const textData = route.routeConfig?.data != null ? route.routeConfig?.data['text'] : null;
    const breadcrumbData = route.routeConfig?.data != null ? route.routeConfig?.data['breadcrumbs'] : null;

    const path = this.getFullPath(route);

    let text = breadcrumbData != null && typeof(breadcrumbData === 'string') ? breadcrumbData : breadcrumbData?.text ?? textData ?? path;
    text = BreadcrumbsUtils.stringFormat(text, route.data);

    const crumbs: Breadcrumb[] = [{
      text,
      path
    }];

    return of(crumbs);
  }

  public getFullPath(route: ActivatedRouteSnapshot): string {
    return this.fetchFullPath(route.pathFromRoot);
  }

  private fetchFullPath(routes: ActivatedRouteSnapshot[]): string {
    return routes.reduce((path, route) => path += this.fetchRelativePath(route.url), '');
  }

  private fetchRelativePath(urlSegments: UrlSegment[]): string {
    return urlSegments.reduce((path, urlSegment) => path += '/' + urlSegment.path, '');
  }
}

