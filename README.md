# Alexa permissions example
This is just a simple alexa skill to test, how to get the permissions from the user to get his address, phone number, email and full name.

## Getting started

### Prerequisites

To run the project **AWS**, **ASK** credentials and **Bespoken** tools have to be set up:
  * **AWS:**
      1. Install aws-cli - ([link](https://docs.aws.amazon.com/cli/latest/userguide/installing.html))
      2. Then configure an account - ([link](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html))
  * **ASK:**
      1. Install and setup ask-cli - ([link](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html))
  * **Bespoken:**
      1. Install the Bespoken tools - ([link](https://github.com/bespoken/bst))

### Running development

To run project in the development environment:
1. Pull the repo
2. Install dependencies using npm, yarn or another package manager (I'll use **[yarn](https://yarnpkg.com/en/)** as default) so just run it using the command:
```
yarn
```
3. To run the project run the command:
```
yarn start
```
It will automatically build the project, run the file watcher and get it up and running using bespoken tools. URL that should be used in the developer console will be in the console. It should look something like this:
```
Your public URL for accessing your local service:
https://common-deal.bespoken.link
```
5. (**optional**) Bespoken proxy is sometimes slow and requests timeout for no reason, to avoid this it is possible to overcome it using [ngrok](https://ngrok.com/). To use it - just install it according to their guide and run it on port 10000, thus losing bespoken extra logging, but making proxy to run faster. In this case use ngrok provided https link in the developer console instead of bespoken provided one. To run ngrok use the command:
```
ngrok http 10000
```
## Running tests

To run tests, run this command:

```
yarn test
```

## Deployment to lambda

### Information

There is .ask config example. To use it, fill out missing info: skillId and lambda ARN.

### Deploy

1. To deploy code to lambda run the command:
```
yarn deploy
```
