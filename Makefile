BIN = ./node_modules/.bin

.PHONY: test

install:
	#sudo apt-get -y install npm
	npm install

test:
	@$(BIN)/mocha test

doc:
	echo "Aún pendiente de implementar..."

run:
	node app.js

clean:
	rm -r node_modules
	#sudo apt-get remove npm
