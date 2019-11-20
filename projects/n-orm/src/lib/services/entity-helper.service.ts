import { Injectable, Inject } from '@angular/core';
import { OrmOptions } from './../interfaces/orm-options';
import { DATA_ACCESS_SERVICE_OPTIONS } from './../n-orm.module';

@Injectable({
  providedIn: 'root'
})
export class EntityHelperService {

  constructor(
    @Inject(DATA_ACCESS_SERVICE_OPTIONS) private ormOptions: OrmOptions,
  ) { }

  public createInstanceWithModel(model: any, data: any) {

    return new model(data);

  }

  public getEntityID(entity: any): number | string | null {

    const association = this.getAssociations(entity);
    return association.referencedPropertyName || entity[this.ormOptions.entityPKName] || null;

  }

  public getAssociations(model: any) {

    return model._associations || [];

  }

  public getEntityParams(model: any) {

    return model._entityParams;

  }

}
