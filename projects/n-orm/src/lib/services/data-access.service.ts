import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { OrmOptions } from './../interfaces/orm-options';
import { DataAccessor } from './../interfaces/data-accessor';

export function dataAccessFactory(options: OrmOptions, injector: Injector) {

  const dataAccessorServiceInstance = injector.get(options.dataAccessor);
  return new DataAccessService(dataAccessorServiceInstance);

}

export class DataAccessService {

  constructor(
    private dataAccessor: DataAccessor,
  ) { }

  get<T>(resourceName: string, ID: number | string): Observable<T> {

    return this.dataAccessor.get<T>(resourceName, ID);

  }

  list<T>(resourceName: string, filters?: any): Observable<Array<T>> {

    return this.dataAccessor.list<T>(resourceName, filters || {});

  }

  save<T>(resourceName: string, entity: any, ID: string | number | null): Observable<T> {

    return this.dataAccessor.save<T>(resourceName, ID, entity);

  }

  delete(resourceName: string, ID: number | string): Observable<any> {

    return this.dataAccessor.delete(resourceName, ID);

  }

}
