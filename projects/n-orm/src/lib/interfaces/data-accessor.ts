import { Observable } from 'rxjs';

export interface DataAccessor {

  get<T>(resourceName: string, ID: number | string): Observable<T>;
  list<T>(resourceName: string, filters?: any): Observable<Array<T>>;
  save<T>(resourceName: string, entity: any, ID?: string | number | null): Observable<T>;
  delete(resourceName: string, ID: number | string): Observable<any>;

}
