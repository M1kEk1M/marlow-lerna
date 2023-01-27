build-image:
	docker build -t pokedex:v1 .

run:
	docker build -t pokedex:v1 .
	docker run -p 3000:3000 pokedex:v1

run-dev:
	cd ./packages/pokedex && npm run dev

build:
	npx lerna run build