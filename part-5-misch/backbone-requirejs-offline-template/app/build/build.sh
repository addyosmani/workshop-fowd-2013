r.js -o build/app.build.js
cd ../dist
rm -rf scripts/vendor/* build scripts/views scripts/models scripts/collections build.txt
# mv css/style.css style.css && rm -rf css/* && mv style.css css/style.css