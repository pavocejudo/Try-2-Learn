from fabric.api import run, local, hosts, cd
from fabric.contrib import django

#infomacion del host
def informacion_host():
    run('uname -a')

#descarga de la aplicacion utilizando git
def downloadAll():
	run('sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D')
	run('sudo echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" >> /etc/apt/sources.list.d/docker.list')
	run('sudo apt-get update')
	run('sudo apt-cache policy docker-engine')
	run('sudo apt-get install -y curl build-essential git nodejs npm docker-engine forever')
	run('sudo git clone https://github.com/jesusgn90/Try-2-Learn.git')
	run('sudo ln -s /usr/bin/nodejs /usr/bin/node')

# Instalar los paquetes del package.json para la aplicacion
def npmInstall():
	run('cd /home/ubuntu/Try-2-Learn/ && npm install')

# Comprobar si hay ya alguna aplicacion con NodeJS
def foreverList():
	run('sudo forever list')

#Ejecucion de test
def test():
	run('cd /home/ubuntu/Try-2-Learn/ && grunt test')

#Ejecucion de la aplicacion
def start():
	run('cd /home/ubuntu/Try-2-Learn/ && forever start bin/www')

#Hard Reset
def hardReset():
	run('sudo killall -KILL nodejs')
	run('sudo rm -r /home/ubuntu/Try-2-Learn')

# Curl 80
def request():
	run('curl http://0.0.0.0:80/')
