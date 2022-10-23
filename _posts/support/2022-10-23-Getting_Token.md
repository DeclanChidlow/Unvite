---
title: How to Get Your Token
---

To use Unvite, or any other alternative Revolt client, you will need your token.

First of all you should be warned. Your token allows complete control of your account and therefore should not be shared with somebody you don't trust.

## Easy Way
First, open Revite in your browser or the desktop app and login to your account.

Simultaniously hit Ctrl + Shift + I to open up your browsers dev tools.

Under the 'console' tab enter this string:
"window.state.auth.sessions.get(controllers.client.getReadyClient().user._id).session.token" 

Your token should now be displayed.

## Other Way
The other way to get your token is a tad more complex and therefore won't be included in this guide. You can checkout the more complex proccess on Infi's blog [here](https://infi.sh/post/revolt-tokens).
