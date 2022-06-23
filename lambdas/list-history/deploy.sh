# Variables, change as needed
functionName="list-history"
#############################

cp -r node_modules ./build

zip -r -q build/$functionName.zip ./build

bucketPath="./build/"$functionName".zip s3://calculator-app-assets/lambdas/"$functionName".zip"
aws s3 cp $bucketPath

aws lambda update-function-code --function-name $functionName --s3-bucket calculator-app-assets --s3-key lambdas/$functionName.zip

rm -rf ./build