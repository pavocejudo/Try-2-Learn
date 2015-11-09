BIN = ./node_modules/.bin

.PHONY: test

install:
	sudo apt-get -y install npm
	sudo apt-get -y install docker.io
	sudo docker pull ubuntu:latest
	npm install

test:
	@$(BIN)/mocha test

doc:
	@$(BIN)/docco routes/*.js utils/*.js test/*.js

run:
	node bin/www

clean:
	rm -r node_modules
	rm -r docs
	#sudo apt-get remove npm
