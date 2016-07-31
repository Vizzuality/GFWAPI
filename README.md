# Node microservice skeleton
This repository is the base the all microservices implemented in nodejs with koajs framework.


[View the documentation for this
API](http://gfw-api.github.io/swagger-ui/?url=https://raw.githubusercontent.com/Vizzuality/microservice-node-skeleton/master/app/microservice/swagger.yml)

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Run in develop mode](#run-in-develop-mode)
4. [Test](#test)
4. [Directory structure](#directory-structure)


## Installation

### OS X

**First, make sure that you have the [API gateway running
locally](https://github.com/Vizzuality/api-gateway#readme). and you add microservice's config (url and port) in the consul file of api-gateway [info](https://github.com/Vizzuality/api-gateway#user-content-how-are-microservices-discovered)**

We're using Docker which, luckily for you, means that getting the
application running locally should be fairly painless. First, make sure
that you have [Docker Compose](https://docs.docker.com/compose/install/)
installed on your machine.

If you've not used Docker before, you may need to set up some defaults:

```
docker-machine create --driver virtualbox default
docker-machine start default
eval $(docker-machine env default)
```

Now we're ready to actually get the application running:

```
git clone https://github.com/Vizzuality/microservice-node-skeleton.git
cd microservice-node-skeleton
```



## Configuration
### API configuration
We need define the public api of the microservice and his documentation. This configuration is allocated in app/microservice folder. This folder must contain 3 files:
* register.json: it contains the urls configuration. This file can contain two variables (#(service.id), #(service.name)). [Example file](app/microservice/register.json)
* public-swagger.yml: it contains the documentation of the public urls [Example file](app/microservice/public-swagger.json)
* swagger.yml: it contains the documentation of the private urls. [Example file](app/microservice/swagger.json)

The vizz.microservice-client read the register.json and public-swagger.yml files and when the api-gateway call to /info, he returns the content of this files because this files contains the config of the microservice.

### Environment configuration

We can define our configuration in environment variables or in config files.
To config file, we use this library: [config](https://github.com/lorenwest/node-config#readme)

To start, we need define this environment variables:
* API_GATEWAY_URL : Is the url where it is up our api-gateway. It is only necessary for the development environment
* PORT: Port number where our microservice is listening. Must be the same that we configure in docker-compose-*.yml files.

When you are creating environment variables or add settings in our configuration files?
If the configuration has sensible data (password, tokens, etc), we need configure in environment variables and if we want use config module, we can use this [custom-environment-variables](https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables).
In other case, we can use config files.

## Run in develop mode
We use docker and grunt. Execute the next command:

```bash
    ./microservice develop
```
When the microservice run,

When starting, the microservice makes a request to the api-gateway. In this way, the api-gateway refresh his configuration.Then, you can now access the microservice through the API gateway.

## Test
To execute test, execute this command:
```bash
    ./microservice test
```

if you want see the logs formatted execute:

```bash
    ./microservice test | bunyan
```

## Directory structure

### Routes Folder
This folder contain the distinct files that define the routes of the microservice. All files must be end with suffix Router. Ex:

```bash
/routes
------ /api
---------- /v1
-------------- userRouter.js // in this file define /user

The complete path is: /api/v1/user
```

The name of subfolders of the routes folder define the subpath of the endpoints

### Services Folder
This folder contain the services of the application. The logic services.

### Models Folder
This folder contains the models of database or POJOs. For example, if we use mongoose, this folder contains the mongoose models.

### Serializers Folder
This folder contains files that modify the output to return json standard [jsonapi](http://jsonapi.org/) Serializer library: [jsonapi-serializer](https://github.com/SeyZ/jsonapi-serializer)

### Validators Folder
This folder contains the distinct validator classes that validate the input body or input query params. Use [koa-validate](https://github.com/RocksonZeta/koa-validate)

### Config
This folder contains the distinct files by environment. Always it must exist:
- dev.json (develop)
- staging.json (staging environment)
- prod.json (production environment)

We use [config](https://github.com/lorenwest/node-config) module.

### App.js
This file load the application and dependencies.

### Loader.js
This file is responsible for loading all routes and declare it. it search all files that ends with Router.js suffix in the routes folder and subfolders

### logger.js
This file config logger of the application

## test
This folder contains the tests of the microservice. 2 folders

### unit
  This folder contains the unit tests. It contains a subfolder by each module of the microservice (serializer, services, models, etc)   All files contains .test.js suffix

### e2e
 This folder contains the e2e tests.  All files contains .spec.js suffix
