import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { DataAccessService } from './data-access.service';
import { EntityHelperService } from './entity-helper.service';
import { EntityMappingService } from './entity-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class EntityManagerService {

  constructor(
    private dataAccessService: DataAccessService,
    private entityHelperService: EntityHelperService,
    private entityMappingService: EntityMappingService,
  ) { }

  list(model: any, filters?: any): Observable<any[]> {

    const entityParams = this.entityHelperService.getEntityParams(model);
    return this.dataAccessService.list<any[]>(entityParams.resourceName, filters)
      .pipe(
        map((entities: Array<any>) => entities.map(entity => this.entityHelperService.createInstanceWithModel(model, entity))),
        switchMap((entities: Array<any>) => forkJoin(entities.map(entity => this.extendObjectWithRelateds(entity)))),
      );

  }

  get(model: any, ID: number | string): Observable<any> {

    const entityParams = this.entityHelperService.getEntityParams(model);
    return this.dataAccessService.get<any>(entityParams.resourceName, ID)
      .pipe(
        map(entity => this.entityHelperService.createInstanceWithModel(model, entity)),
        switchMap(entity => this.extendObjectWithRelateds(entity))
      );

  }

  save(entity: any): Observable<any> {

    const entityParams = this.entityHelperService.getEntityParams(entity.constructor);
    return this.dataAccessService.save<any>(entityParams.resourceName, entity, this.entityHelperService.getEntityID(entity));

  }

  delete(entity: any): Observable<any> {

    const entityParams = this.entityHelperService.getEntityParams(entity.constructor);
    return this.dataAccessService.delete(entityParams.resourceName, this.entityHelperService.getEntityID(entity));

  }

  extendObjectWithRelateds(entity: any) {

    return forkJoin({
      _entity: of(entity),
      ...this.entityMappingService.getRelatedEntitiesObservables(this, entity),
    }).pipe(
      map(({_entity, ...relateds}: any) => Object.assign(_entity, relateds))
    );

  }

}
