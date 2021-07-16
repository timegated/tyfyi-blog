---
title: 'Syncing State with Recoil'
date: '2021-07-14'
---
Recoil is a realtively new state management library for react that aims to act as an alternative to something like redux, mobx, and React's own context API.

We've recently started using for a project I'm working on and I've been tasked with storing and syncing the state of the entire application to sessionStorage in order to maintain offline functionality.

The first method I encountered involved setting the session state with a custom hook and then using the useEffect hook twice in order to set sync the components state with sessionStorage each time it rendered. 

The problem with this is a screen flash that occurs since on each render the state of the component is set back to it's initial state and then re-rendered when the value is then set via useEffect from sessionStorage.

```js
const someStateAtom = atom({
  key:'someStateAtom',
  default: '',
});

// Then in your component you would import the above
import { someStateAtom } from './somewhere/store/atoms'

const SomeComponent = () => {
  const [someSession, setSomeSession] = React.useState(sessionStorage.get('sessionValue')); // Pull from sessionStorage
  const [someState, setSomeState] = useRecoilState(gameStateAtom); // Recoil state

  React.useEffect(() => {
    setSomeState(someSession); // We set the state here to whatever is pulled out of sessionStorage
  }, []);

  React.useEffect(() => { // We set the session here everytime the state changes
    setSomeSession(someState);
  }, [someState]);

  return (
    <div>{someState}</div>
  )
}

```

To prevent this screen flash I had to look for another option. Recoil itself comes with the effect_UNSTABLE which is basically Recoil's version of useEffect. The UNSTABLE part after the underscore doesn't necessarily mean that all hell is going to break loose if you use this feature; it just means that the developers behind Recoil are at some point going to push updates to this specific part of Recoil's API and possibly change the way it's implemented.

Until this happens, if it changes at all, it serves as a pretty nice way to persist a user's state in sessionStorage (or any other storage API that comes with the browser) since one of the main things it does is set's the state of the component outside of the component before a re-render. It's an effect inherent to recoil instead of using something like useEffect to set the state the component needs. This eliminates the page flashing back to it's initial state before retrieving the value from sessionStorage.

What someone has to do to use the effects_UNSTABLE API is write a function that lives outside of the atom and then include it as a dependency inside of an array as a property of effects_UNSTABLE. This means that the atom will keep track of it's own state and check itself for any changes or if it needs to have a different state value before the component renders.

This is one of the reasons why Recoil is so powerful (and simple).

```js
import { ReactSession } from 'react-client-session'; // Import whatever library you're using for browser storage (not required)

const sessionStorageEffect = key => ({ setSelf, onSet }) => {
  const sessionValue = ReactSession.get(key);
  if (sessionValue != null) {
    setSelf(sessionValue);
  }
  onSet(newValue => {
    ReactSession.set(key, newValue);
  });
};

// In wherever your atoms live

const someStateAtom = atom({
  key: 'someState',
  default: [],
  effects_UNSTABLE: [
    sessionStorageEffect('key') // Equivalent to use effect in a component but lives outside of of a React component
  ]
})
```