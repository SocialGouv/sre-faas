# sre-faas

Stateless JS/TS functions

- Each function generate its own docker registry image from the shared Dockerfile
- Autoscale is 1-to-many with a [Kubernetes HPA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

## Generated urls

- dev : https://sre-fass-[func].dev.fabrique.social.gouv.fr
- preprod : https://sre-fass-[func]-preprod.dev.fabrique.social.gouv.fr
- prod : https://sre-fass-[func].fabrique.social.gouv.fr

## Dev

### Docker

Build some image with `docker build --build-arg FUNCTION=some-func .`

## Todo

- utiliser action helm-deploy
