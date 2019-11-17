import { Injectable } from '@angular/core';

import { IAssociation } from './../decorators/association.decorator';
import { EntityHelperService } from './entity-helper.service';
import { EntityManagerService } from './entity-manager.service';

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

  public getRelatedEntitiesObservables(em: EntityManagerService, entity: any): any {

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

}
