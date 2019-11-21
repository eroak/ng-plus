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

          // This part is used to get entities from PK or from another key if specified (referencedPropertyName)
          if (association.referencedPropertyName) {
            associationsObservables[association.propertyName] = em.list(association.targetEntity, {
              [association.referencedPropertyName]: entity[association.joinPropertyName]
            }).pipe(
              map((entities: any[]) => entities.shift())
            );
          } else {
            associationsObservables[association.propertyName] = em.get(association.targetEntity, entity[association.joinPropertyName]);
          }

          break;

        case 'OneToMany':

          associationsObservables[association.propertyName] = em.list(association.targetEntity, {
            [association.joinPropertyName]: association.referencedPropertyName
            ? entity[association.referencedPropertyName]
            : this.entityHelperService.getEntityID(entity)
          });

          break;

        case 'ManyToMany':

          associationsObservables[association.propertyName] = em.list(association.mappingEntity, {
            [association.joinPropertyName]: association.referencedPropertyName
            ? entity[association.referencedPropertyName]
            : this.entityHelperService.getEntityID(entity)
          }).pipe(
            map((items: any[]) => items.map(item => {
              // This part is used to get entities from PK or from another key if specified (inverseReferencedPropertyName)
              if (association.inverseReferencedPropertyName) {
                em.list(association.targetEntity, {
                  [association.inverseReferencedPropertyName]: entity[association.inverseJoinPropertyName]
                }).pipe(
                  map((entities: any[]) => entities.shift())
                );
              } else {
                return em.get(association.targetEntity, item[association.inverseJoinPropertyName]);
              }
            })),
            switchMap(itemsObservables => forkJoin(itemsObservables)),
            defaultIfEmpty([]),
          );

          break;

      }

    });

    return associationsObservables;

  }

}
