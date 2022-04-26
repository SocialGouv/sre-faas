# sre-faas-tipimail-quotas

Return tipimail quotas as promoetheus metrics

## Run

```sh
yarn start
```

## Environment variables

### TIPIMAIL_ACCOUNTS

A JSON array of accounts to audit

```json
[{
    "name": "Account name",
    "username": "98687632JKOH98698769875865",
    "token": "jhgihgfz87687fezvaokpjk09707"
}]
```

### ACCESS_TOKEN

A random token to secure your endpoint. Page will be available at `http://your.end.point/?token=[ACCESS_TOKEN]`





