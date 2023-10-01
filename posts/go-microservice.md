---
title: 'Microservices With Go'
date: '2023-08-23'
---

**Intro: What is a Microservice?**

In a nutshell microservice is a self-contained piece of software that talks to other applications as part of a larger distributed system.

I tend to think of it like cell. Each individual cell has a job that it performs as part of a larger collection of smaller parts that make up a complex whole. It helps sometimes to use basic examples to structure thinking around the "why" related to doing something like a microservice. There's something very human about this way of thinking about what machines do with the code we write.

This separation of concerns into smaller parts acts, in theory, as a way to better organize functionality, more easily diagnose problems (most of the time), and offers a sense of both extensibility and flexibility as far as repurposing any of the component parts of a system in the event that a refactoring (or a complete teardown) needs to happen.

The question for me then is how much granularity do you want when architecting a series of interconnected services? How small should we go when it comes to encapsulating business logic and exposing endpoints? This is where things get tricky and it really comes down to a matter of experience. A lot of the time, and this probably isn't popular in the software engineering world, but there's definitely a feeling at the gut level that something is amiss when I'm in the middle of trying to solve some problem. 

At the same time though there's no limit on the number of lines of code per microservice, or when there's too many methods or routes. For the most part it's go without the code "smells" or feels. Once you have enough there and the tests are passing, the data is getting created or whatever else needs to happen. In this sense it all depends.


