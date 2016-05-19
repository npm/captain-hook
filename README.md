# captain-hook
> a slack bot to subscribe to npm webhook notifications

![captain hook](assets/captainhookbot.png)

## usage

```
/captain-hook subscribe <package-name>
```

## local dev

captain-hook is a NodeJS application. if you don't have [NodeJS]
you'll need to [download it].

### up and running

1. Fork and clone this repo
2. `cd captain-hook`
3. `npm install`
4. Copy `.envsample` to `.env` and fill it out

  | variable                   | description                                                                                                                                                                 |
  |------------------ |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | SLACK_API_TOKEN   | Bot API token. You can find this on the Slack Developers site by navigating: Browse Apps > Custom Integrations > Bots Configurations on {{team_name}} > Edit configuration  |
  | SLACK_CHANNEL_ID  | Name of the channel, i.e. #testing. Can also be ID number retrieved from the Slack API.                                                                                     |
  | SHARED_SECRET     | Any string.                                                                                                                                                                 |
5. `npm run dev`, runs `npm start` and pipes output to nice logging
  You now have a service running on [`localhost:6666`]. You'll probably want to expose
  that to the internet for local development. [`ngrok`] is a great, free option.

[NodeJS]: https://nodejs.org
[download it]: https://nodejs.org
[`localhost:6666`]: http://localhost:6666
[`ngrok`]: https://ngrok.com/
