
FROM golang:alpine as stage1

WORKDIR /app
COPY ./website/go.mod .
RUN go mod download

# Build go binary
COPY ./website/main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM node:14 as stage2
WORKDIR /app

COPY package.json .
RUN yarn install
COPY public ./public/
COPY src ./src/
RUN yarn build

FROM alpine as stage3
WORKDIR /app
COPY --from=stage1 /app/main .
COPY --from=stage2 /app/build/  ./build/
CMD ["./main"]