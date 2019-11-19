import { Injectable } from '@angular/core';

import { EntityHelperService } from './entity-helper.service';
import { EntityManagerService } from './entity-manager.service';
import { IAssociation } from '../interfaces';

import { forkJoin } from 'rxjs';
import { map, switchMap, defaultIfEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntityMappingService {

  constructor(
    private entityHelperService: EntityHelperService,
  ) { }

  public getSaveRelatedEntitiesObservables(em: EntityManagerService, entity: any): any {

    const associationsObservables = {};
    const associations = this.entityHelperService.getAssociations(entity);

    associations.forEach((association: IAssociation) => {

      switch (association.type) {

        case 'OneToOne':

          associationsObservables[association.propertyName] = em.get(association.targetEntity, entity[association.joinPropertyName]);

          break;

        case 'OneToMany':

          associationsObservables[association.propertyName] = em.list(association.targetEntity, {
            [association.joinPropertyName]: this.entityHelperService.getEntityID(entity)
          });

          break;

      }

    });

    return associationsObservables;

  }

  public getReadRelatedEntitiesObservables(em: EntityManagerService, entity: any): any {

    const associationsObservables = {};
    const associations = this.entityHelperService.getAssociations(entity);

    associations.forEach((association: IAssociation) => {

      switch (association.type) {

        case 'OneToOne':

          associationsObservables[association.propertyName] = em.get(association.targetEntity, entity[association.joinPropertyName]);

          break;

        case 'OneToMany':

          associationsObservables[association.propertyName] = em.list(association.targetEntity, {
            [association.joinPropertyName]: this.entityHelperService.getEntityID(entity)
          });

          break;

        case 'ManyToMany':

          associationsObservables[association.propertyName] = em.list(association.mappingEntity, {
            [association.joinPropertyName]: this.entityHelperService.getEntityID(entity)
          }).pipe(
            map((items: any[]) => items.map(item => em.get(association.targetEntity, item[association.inverseJoinPropertyName]))),
            switchMap(itemsObservables => forkJoin(itemsObservables)),
            defaultIfEmpty([]),
          );

          break;

      }

    });

    return associationsObservables;

  }

}
