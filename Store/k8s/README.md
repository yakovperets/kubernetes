# check the avaliable clusters:

kubectl config get-contexts

# move to the aws

kubectl config use-context arn:aws:eks:eu-central-1:644435390668:cluster/webiks-cluster-3

# creating name space

1. kubectl create namespace store

# creating the resources inside the namespace

2.  kubectl apply --namespace=store -f .

# creating the helm-chart resources inside the name

# connect to bitnami

git clone https://github.com/bitnami/charts.git

# mongodb

helm install my-mongodb-release bitnami/mongodb -f values-mongodb.yaml -n store

# add the env inside container in the env form
