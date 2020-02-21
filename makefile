deploy: copy-assets build
	sh deploy.sh

build:
	npm run build;

# build-sw:
# 	workbox generateSW workbox-config.js;

genGM:
	mkdir -p tmp;\
	wget -q --no-check-certificate --no-cache --no-cookies 'https://github.com/Bruceychen/pvpoketw/raw/master/src/data/gamemaster.json' -O './tmp/gamemaster.json'; \
	node genGM.js

copy-assets:
	mkdir -p public; \
	cp -r ./assets/* ./public/
