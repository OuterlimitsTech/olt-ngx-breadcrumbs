import { inject, Injectable, Injector } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbsConfig } from './breadcrumbs.config';
import { BehaviorSubject, concat, distinct, filter, first, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumb';
import { BreadcrumbsUtils } from '../utils/breadcrumbs.utils';
import { BreadcrumbsResolver } from './breadcrumbs.resolver';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
   private defaultResolver = new BreadcrumbsResolver();
   
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private config = inject(BreadcrumbsConfig);
  private injector = inject(Injector);
  
  constructor() { 
    this.initialize();
  }

  private initialize() {
    this.router.events.pipe(
      filter((x) => x instanceof NavigationEnd), // || x['routerEvent'] instanceof NavigationEnd
    ).subscribe(() => {
      const routeRoot = this.router.routerState.snapshot.root;

      this.resolveCrumbs(routeRoot).pipe(
        mergeMap((crumbs: Breadcrumb[]) => crumbs), this.config.applyDistinctOn != null ? distinct((crumb: Breadcrumb) => crumb[this.config.applyDistinctOn!]) : tap(),
        toArray(),
        mergeMap((crumbs: Breadcrumb[]) => {
          if (this.config.postProcess) {
            const postProcessedCrumb = this.config.postProcess(crumbs);
            return BreadcrumbsUtils.wrapIntoObservable<Breadcrumb[]>(postProcessedCrumb).pipe(first());
          } else {
            return of(crumbs);
          }
        })
      ).subscribe((crumbs: Breadcrumb[]) => {
        this.breadcrumbs.next(crumbs);
      });
    });
  }

  get crumbs$(): Observable<Breadcrumb[]> {
    return this.breadcrumbs;
  }

  public getCrumbs(): Observable<Breadcrumb[]> {
    return this.crumbs$;
  }

  private resolveCrumbs(route: ActivatedRouteSnapshot): Observable<Breadcrumb[]> {
    let crumbs$: Observable<Breadcrumb[]>;
    const data = route.routeConfig && route.routeConfig.data;
    const breadcrumbData = data != null ? data['breadcrumbs'] : null;
    
    if (breadcrumbData != null) {
      let resolver: BreadcrumbsResolver;

      if (breadcrumbData.prototype instanceof BreadcrumbsResolver) {
        resolver = this.injector.get(breadcrumbData);
      } else {
        resolver = this.defaultResolver;
      }

      const result = resolver.resolve(route, this.router.routerState.snapshot);
      crumbs$ = BreadcrumbsUtils.wrapIntoObservable<Breadcrumb[]>(result).pipe(first());
    } else {
      crumbs$ = of([]);
    }

    if (route.firstChild) {
      crumbs$ = concat(crumbs$, this.resolveCrumbs(route.firstChild));
    }

    return crumbs$;
  }
  
}
