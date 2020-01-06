FROM golang:1.13-buster as build

WORKDIR /go/src/http-go-server
ADD . /go/src/http-go-server

RUN make build

FROM gcr.io/distroless/base-debian10:nonroot

COPY --from=build --chown=nonroot /go/src/http-go-server/bin/http-go-server /

# Run as non-root user
USER nonroot

CMD ["/http-go-server"]