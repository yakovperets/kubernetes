# check the avaliable clusters:

kubectl config get-contexts

# move to the aws

kubectl config use-context arn:aws:eks:eu-central-1:644435390668:cluster/webiks-cluster-3

# creating name space

1. kubectl create namespace erp

# or switch to a specific namespace

kubectl config set-context --current --namespace=erp

# creating the resources inside the namespace

2.  kubectl apply --namespace=erp -f .

# creating the helm-chart resources inside the name

3.

# connect to bitnami

git clone https://github.com/bitnami/charts.git

# postgress

helm install my-postgress-release bitnami/postgresql -f values-postgress.yaml -n erp

# mongodb

helm install my-mongodb-release bitnami/mongodb -f values-mongodb.yaml -n erp

# add the env inside container in the env form
