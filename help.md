# kill a port

sudo kill -9 $(sudo lsof -t -i:9001)
