
## should run with WSL2
docker container run -d \
    --name google-docs-clone-mongodb \
    -p 27017:27017 \
    -v /apps/google-docs-clone/mongodb:/data/db \
    mongo:latest
