import { DestroyRef, inject, Injectable, Injector, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbsConfig } from './breadcrumbs.config';
import { concat, distinct, filter, first, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumb';
import { BreadcrumbsUtils } from '../utils/breadcrumbs.utils';
import { BreadcrumbsResolver } from './breadcrumbs.resolver';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  private breadcrumbs = signal<Breadcrumb[]>([]);
  private defaultResolver = new BreadcrumbsResolver();

  private router = inject(Router);
  private config = inject(BreadcrumbsConfig);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.router.events.pipe(
      filter((x) => x instanceof NavigationEnd), // || x['routerEvent'] instanceof NavigationEnd
      takeUntilDestroyed(this.destroyRef)
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
        this.breadcrumbs.set(crumbs);
      });
    });
  }

  public readonly crumbs = this.breadcrumbs.asReadonly();

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
