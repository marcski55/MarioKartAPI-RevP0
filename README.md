# Mario Kart Customizations

## Overview
This API will manage CRUD operations on a database of Mario Kart Vehicles and 
Parts. The current version of this database is using data from Mario Kart 8 on 
IGN's website: https://www.ign.com/wikis/mario-kart-8/Vehicles_and_Customization

## Flow Diagram
![Flow Diagram](MarioKartFlowDiagram.jpg)

## Kart and Part Types
There are three types of Karts:
- Kart
- Bike
- ATV (new in Mario Kart 8)

There are two types of Parts:
- Wheels
- Gliders

## Technical Requirements

### Peristence Tier
- DynamoDB
### Application Tier
- Enviornment: NodeJS
- Language: TypeScript
- Web Framework: Express
- Authentication Strategy: TBD
### Client Tier
- Environment: API client such as Postman
  (could be transformed into a web front-end)