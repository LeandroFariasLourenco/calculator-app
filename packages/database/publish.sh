cd C:/Users/Leand/Desktop/Estudos/calculator-app/packages/database

echo "Compiling files..."

tsc

echo "Logging..."

npm run co:login

echo "Publishing..."

cp package.json ./build/package.json

cd build

npm install

npm publish

cd ..

rm -rf build