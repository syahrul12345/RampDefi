tests:
	docker-compose -f Docker-compose.test.yaml up  --build --force-recreate
build:
	docker-compose build
serve:
	docker-compose up -d