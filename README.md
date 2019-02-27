It will give you an error because react-cache hasn't been released to be compatible with newer React.Suspense.
The solution is https://github.com/facebook/react/issues/14575
tldr;
If you just want to run the program in the development env, you can modify the code in 'react-cache/cjs/react-cache.development.js' by yourself:
old:

```
var currentOwner = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;

function readContext(Context, observedBits) {
  var dispatcher = currentOwner.currentDispatcher;
  if (dispatcher === null) {
    throw new Error('react-cache: read and preload may only be called from within a ' + "component's render. They are not supported in event handlers or " + 'lifecycle methods.');
  }
  return dispatcher.readContext(Context, observedBits);
}
```
'currentOwner' is no use except in function readContext. so here is the new:

```
var currentDispatcher = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;

function readContext(Context, observedBits) {
  var dispatcher = currentDispatcher.current;
  if (dispatcher === null) {
    throw new Error('react-cache: read and preload may only be called from within a ' + "component's render. They are not supported in event handlers or " + 'lifecycle methods.');
  }
  return dispatcher.readContext(Context, observedBits);
}
```
