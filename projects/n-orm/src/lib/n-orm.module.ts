import { NgModule, ModuleWithProviders, InjectionToken, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OrmOptions } from './interfaces/orm-options';
import { DataAccessService, dataAccessFactory } from './services/data-access.service';

export const DATA_ACCESS_SERVICE_OPTIONS = new InjectionToken<OrmOptions>('forRoot() DataAccessorService configuration.');

@NgModule({
  imports: [
    HttpClientModule,
  ],
})
export class NOrmModule {
  static forRoot(options: OrmOptions): ModuleWithProviders {
    return {
      ngModule: NOrmModule,
      providers: [
        {
          provide: DATA_ACCESS_SERVICE_OPTIONS,
          useValue: options
        },
        {
          provide: DataAccessService,
          useFactory: dataAccessFactory,
          deps: [DATA_ACCESS_SERVICE_OPTIONS, Injector]
        },
      ]
    };
  }
}
