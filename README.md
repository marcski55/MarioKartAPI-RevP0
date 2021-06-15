# RevatureProject0

## Project Status

### Done

- Research what an API is and what it should do
- View REST examples to get an idea of how this should work
- Get Section Headings from Word Document
- Configure jest
- Research REST best practices (from https://swagger.io/resources/articles/best-practices-in-api-design/)
  - Easy to read and work with
  - Hard to misuse
  - Complete and concise
  - Distinguish between resources and collections
    ```
    /users: a collection of users
    /users/username1: a resource with information about a specific user
    ```
  - Nouns describe URLs better
    - Keep base URL neat, elegant, and simple
    - Collections should be plural; resources should be singular
  - Describe resource functionality with HTTP methods (verbs)
    - GET is used to retrieve a representation of a resource.
    - POST is used to create new resources and sub-resources.
    - PUT is used to update existing resources
    - PATCH is used to update existing resources
    - DELETE is used to delete existing resources
    - PUT vs PATCH info: https://stackoverflow.com/questions/21660791/what-is-the-main-difference-between-patch-and-put-request?answertab=oldest#tab-top
  - Give feedback to developers through the HTTP codes.
    - 2xx = success
    - 4xx = client app misbehaved
    - 5xx = api/server misbehaved
  - Give examples for GET responses
  - Handle complexity elegantly
- Determine Purpose (Theme) of API
  - Mario Kart 8 information (karts, tires, gliders)
  - Use https://www.mariowiki.com/Mario_Kart_8_Deluxe#Available_parts as data source (will make own database)
    - Database should include stats of each part.
- Determine MVP
  - API should be able to view information about entered karts, tires, and gliders.
    - For demonstration, only have entered the items initially available in the game.
  - API should be able to add information about entered karts, tires, and gliders.
    - Used will be unlockable information
  - API should be able to update information by replacement
  - API should be able to remove information
    - Bonus for this project: Prevent deletion of initially available parts.

### To Do

- Create JSON template? (Not sure if this needs to be done)
- Create Database
- Create API
  - Create (POST)
  - Read (GET)
  - Update (PUT)
  - Delete (DELETE)
- Determine Unit Tests in Jest
- Write Documentation

## Overview

### Executive Summary

### Flow Diagram

### Data Types (Rename Data to fit program)

### Use Case Diagram

### Technical Requirements

### Non-Functional Requirements

> ## Requirements (from connellrobert)
> ### Introduction
> Your initial project for this program is to complete a Restful API.
> The application should show experience in the technologies and will be your
> chance to showcase your skills to the training and QC team. Security and
> performance should be considered in your approach to solutions.
> Overall, the theme and implementation is entirely up to you. Keep the
> presentation professional with a 3-5 minute time window. The presentation 
> should use Postman to show a functioning api, deliver well formatted 
> information, follow REST best practices, provide accurate documentation, and 
> have functional/meaningful unit tests.
>
>### Examples
> - [PokeAPI](https://pokeapi.co/)
> - [Random Taco API](https://github.com/evz/tacofancy-api)
> - [Chuck Norris API](https://api.chucknorris.io/)
> - [Assortment of other examples](https://github.com/public-apis/public-apis)
> - [Stock Trading API](https://alpaca.markets/docs/api-documentation/api-v2/)
> 
> ### Technologies
>  - NodeJS
>  - ExpressJS
>  - AWS DynamoDB
>  - Typescript
>  - Jest
>  
> ### Deadline
>  - 06/23/2021
> 
> ### Scoring
> Scoring will be based on the functionality and structure of the api,
> documentation, REST practices followed, Project structure, testing, and the
> presentation itself.