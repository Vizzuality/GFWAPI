# Node microservice skeleton
This repository is the base the all microservices implemented in nodejs.

## Installation

````bash
npm install

npm install -g bunyan  // logger system
````
## Run
Execute the next command:
````bash
    npm start
````

## Estructure

### Routes Folder
This folder contain the distinct files that define the routes of the microservice. All files must be end with suffix Router.
Ex:
````bash
/routes
------ /api
---------- userRouter.js // in this file define /user

The complete path is: /api/user
````
The name of subfolders of the routes folder define the subpath of the endpoints

### Services Folder
This folder contain the services of the application. The logic services.

### Models Folder
This folder contains the models of database or POJOs. For example, if we use mongoose, this folder contains the mongoose models.

### Serializers Folder
This folder contains files that modify the output to return json standard [jsonapi](http://jsonapi.org/)
Serializer library: [jsonapi-serializer](https://github.com/SeyZ/jsonapi-serializer)

### Validators Folder
This folder contains the distinct validator classes that validate the input body or input query params.
Use [koa-validate](https://github.com/RocksonZeta/koa-validate)

### Config
This folder contains the distinct files by environment. Always it must exist:
* dev.json (develop)
* staging.json (staging environment)
* prod.json (production environment)

We use [config](https://github.com/lorenwest/node-config) module.
### App.js
This file load the application and dependencies.

### Loader.js
This file is responsible for loading all routes and declare it. it search all files that ends with Router.js suffix in the routes folder and subfolders

### logger.js
This file config logger of the application

## test
This folder contains the tests of the microservice. It contains a subfolder by each module of the microservice (serializer, services, models, etc)
