import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumb';

export type PostProcessFunction = (crumbs: Breadcrumb[]) => Promise<Breadcrumb[]> | Observable<Breadcrumb[]> | Breadcrumb[];

export type DistinctKey = keyof Breadcrumb;

@Injectable()
export class BreadcrumbsConfig {
  public postProcess: PostProcessFunction | null = null;
  public applyDistinctOn: DistinctKey | null = 'text';

  constructor(options?: BreadcrumbsConfig) {
    this.postProcess = options?.postProcess ?? null;
    this.applyDistinctOn = options?.applyDistinctOn ?? 'text';
  }
}
