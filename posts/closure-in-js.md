---
title: 'Closure in Javascript'
date: '2021-03-08'
---
### Functions with backpacks.

Closure is one of those concepts in Javascript that's both a core component of the language and at the same time kind of tricky and mysterious. I know for me it was a bit intimidating coming at it from a non CS background. Ultimately the best way I learned to use it to my advantage when writing code for the web was to keep implementing it whenever I had the chance until the concept stuck.

So what is closure? Below is a pretty common example used to illustrate what closure is:

```js
const closureFn = () => {
  let count = 0;

  return (() => {count++})
}

const count = closureFn();

count() // 1
count () // 2
```
Essentially it's a characteristic of functions that "remember" the previous value that lives within the scope of the outer function. There are two functions being created here and what you're assigning to the count variable below the function is the return value of closureFn.

So why is this powerful? 

Closure is powerful for a variety of reasons (depending on your use-case) but one thing it does provide is the ability to avoid polluting the global scope. It helps to keep your programs "clean" in that you can have functions with specific values you're performing operations on which gives you the ability to more easily trace values in your program (also why it's important to have good naming conventions for what your functions do).

Closure is one of those concepts that people find kind of unapproachable and intimidating at first and even if you find yourself avoiding it you can find yourself using it everyday without even realizing it. Take the React library for example. 

With the shift to using functional components, and when I started using them myself in my own applications, I realized at some point that I was using closure and functional programming concepts (or trying to at least) without even knowing it. Let's take a look at an example:

```js
const SomeComponentWithState = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
    <h1>{count}</h1>
    <button onClick={() => setCount(count++)}>Click Me</button>
    </div>
  )
};
```

What we have here is very simliar to the example in plain JS earlier. The only difference is that this is a react component that is pulling in different functions, or hooks, to gain access to different features of the React Library. Essentially what this returns is JSX, which is basically HTML disguised at Javascript and a locally managed state scoped to the component that can be incremented by an onClick event that fires a second function that updates that state. The values that are contained within this component are closed-over essentially and have no access to the outside scope which also means that no other code from the outside can affect any value inside this function.

This is one of the foundational ideas behind React and it's component architecture for creating user interfaces and closure is one of those foundational concepts of JS that makes it possible.