Bug: Angular doesn't call ngOnDestroy on services, when some `APP_INITIALIZER` rejects a result Promise.

Usage:

1. in one terminal run `npm run watch`
2. in another terminal run `npm run dev:ssr`
3. [HAPPY PATH - no memory leak] in the third terminal run `curl http://localhost:4000/?success` and verify the second terminal prints:

```
Angular is running in development mode.
MyService pending interval: 1s
MyService pending interval: 2s
MyService pending interval: 3s
3s setTimeout passed in AppComponent. Now app is stable.
```

4. [UNHAPPY PATH - memory leak] in the third terminal run `curl http://localhost:4000/?fail` and verify the second terminal prints:

```
ERROR Error: SPIKE ERROR
  (...stacktrace here...)
MyService pending interval: 1s
MyService pending interval: 2s
MyService pending interval: 3s
MyService pending interval: 4s
MyService pending interval: 5s
(...increasing forever...)
```

...which proves a memory leak happened.
