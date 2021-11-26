
# create new container
docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=root
    -e MONGO_INITDB_ROOT_PASSWORD=mongo \
    -p 127.0.0.1:27017:27017 \
    -v /c/Users/user/data/mongodb:/data/db \
    -d mongo:latest

# set restart policy
docker update --restart unless-stopped mongodb