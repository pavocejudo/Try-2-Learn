BIN = ./node_modules/.bin

install:
	sudo apt-get -y install npm
	npm install

test_mocha:
	@$(BIN)/mocha test

clean:
	rm -r node_modules
	#sudo apt-get remove npm
