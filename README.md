# x-map

## Setup

In order to run the application locally, you'll need to install:

- [Docker Toolbox](https://www.docker.com/products/docker-toolbox)
- [docker-machine-nfs](https://github.com/adlogix/docker-machine-nfs#install)

Start ```Docker Quickstart Terminal```. 

Once in the terminal type:
```
docker-machine-nfs default
```

This will enable NFS on your Docker default Virtual Machine.

Next, run:
```
docker-machine ip default
```

This will display the IP of the virtual machine that will be running the application.
You need to add it to your ```/etc/hosts```.
Given that ```192.168.99.100`` was the IP, add the following line there:
```
192.168.99.100 x-map.app
```

In order to install dependencies and build the application, run:
```
docker-compose run web composer build
```

Application is ready to run. Execute the following:
```
docker-compose up -d
```

``x-map`` appliction should be available at the [http://x-map.app](http://x-map.app)

To stop the application run:
```
docker-compose down
```

## Development

All changes done to PHP source files will be reflected immediately. All changes to frontend files (HTML, CSS, JS, images) 
will require the following command to be run:
```
docker-compose run web composer build-frontend
```
 
If you want to update frontend layer and have the live updates in the browser, run ```npm start``` in ```client/``` 
folder - application will be available at ```localhost:3000```
 
## Composer commands

The following composer commands are available:

- ```docker-compose run web composer build``` - build frontend and backend
- ```docker-compose run web composer build-frontend``` - build frontend
- ```docker-compose run web composer build-backend``` - build backend
- ```docker-compose run web composer lint``` - run linter on frontend and backend code
- ```docker-compose run web composer lint-frontend``` - run linter on frontend code
- ```docker-compose run web composer lint-backend``` - run linter on backend code
- ```docker-compose run web composer lint-fix-backend``` - run fixer on backend code
- ```docker-compose run web composer test``` - run frontend and backend tests
- ```docker-compose run web composer test-frontend``` - run frontend tests
- ```docker-compose run web composer test-backend``` - run backend tests