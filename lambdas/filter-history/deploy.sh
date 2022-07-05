# Variables, change as needed
functionName="filter-history"
bucketName="calculator-app-assets-us-east-1"
#############################

mkdir build

tsc

cp -r node_modules ./build

zip -r -q build/$functionName.zip ./build

bucketPath="./build/"$functionName".zip s3://"$bucketName"/lambdas/"$functionName".zip"
aws s3 cp $bucketPath

aws lambda update-function-code --function-name $functionName --s3-bucket $bucketName --s3-key lambdas/$functionName.zip
