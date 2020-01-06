# Dropspot CLI

Dropspot is an opensource & lightweight continuous delivery service. Install dropspot server on your server or VPS to get started.

## How to install

```
npm i -g dropspot-cli
```

### Create a deployment token

```
npx dropspot token -u http://computers.pk:8080 -t <API-Token> --username mkhizeryounas --password <Password> --serveraddress https://index.docker.io/v1 --imageUrl docker.io/mkhizeryounas/express:latest --port 5000
```

### Trigger Deploy

```
npx dropspot deploy -u http://computers.pk:8080 -t <Deployment-Token>
```
