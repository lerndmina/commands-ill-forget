---
title: EasyPanel
description: A guide for all the weird things I had to figure out about EasyPanel.
---

<!-- 
- [x] Brief intro (personal reason for choosing easypanel)
- [x] How to install easypanel
- [x] How to set a custom domain
- [ ] Why that custom domain doesn't work everywhere & how to manually set it where needed
- [ ] Converting docker-compose to easypanel and why it won't work every time
 -->


# Welcome
Recently I decided to reset my home server from scratch. It was a mess. I had a bunch of disparate services, some in docker, some on bare metal. It was a massive headache to manage all the reverse proxies through nginx manually. I didn't want to do that anymore.

I decided to use [EasyPanel](https://easypanel.io/), a server control panel that allows you to easily manage your server. It's been mostly great but there are still a few weird quirks that I had to get used to, but first here's how to install it.

## How do I install it?
Well I'm glad you asked. Firstly read the [EasyPanel docs](https://easypanel.io/docs) as that'll always be more up to date than this guide. But if you're here, you probably want a quick rundown.

First, install docker, use the command below or follow the instructions on the [Docker Docs](https://docs.docker.com/engine/install/). Oooor follow your distro's instructions, but I'm not going to cover that here.
```bash
curl -sSL https://get.docker.com | sh
```

Then install EasyPanel
```bash
sudo docker run --rm -it \
  -v /etc/easypanel:/etc/easypanel \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  easypanel/easypanel setup
```
:::note
"*Easypanel will install Docker Swarm and several other tools on your server. You should install it on a fresh server, otherwise, you risk facing unexpected errors.*" - [EasyPanel Docs](https://easypanel.io/docs)
:::
:::danger[Important]
"*Port 80 and 443 must be available and not blocked by your firewall as EasyPanel will take over all routing with traefik.*" - [EasyPanel Docs](https://easypanel.io/docs)
:::

## But how do I set a custom domain?
This is where things are a bit weird. What I'd reccomend is setting a wildcard DNS record for your domain with both pointing to your server's IP address. Then you can set a custom domain in the EasyPanel UI

### Making a wildcard DNS record
This is different for every DNS provider, but here's how you do it with Cloudflare. First go to your domain's DNS settings and add an A record with the name '@' and the value as your server's IP address. Then add a CNAME record with the name as '*' and the value as your domain name. This will make it so that all subdomaind and the root domain will point to your server.

Here's an example using the `commands.wiki` domain:
![Cloudflare DNS Settings](/src/assets/docs/selfhosting/easypanel/cloudflare-dns.png)
:::note
This is just an example, your DNS provider will look different, but the settings should be similar.
:::

### Setting a custom domain in EasyPanel
With your DNS records set up, you can set a custom domain in the EasyPanel UI. Go to the settings page and click on the "General" tab. Under the "Custom Domain" section, enter your custom domain and click "Save". It might be a good idea to make sure "Serve on IP Address" is toggled on so that you can still access the EasyPanel UI if neither of the domains work, at least for now.

![Custom Domain Settings Page](/src/assets/docs/selfhosting/easypanel/ep-custom-domain.png)
Now would be a good time to add your letsencrypt email and click "Save" again. This will allow letsencrypt to generate a certificate for your domain and send you an email if it's about to expire.

## Using my custom domain in services
Ok, you've got your root customdomain setup so easypanel now loads on `https://customdomain.com`. But what about all the other services you have running? Well, you can set a custom domain for each service in the EasyPanel UI, there are some gotchas but we'll get to that in a bit.

### Setting a custom domain for a service
We're skipping over a little bit here. I'm going to assume you already have a project and a service in your easypanel instance. If you don't, follow any of these [Quickstarts](https://easypanel.io/docs/quickstarts) and come back here.

Now, go to your service in the EasyPanel UI and click on the "Domains" tab. You'll notice that EasyPanel has already added a domain for you, it's a subdomain of the Default Domain we saw earlier. Click "Edit" and change the "Host" a subdomain of your custom domain. For example, if you have a service called `example` and your custom domain is `customdomain.com`, you could set the host to `example.customdomain.com`.

Here's an example of what that might look like:
![Service Domain Example](/src/assets/docs/selfhosting/easypanel/service-domain-example.png)

### Issues
I've noticed that EasyPanel doesn't have ways to set a domain for an app everywhere, for example when you have a MariaDB database and you enable PhpMyAdmin, you can't set a custom domain for it, EasyPanel will just autogenerate a domain based on your Default Domain. This is quite annoying and there isn't a way around it other than adding custom traefik configuration, which is beyond the scope of this.

## Boxes!
Boxes are a new type of service with EasyPanel, they allow you to set presets like PHP, WordPress etc. These allow you to have multiple services running under one container with modules that you can enable or disable. There's one module in particular that I've found useful, the "IDE" module. This spawns an instance of vscode that's running in the browser. It's very useful but there's no way to easily set a custom domain for it. Here's how I did it:

1. Log into your server via SSH
2. Navigate to the EasyPanel/traefik/config directory
```bash
cd /etc/easypanel/traefik/config
```
3. Open the main.yaml file in your favourite text editor
```bash
nano main.yaml
```
4. Search the file until you find the section for the IDE box loadbalancer, it should look something like this:

```json
"project-name_service-name-ide": {
  "loadBalancer": {
    "servers": [
      {
        "url": "http://project-name_service-name:9999"
      }
    ],
    "passHostHeader": true
  }
},
```
*Yes, I know this is JSON in a YAML file, this is how EasyPanel does it, don't ask me why.*

5. Grab the port number from the url, we're going to use this to set a custom domain for the IDE in the box. In this case, the port number is `9999`.
6. Navigate to the box service in the EasyPanel UI and click on the "Domains" tab.
7. Click "Add Domain" and set the host to a subdomain of your custom domain and the port to the port number you found earlier. For example, if you have a box called `wp-test` and your custom domain is `customdomain.com`, you could set the host to `wp-test-ide.customdomain.com` and the port to `9999`.
8. Click "Save" and you should now be able to access the IDE at the custom domain you set.
9. Navigate to the IDE tab in the box service and copy the "Token" value.
10.  Manually assemble the URL to the IDE, it should look something like this:
```
https://wp-test-ide.customdomain.com/?easypanel-token=your-token-here
```
11.  Paste the URL into your browser and you should be able to access the IDE.
:::note
If you don't include the `easypanel-token` in the URL you'll be unable to access the IDE
:::

## Converting docker-compose to EasyPanel
EasyPanel does not directly support docker-compose files, however, there is an [Online Converter](https://compose-to-easypanel.netlify.app/) that can help you convert your docker-compose file to an EasyPanel compatible format. It's not perfect and you'll likely have to make some changes to the generated file, but it's a good starting point. Here's a link to it's [GitHub Repo](https://github.com/ravenbroetzmann/compose-to-easypanel) which contains a readme with more information on how to use it.

:::note
With complex docker-compose files it may be easier to read through the file and manually add the services in EasyPanel.
:::