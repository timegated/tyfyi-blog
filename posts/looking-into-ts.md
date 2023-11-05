---
title: 'Looking into TS'
date: '2021-04-10'
---

Recently I found myself volunteering some time for a skillsharing app written with React and typescript that uses the Ionic framework for cross-platform compatibility. They're also using GraphQL for the backend and frontend data-handling which is also interesting to me as I've mostly stuck to the REST architecture for building out that side of an application. I've chosen to mostly spend my time on the frontend straightening out the CSS using the styled-components library.

This wasn't my first brush with Ionic. Last year a friend was building a mobile app and brought me on to build out the marketing page for it. When he asked me to help him out on the Ionic side of things I took a look at the default tsx files (Ionic automatically generates all it's templates with TS) and shyed away deciding I wasn't quite ready to learn TS at that point since I didn't feel I had a strong enough foundation in Javascript to start learning a superset of the language.

Needless to say I'm in the deepend now with TS as there is currently four weeks until the beta is up for this current application and I've been put in charge of fixing a few bugs with phone verification among others. The learning curve itself has not been too bad but there are some deeper TS concepts at play here with some of the components (concerning asynchronous loading of data). In short I don't always understand why TS is yelling at me and it likes to yell a lot about things that I could normally get away with writing JS. 

A simple example:

```js
function nameAndNumber (name, number) {
  if(typeof name !== 'string' && typeof number !== 'number') {
    return
  }

  return {
    name: name.toUpperCase(),
    number: number * 2
  }
}

```
This is a basic function that takes in a name and a number and returns an object with the capitalized name and a number multiplied by two. The if check here is what really matters, what this does is uses the typeof operator to check the values of the incoming arguments and returns if those values don't match the ones specified in the check. Imagine writing these if checks for every single function being used in a large application in order to add a layer of safety concerning the types of your values.

```ts
function nameAndNumber (name: string, number: number) {
  return {
    name: name.toUpperCase(),
    number: number * 2
  }
}
```

With typescript (once you have everything configured that is), you can declare the type of the parameter within the parenthesis. This negates the need for an if-check for the values of arguments (not to mean this completely removes the need for conditionals). 

Since typescript is a superset of javascript there is a compile step because browsers can only process javascript. The compilation step here is really where the magic happens as far as adding a layer of safety and increaing the reliability of your application. It's here that bugs are caught since if a value doesn't match it's given type an error will be thrown such as if we tried to pass a number to the name parameter.




