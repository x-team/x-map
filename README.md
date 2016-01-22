# x-map

## Setting up server environment

 1. Install [VirtualBox](https://www.virtualbox.org)
 2. Install [Vagrant](https://www.vagrantup.com/)
 3. Install **Homestead** box with `vagrant box add laravel/homestead`
 4. Install **Homestead** with `git clone https://github.com/laravel/homestead.git Homestead`
 5. Execute `bash init.sh` in `Homestead` folder - this will create `.homestead` folder in home directory
 6. Clone repository with `git clone https://github.com/x-team/x-map.git x-map`
 7. Copy `Homestead.yml` file to `.homestead`, update `map` path to reflect actual path to `x-map` project
 8. Execute `vagrant up` and then `vagrant ssh` in `Homestead` folder - do the following in the SSH console:
    1. Execute `sudo apt-get remove php7*`
    2. Execute `sudo apt-get install mongodb php5-mongo php5-fpm php5-cli php5-curl`
    3. Overwrite `/etc/nginx/sites-enabled/x-map.app` with `x-map.app`
    4. sudo service nginx restart
    5. Go to project folder
    6. Execute `composer install`. It will ask to provide values to some parameteres at the end - leave them empty
    7. Go to `client` folder
    8. Execute `npm install`
 9. Add `192.168.10.10 x-map.app` to your `/etc/hosts`
 10. Run client with `npm start`
 11. Application will be available at `http://localhost:3000`
 