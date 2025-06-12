#!/bin/bash

ECR=xxxxxxxxx
REGION=xxxxxxxxx
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
GIT_COMMIT=$(git show -s --format=%H)
# GIT_BRANCH=$(git branch --show-current)

docker build -t ${ECR}:${GIT_COMMIT} .

if [[ $? != "0" ]]
then
    echo "Error building CMS image"
    exit 1
fi

aws ecr get-login-password --region $REGION --no-verify-ssl | docker login --username AWS --password-stdin ${ECR}

if [[ $? != "0" ]]
then
    echo "Error logging in to registry"
    exit 1
fi

docker push ${ECR}:${GIT_COMMIT}

if [[ $? != "0" ]]
then
    echo "Error pushing to registry"
    exit 1
fi

export KUBECONFIG="${DIR}/deploy/kubeconfig"

helm upgrade \
    --install \
    --create-namespace \
    --set "image.tag=${GIT_COMMIT}" \
    --namespace cms \
    --description "Commit ${GIT_COMMIT}" \
    cms \
    ./deploy/cms

kubectl -n cms rollout restart deployment cms
