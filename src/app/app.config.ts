import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

import { Location } from '@angular/common';
import { MyService } from './my.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),

    /**
     * APP_INITIALIZER with a logic for demonstration purposes.
     *
     * a) This APP_INITIALIZER rejects a result Promise, if the URL ends with '?fail'.
     *    When APP_INITIALIZER Promise is rejected, Angular is supposed to consider
     *    the whole SSR as failed.
     * b) If the URL doesn't end with 'fail', it resolves a promise successfully.
     */
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        inject(MyService); // injecting service causes calling its constructor which allocates resources

        const path = inject(Location).path();

        return () =>
          new Promise((resolve, reject) => {
            if (path.endsWith('?fail')) {
              reject(new Error('SPIKE ERROR'));
            } else {
              resolve(null);
            }
          });
      },
    },
  ],
};
