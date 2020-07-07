# @carnesen/cli-website-server changelog

# 2020.7.0
Update @carnesen/cli-website to 2020.7.0

# 2020.6.4
Update @carnesen/cli-website to 2020.6.4

# 2020.6.3
Initial release!

Implement a Node.js http server using [koa](https://koajs.com/) that serves `@carnesen/cli-website` and `@carnesen/cli/dist` as static sites.

Previously the website was hosted as a static website on Google Cloud Platform. Serving it via a Node.js server will give us flexibility to more easily implement things like multiple version hosting, redirects, etc. all in everybody's favorite language TypeScript.
