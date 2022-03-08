# sre-faas

Poor man stateless JS/TS functions

## Features

- Each function generate its own docker registry image from the main Dockerfile
- Autoscale is 1-to-many with a [Kubernetes HPA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

## Generated urls

- dev : https://sre-fass-[func].dev.fabrique.social.gouv.fr
- preprod : https://sre-fass-[func]-preprod.dev.fabrique.social.gouv.fr
- prod : https://sre-fass-[func].fabrique.social.gouv.fr

## Dev

### Docker

Build your image with `docker build --build-arg FUNCTION=some-func .`

## Todo

- utiliser action helm-deploy
