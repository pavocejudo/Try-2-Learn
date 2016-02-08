import fabric.api as fabric
import os, sys, glob

# Informacion 
def getami():
    fabric.sudo('whoami')

# Preparacion del entorno, clone de la aplicacion
def downloadAll():
	fabric.sudo('apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D')
	fabric.sudo("echo 'deb https://apt.dockerproject.org/repo ubuntu-trusty main' >> /etc/apt/sources.list")
	fabric.sudo('apt-get update')
	fabric.sudo('apt-cache policy docker-engine')
	fabric.sudo('apt-get install -y curl build-essential git nodejs npm docker-engine forever')
	fabric.sudo('git clone https://github.com/jesusgn90/Try-2-Learn.git')
	fabric.sudo('ln -s /usr/bin/nodejs /usr/bin/node')

# Instalar los paquetes del package.json para la aplicacion
def npmInstall():
    fabric.sudo('cd /home/ubuntu/Try-2-Learn/ && npm install')

# Comprobar si hay ya alguna aplicacion con NodeJS
def foreverList():
    fabric.sudo('forever list')

# Ejecucion de test
def test():
    fabric.sudo('cd /home/ubuntu/Try-2-Learn/ && grunt test')

# Ejecucion de la aplicacion
def start():
    fabric.sudo('cd /home/ubuntu/Try-2-Learn/ && forever start bin/www')

def killNodeJS():
    fabric.sudo('killall -KILL nodejs')

def rmTry2Learn():
    fabric.sudo('rm -r /home/ubuntu/Try-2-Learn')

def rmRepo():
	fabric.sudo('rm /etc/apt/sources.list.d/docker.list')

# Curl 80
def request():
    fabric.sudo('curl http://0.0.0.0:80/')
