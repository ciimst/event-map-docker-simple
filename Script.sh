#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Proje dizinleri
ADMIN_PROJECT_DIR="${SCRIPT_DIR}/event-map-admin"
CRONJOB_PROJECT_DIR="${SCRIPT_DIR}/event-map-cronjob"
WEB_PROJECT_DIR="${SCRIPT_DIR}/event-map-web"


# Pom.xml dosyasının yolu
POM_FILE_ADMIN="${ADMIN_PROJECT_DIR}/pom.xml"
POM_FILE_CRONJOB="${CRONJOB_PROJECT_DIR}/pom.xml"
POM_FILE_WEB="${WEB_PROJECT_DIR}/pom.xml"

# Eklemek istediğiniz repository'nin bilgileri
REPO_ID="nexus-releases"
REPO_URL="http://177.177.0.236:8081/repository/event-map-hibernate-entities/"

# Repository eklemek için sed komutu
sed -i '/<\/project>/i \    <repositories>\n        <repository>\n            <id>'"$REPO_ID"'<\/id>\n            <url>'"$REPO_URL"'<\/url>\n        <\/repository>\n    <\/repositories>' "$POM_FILE_ADMIN"

sed -i '/<\/project>/i \    <repositories>\n        <repository>\n            <id>'"$REPO_ID"'<\/id>\n            <url>'"$REPO_URL"'<\/url>\n        <\/repository>\n    <\/repositories>' "$POM_FILE_CRONJOB"

sed -i '/<\/project>/i \    <repositories>\n        <repository>\n            <id>'"$REPO_ID"'<\/id>\n            <url>'"$REPO_URL"'<\/url>\n        <\/repository>\n    <\/repositories>' "$POM_FILE_WEB"

echo "Repository eklendi: $REPO_ID - $REPO_URL"


REGISRTY=docker.io/imst
TAG=1.4.30
MINIKUBE_DRIVER=docker


while getopts r:t: option
do 
    case "${option}"
        in
        r)REGISRTY=${OPTARG};;
        t)TAG=${OPTARG};;
    esac
done

# (REGISRTY ve TAG kontrol)

echo "REGISRTY : $REGISRTY"
echo "TAG   : $TAG"
echo "MINIKUBE_DRIVER = $MINIKUBE_DRIVER"




echo "BUILDING Dockerfiles"

echo "BUILDING DockerfileAdmin"
docker build -t event_map_admin:$TAG -f DockerfileAdmin  .
echo "BUILDING DockerfileCronjob"
docker build -t event_map_cronjob:$TAG -f DockerfileCronjob  .
echo "BUILDING DockerfileWeb"
docker build -t event_map_web:$TAG -f DockerfileWeb  .


docker tag event_map_admin:$TAG $REGISRTY/event_map_admin:$TAG
docker tag event_map_cronjob:$TAG $REGISRTY/event_map_cronjob:$TAG
docker tag event_map_web:$TAG $REGISRTY/event_map_web:$TAG


echo "PUSHING event_map_admin to $REGISRTY"
docker push $REGISRTY/event_map_admin:$TAG
echo "PUSHING event_map_cronjob to $REGISRTY"
docker push $REGISRTY/event_map_cronjob:$TAG
echo "PUSHING event_map_web to $REGISRTY"
docker push $REGISRTY/event_map_web:$TAG

docker image rm $REGISRTY/event_map_admin:$TAG
docker image rm $REGISRTY/event_map_cronjob:$TAG
docker image rm $REGISRTY/event_map_web:$TAG


