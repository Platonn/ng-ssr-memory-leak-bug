import { inject, Injectable, NgZone } from '@angular/core';
import { interval, Subscription } from 'rxjs';

/**
 * In constructor, it allocates resources that should be teared down in ngOnDestroy.
 * If ngOnDestroy is not called, it will lead to a memory leak.
 *
 * Angular is supposed to call `ngOnDestroy` on this service, when the `PlatformRef`
 * is destroyed (e.g. when the SSR is considered finished).
 */
@Injectable({ providedIn: 'root' })
export class MyService {
  private sub = new Subscription();
  private ngZone = inject(NgZone);

  constructor() {
    // We're running the interval outside the NgZone to not count this pending async task
    // as render-blocking.
    // Otherwise the app would never become stable and the SSR would never be considered finished.
    this.ngZone.runOutsideAngular(() => {
      this.sub = interval(1_000).subscribe((i) =>
        console.log(`MyService pending interval: ${i + 1}s`)
      );
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
