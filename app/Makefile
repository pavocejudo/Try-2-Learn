BIN = ./node_modules/.bin

.PHONY: test

install:
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
	
