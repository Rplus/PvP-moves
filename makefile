deploy: build
	sh deploy.sh

build:
	npm run build;

# build-sw:
# 	workbox generateSW workbox-config.js;
