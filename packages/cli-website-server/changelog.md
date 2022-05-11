# **@carnesen/cli-website-server** changelog

## Upcoming

## carnesen-cli-website-server-2022.5.0 (2022-05-10)



## carnesen-cli-website-server-2022.2.0 (2022-02-26)

- Internal: Upgrade dependencies

## 2021.2.1
Upgrade to @carnesen/cli@0.5.1

# 2020.7.3
Update @carnesen/cli-website to 2020.7.3

# 2020.7.2
Update @carnesen/cli-website to 2020.7.2

# 2020.7.1
Update @carnesen/cli-website to 2020.7.1

# 2020.7.0
Update @carnesen/cli-website to 2020.7.0

# 2020.6.4
Update @carnesen/cli-website to 2020.6.4

# 2020.6.3
Initial release!

Implement a Node.js http server using [koa](https://koajs.com/) that serves `@carnesen/cli-website` and `@carnesen/cli/dist` as static sites.

Previously the website was hosted as a static website on Google Cloud Platform. Serving it via a Node.js server will give us flexibility to more easily implement things like multiple version hosting, redirects, etc. all in everybody's favorite language TypeScript.
