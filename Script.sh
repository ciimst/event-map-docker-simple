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






