# sre-faas

Poor man stateless JS/TS functions

## How it works

Each function generate its own docker registry image from the main Dockerfile

## Generated URLs

- dev : https://sre-faas-[func]-[branch].dev.fabrique.social.gouv.fr
- preprod : https://sre-faas-[func]-preprod.dev.fabrique.social.gouv.fr
- prod : https://sre-faas-[func].fabrique.social.gouv.fr

## Dev

### Docker

Build your image with `docker build --build-arg FUNCTION=some-func .`

## Todo

- ressources optims + hpa
- changes based release/deploy

