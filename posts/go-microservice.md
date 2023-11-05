---
title: 'Microservices With Go'
date: '2023-08-23'
---

**Intro: What is a Microservice?**

In a nutshell microservice is a self-contained piece of software that talks to other applications as part of a larger distributed system. In other words it's basically the idea of composable backend services that "talk" to each other to achieve a certain objective, usually a business objective.

I tend to think of it like cell. Each individual cell has a job that it performs as part of a larger collection of smaller parts that make up a complex whole. It helps sometimes to use basic examples to structure thinking around the "why" related to doing something like a microservice. There's something very human about this way of thinking about what machines do with the code we write.

This separation of concerns into smaller parts acts, in theory, as a way to better organize functionality, more easily diagnose problems (most of the time), and offers a sense of both extensibility and flexibility as far as repurposing any of the component parts of a system in the event that a refactoring (or a complete teardown) needs to happen.

The question for me then is how much granularity do you want when architecting a series of interconnected services? How small should we go when it comes to encapsulating business logic and exposing endpoints? This is where things get tricky and it really comes down to a matter of experience. A lot of the time, and this probably isn't popular in the software engineering world, but there's definitely a feeling at the gut level that something is amiss when I'm in the middle of trying to solve some problem. 

At the same time though there's no limit on the number of lines of code per microservice, or when there's too many methods or routes. For the most part it's go without the code "smells" or feels. Once you have enough there and the tests are passing, the data is getting created or whatever else needs to happen. In this sense it all depends.

Example of a simple webserver written in go using gin, a library that contains abstractions for setting up the logic of a server.


```go
package simple

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

// album represents data about a record album.
type album struct {
    ID     string  `json:"id"`
    Title  string  `json:"title"`
    Artist string  `json:"artist"`
    Price  float64 `json:"price"`
}

// albums slice to seed record album data.
var albums = []album{
    {ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
    {ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
    {ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func webserver() {
    router := gin.Default()
    router.GET("/albums", getAlbums)
    router.GET("/albums/:id", getAlbumByID)
    router.POST("/albums", postAlbums)

    router.Run("localhost:8080")
}

// getAlbums responds with the list of all albums as JSON.
func getAlbums(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, albums)
}

// postAlbums adds an album from JSON received in the request body.
func postAlbums(c *gin.Context) {
    var newAlbum album

    // Call BindJSON to bind the received JSON to
    // newAlbum.
    if err := c.BindJSON(&newAlbum); err != nil {
        return
    }

    // Add the new album to the slice.
    albums = append(albums, newAlbum)
    c.IndentedJSON(http.StatusCreated, newAlbum)
}

// getAlbumByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that album as a response.
func getAlbumByID(c *gin.Context) {
    id := c.Param("id")

    // Loop through the list of albums, looking for
    // an album whose ID value matches the parameter.
    for _, a := range albums {
        if a.ID == id {
            c.IndentedJSON(http.StatusOK, a)
            return
        }
    }
    c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}
```

We deploy something like this, expose the routes to our network, and then call those routes from other services for different uses. Exposing these routes over a network allows us to connect this service with other services to do something with the data it sends.

This other service could be written in Javascript, Python, Java, Python, C# or whatever backend language is suitable for the task at hand or that you're comfortable with, as long as an endpoint (basically a url) is exposed and is accessible by another backend service.