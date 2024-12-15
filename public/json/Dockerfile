FROM node:16-alpine
WORKDIR /data
RUN npm install -g json-server
COPY comments.json /data/db.json
CMD ["json-server", "--watch", "/data/db.json", "--host", "0.0.0.0", "--port", "5000"]
EXPOSE 5000

