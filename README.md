# Contents
## Angular App
### Description
This is a simple frontend application bootstrapped using the Angular CLI.
It has a single component that has a text input that takes a value and sends an API request to the same origin at `/hello/<value>`. That request is then proxied via nginx to the API server which simply responds with `Hello <value>!`

### Dockerfile
This application is using a multi-stage Dockerfile, first staging using a node image to build the app and ultimately runs as an unprivileged nginx container using the `nginxinc/nginx-unprivileged` image.

### Configuration
The nginx configuration is mounted at runtime using a ConfigMap, this allows for dynamic configuration of the upstream which allows it to be easily changed, and also satisfies the dynamic nature of service names when deployed using Helm.

### Suggested Improvements
This list is by no means exhaustive:
- Using a client-side logger such as Sentry.io
- Proper error handling
- Proper configuration management, Angular-specific tips can be found in the original documentation here: `https://angular.io/guide/build`
- Adding tests

## HTTP Go Server
This is a simple HTTP API server built with Go following several best practices, the endpoints are generated using the Swagger/OpenAPI specification.

### Dockerfile
This server is using a multi-stage Dockerfile, first stage compiles the application into a binary and then that binary ultimately runs on a minimal `distroless` image.

### Suggested Improvements
This list is by no means exhaustive:
- Using a proper configuration solution to allow for easy changes to app config, `https://github.com/spf13/viper` is one such solution and it has the added capability of changing the config live when mounted using a ConfigMap (without Pod restarts)
- Proper access and error logs, there are many decent loggers for Go, one of those is `https://github.com/uber-go/zap`.
- Exposing a `/metrics` endpoint with application-level Prometheus metrics.
- Adding tests

# Deployment
## Helm
### Chart repository
A chart repository is provided for convence and can be added using the following command:
```console
$ helm repo add khawaga https://khawaga.github.io/charts
```
And the chart can be installed using:
```console
$ helm install hello khawaga/hello
```

### Manual installation
The chart can also be directly installed from the `charts` directory with the following command:
```console
$ helm install hello ./charts/hello
```

### Suggested Improvements
This list is by no means exhaustive:
- Setting securityContext based on best practices to ensure that containers are run with minimal capabilities
- Adding a PodSecurityPolicy definition
- Adding tests

### Notes
Zero-downtime updates can be achieved by setting the replica count for both services to 2 or higher.