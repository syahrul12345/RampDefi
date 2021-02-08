tests:
	docker-compose -f Docker-compose.test.yaml up  --abort-on-container-exit --build --force-recreate 
build:
	docker-compose build
serve:
	docker-compose up -d --build --force-recreate 