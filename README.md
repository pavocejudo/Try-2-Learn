Tabla de contenidos
=================

  * [Try-2-Learn](#try-2-learn)
      * [Descripción](#descripción)
      * [Funcionamiento](#funcionamiento)
        * [Objetivos iniciales](#objetivos-iniciales)
        * [Objetivos futuros](#objetivos-futuros)
        * [Inscripción en el certamen de proyectos de la UGR organizado por la OSL](#inscripción-en-el-certamen-de-proyectos-de-la-ugr-organizado-por-la-osl)
        * [Integrantes del equipo](#integrantes-del-equipo)
      * [Sistema de Test](#sistema-de-test)
      * [Integración continua](#integración-continua)
        * [Grunt](#grunt)
        * [Nuevas herramientas añadidas](#nuevas-herramientas-añadidas)
      * [Quay.io](#quay.io)
      * [Publicado en Amazon Web Services](#publicado-en-amazon-web-services)
      * [Despliegue en Amazon Web Services](#despliegue-en-amazon-web-services)
        * [Otros aspectos a tener en cuenta](#otros-aspectos-a-tener-en-cuenta)
        * [Aprovisionando la máquina](#aprovisionando-la-máquina)
        * [Ya entiendo... ¿Entonces qué hago?](#ya-entiendo...-¿entonces-qué-hago?)
      * [Despliegue en PaaS Heroku](#despliegue-en-paas-heroku)
      * [Dockerhub](#dockerhub)

# Try-2-Learn
Proyecto para la asignatura Infraestructuras Virtuales 2015-16

### Descripción 
Dada la naturaleza de la asignatura el proyecto debe orientarse hacia las tecnologías
SaaS/PaaS/IaaS.

Try2Learn tiene como objetivo el testeo de scripts o pequeños módulos en diversos lenguajes de forma que el usuario no se tenga que preocupar de crear un entorno específico para testear sus scripts en su lenguaje favorito online.

### Funcionamiento
Try2Learn nos permite crear un entorno virtual aislado y preparado para el lenguaje de nuestra aplicación. El usuario manda su código fuente o un paquete y Try2Learn le devuelve la salida del programa compilado/interpretado.

El programa se ejecutará dentro de un entorno virtualizado el cual podrá ser personalizable por el usuario.

#### Objetivos iniciales
* Servidor con [nodejs](https://es.wikipedia.org/wiki/Node.js)
* Comprender y ser capaz de crear [dockers](https://es.wikipedia.org/wiki/Docker) personalizados para la virtualización de los entornos del usuario.
* Dado un código fuente sencillo [compilarlo](https://es.wikipedia.org/wiki/Compilador) o [interpretarlo](https://es.wikipedia.org/wiki/Int%C3%A9rprete_(inform%C3%A1tica)#Lenguaje_interpretado), según el lenguaje, en el servidor y devolver la salida.
* Crear interfaz web para el usuario
* Comprender y comenzar a usar [Travis](https://travis-ci.org/)

#### Objetivos futuros
Una vez finalizados y probados con éxito los objetivos iniciales, se pretende afinar un poco más el proyecto dando lugar a:

* Testeo de aplicaciones web completas tipo Django o basadas en otros frameworks en entornos virtuales.
* Definir un posible sistema [freemium](https://es.wikipedia.org/wiki/Freemium) de uso, para mi propia explotación o la del que lo desee!
    
#### Inscripción en el certamen de proyectos de la UGR organizado por la OSL
Proyecto inscrito en el certamen de [Proyectos Libres de la UGR 2015-2016](http://osl.ugr.es/bases-de-los-premios-a-proyectos-libres-de-la-ugr/)

![Inscripción](inscripcion_certamen.png)

#### Integrantes del equipo
En un principio estoy yo sólo en el proyecto, aunque puede "forkearme/pull requestearme" quien lo desee! 

Si deseas contactar conmigo te sugiero me escribas a jesusgonzaleznovez@gmail.com

### Sistema de Test
Dado que la aplicación esta basada en [node.js](https://es.wikipedia.org/wiki/Node.js) me he decidido por usar [mocha](https://mochajs.org/) porque es un framework de pruebas unitarias para JavaScript que ejecuta las pruebas en serie permitiendo reportes flexibles y exactos, es perfecto para mi proyecto basado en nodejs.

Dado que he configurado grunt-mocha podemos realizar los test usando:
    
    grunt test

### Integración continua
Respecto a la integración continua he optado por utilizar [Travis](https://travis-ci.org/) usando
mi cuenta de GitHub [@jesusgn90](https://github.com/jesusgn90/) por su facilidad de uso y por su compatibilidad con GitHub. Lo primero que debemos hacer es crear
el fichero .travis.yml, en el cual he añadido lo siguiente:

    language: node_js
    sudo: required
    services:
      - docker
    node_js:
      - "0.10"
    before_install:
      - docker pull ubuntu:latest
      - npm install
    script:
      - grunt test

En él indicamos que se ejecute en un entorno usando el lenguaje node_js versión 0.10 y que además instale las dependencias necesarias usando npm install. Además deseamos que ejecute los test por eso indicamos que se ejecute grunt test.

[![Build Status](https://travis-ci.org/jesusgn90/Try-2-Learn.svg?branch=master)](https://travis-ci.org/jesusgn90/Try-2-Learn)

#### Grunt
Se ha creado un fichero Grunfile.js que irá creciendo con el tiempo en el que podemos realizar varias tareas de una forma cómoda, a continuación se describen las opciones:

    grunt start - ejecuta el servidor
    grunt test - realiza los test de mocha
    grunt doc - genera la documentación
    grunt clean - limpia directorios/ficheros generados por otras órdenes

#### Nuevas herramientas añadidas
    Jade, como motor de plantillas
    Express, framework para NodeJS
    Docco, para generar la documentación de forma cómoda

##### Quay.io
Se ha añadido un repositorio docker a [Quay.io](https://quay.io) usando el propio dockerfile del proyecto. El repositorio creado esta en [https://quay.io/repository/jesusgn90/try-2-learn](https://quay.io/repository/jesusgn90/try-2-learn)

### Publicado en Amazon Web Services
Actualmente ya existe una versión pública de la app funcionando, se ha creado una instancia EC2 para poder utilizar el rendimiento que nos permite la computación en la nube. Además se hace uso de un sistema dyndns para no perder la ip pública que vaya asignando Amazon.

Link a la app -> [http://try-2-learn.duckdns.org/](http://try-2-learn.duckdns.org/)

Info sobre EC2 -> [https://aws.amazon.com/es/ec2/](https://aws.amazon.com/es/ec2/)

Info sobre DuckDNS -> [http://www.duckdns.org/](http://www.duckdns.org/)

### Despliegue en Amazon Web Services 
Podemos reproducir el entorno de la aplicación completamente en una instancia EC2 de Amazon. Para ello el usuario tiene el siguiente Vagrantfile para usar con Vagrant:

    # -*- mode: ruby -*-
    # vi: set ft=ruby :
    Vagrant.configure(2) do |config|
     
      config.vm.box = "dummybox-aws"

      config.vm.hostname = "try2learn"
      config.vm.provider :aws do |aws, override|
     
        #AWS Settings
        aws.access_key_id = ENV['ACCESS_KEY_ID']
        aws.secret_access_key = ENV['SECRET_ACCESS_KEY']
        aws.region = "us-west-2"
     
        aws.tags = {
          'Name' => 'Try-2-Learn',
          'Team' => 'Try-2-Learn',
          'Status' => 'active'
        }
     
        #Override Settings
        override.ssh.username = "ubuntu"
        override.ssh.private_key_path = ENV['PRIVATE_KEY_PATH']
     
        aws.region_config "us-west-2" do |region|
          region.ami = 'ami-35143705'
          region.instance_type = 't2.micro'
          region.keypair_name = "try-2-learn"
          region.security_groups = "launch-wizard-3"
        end

        # Aprovisionamiento
        config.vm.provision :ansible do |ansible|  
            ansible.playbook = "playbook.yml"
            ansible.limit = 'all'
            ansible.verbose = "vv"
        end 
      end
    end

Como vemos tenemos tres variables de entorno que deben ser configuradas o bien editadas en el fichero Vagrantfile y suministrarlas directamente. Las variables son valores de su propia cuenta de Amazon. 

aws.access_key_id y aws.secret_access_key son sus claves que puede encontrar a través de la consola de gestión de AWS. 

private_key_path se refiere a la ruta hacia su certificado .pem de AWS.

#### Otros aspectos a tener en cuenta
Se debe tener creado un security_groups, en este caso tiene el nombre de launch-wizard-3, pero puede tener cualquier otro nombre, que exista en su cuenta de AWS y que además tenga la siguientes características:

Inbound

    Type Protocol Port Range Source
    HTTP TCP      80         0.0.0.0/0
    SSH  TCP      22         0.0.0.0/0

Outbound

    Type        Protocol Port Range Destination
    All traffic All      All        0.0.0.0/0

El tipo de instancia creada en AWS tendría como sistema operativo:

    ubuntu-trusty-14.04-amd64

Es una instancia de tipo:

    t2.micro

Estos parámetros pueden ser modificados, la imagen de ubuntu se adapta bien a las necesidades de la aplicación pero pueden probarse otras. El tipo de instancia es la básica de AWS, pero según las necesidades que tengamos puede usarse una de mayor calibre sin problemas. Estos parámetros son los siguientes:

      region.ami = 'ami-35143705'
      region.instance_type = 't2.micro'

#### Aprovisionando la máquina
Se hace uso de Ansible para el aprovisionamiento. Como vemos en el Vagrantfile se incluye una parte no mencionada dedicada al aprovisionamiento con Ansible. Esta parte hace uso del siguiente playbook:

    ---
    - hosts: default
      remote_user: ubuntu
      sudo: true

      tasks:
        - name: Add apt-key for docker
          command: apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

        - name: Add apt-repository
          shell: echo 'deb https://apt.dockerproject.org/repo ubuntu-trusty main' >> /etc/apt/sources.list.d/docker.list

        - name: apt-get update
          apt: update_cache=yes
       
        - name: apt policy for docker
          command: apt-cache policy docker-engine 

        - name: apt-get update
          apt: update_cache=yes

        - name: Instalar curl
          apt: name=curl state=present
        - name: Instalar build-essential
          apt: name=build-essential state=present
        - name: Instalar git
          apt: name=git state=present
        - name: Instalar nodejs
          apt: name=nodejs state=present
        - name: Instalar npm
          apt: name=npm state=present
        - name: Instalar docker
          apt: name=docker-engine state=present

        - name: Clone Try-2-Learn
          git: repo=https://github.com/jesusgn90/Try-2-Learn.git  dest=/home/ubuntu/Try-2-Learn

        - name: npm install
          npm: path=/home/ubuntu/Try-2-Learn

    #    - name: Runs docker
    #      shell: nohup docker -d &

        - name: "Instalar forever (para arrancar la aplicación con NodeJS)."
          npm: name=forever global=yes state=latest

        - name: Symlink nodejs -> node
          file: src=/usr/bin/nodejs dest=/usr/bin/node state=link

        - name: "Comprobar si hay ya alguna aplicación con NodeJS"
          command: forever list
          register: forever_list
          changed_when: false

        - name: "Start Try-2-Learn."
          command: forever start /home/ubuntu/Try-2-Learn/bin/www
          when: "forever_list.stdout.find('/home/ubuntu/Try-2-Learn/bin/www') == -1"

Con esto tendríamos instaladas las dependencias de la aplicación para que funcione correctamente.

#### Ya entiendo... ¿Entonces qué hago?
Para un correcto despliegue se usarán las siguientes versiones:

    Vagrant 1.7.4
    Ansible 1.6

Para su instalación se recomienda por un lado usar gemas de Ruby con Vagrant y pip para Ansible.

[https://www.vagrantup.com/](https://www.vagrantup.com/)

[https://rubygems.org/](https://rubygems.org/)

[https://pypi.python.org/pypi/pip](https://pypi.python.org/pypi/pip)

[www.ansible.com](www.ansible.com)

Disponiendo únicamente de los ficheros Vagrantfile y playbook.yml podríamos desplegar sin problemas en AWS, con ambos ficheros bajo el mismo directorio, por ejemplo:

    /
    |_myApp
        |_Vagrantfile
        |_playbook.yml

Ejecutamos:

    vagrant up --provider=aws

De esta forma se realizarán los siguientes pasos:

    1. Creación de instancia del tipo especificado en el Vagrantfile
    2. Aprovisionamiento mediante Ansible, a través del playbook.yml

### Despliegue en PaaS Heroku (ACTUALMENTE NO SE USA, MIGRADO A AMAZON)
He optado por Heroku por que lo nombraban en los ejercicios, en el temario, comencé a usarlo y con él me he quedado pues me resulta cómodo y sencillo de usar.

Mostraré como lo he realizado en el proyecto propio de las prácticas de la asignatura. El proyecto propio es [Try-2-Learn](https://github.com/jesusgn90/Try-2-Learn)

    Instalamos [Heroku Toolbelt](https://toolbelt.heroku.com/)
    $ heroku login
    $ heroku apps:create try-2-learn

Ya tenemos creada una aplicación en Heroku llamada try-2-learn, ahora añadiremos un fichero Procfile que indica a Heroku que hacer, probablemente este fichero sea modificado con el tiempo, pero de momento indicaremos sólamente la siguiente línea:

    web: npm start

En la sección "Deploy" del dashboard de nuestra app en heroku podemos seleccionar que se sincronice con github para un deploy automático cada vez que hagamos un push a la rama master de nuestro repositorio, además le indicaremos que espere que pase los test de integración continuade travis.

Podemos verla en [https://try-2-learn.herokuapp.com/](https://try-2-learn.herokuapp.com/)

Con esto tendríamos configurada y puesta en marcha la aplicación en Heroku.

### Dockerhub
Se ha creado una imagen docker con todo el entorno preparado para quien quiera usar esta aplicación sin preocuparse por el entorno. Se parte de una imagen base concreta, llamada "dind" que nos permite ejecutar dockers dentro de otro docker, mas info [aquí](https://github.com/jpetazzo/dind).

Mi repositorio es [https://hub.docker.com/r/jesusgn90/try-2-learn/](https://hub.docker.com/r/jesusgn90/try-2-learn/)

Para poder usar esta imagen:

    docker pull jesusgn90/try-2-learn #Descargamos la imagen
    docker run --privileged -p 3000 -it jesusgn90/try-2-learn #Abrimos una shell sobre un container de la imagen, se usa el puerto 3000 porque es el que he usado para el servidor nodejs.

Una vez dentro del container arrancaremos la aplicación...

    cd home/Try-2-Learn
    node bin/www
    docker -d &

En otra shell fuera del container necesitamos ver que puerto se le ha mapeado al puerto 3000 del container:

    docker ps

Abrimos un navegador y ya podemos acceder:

    http(s)://iphost:PORT/

Por tanto cualquier persona con Docker instalado podría brindar el servicio que brinda mi aplicación sin preocuparse de preparar un entorno para ello.

