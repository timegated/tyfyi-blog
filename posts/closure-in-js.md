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