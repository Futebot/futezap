service_name="bot"
compose="docker-compose"

phony: build run bash

build:
	$compose build

run:
	$compose run $service_name

bash:
	$compose run --entrypoint='bash' $service_name