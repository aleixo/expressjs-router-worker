# expressjs-router-worker

This module helps newcomers to build one router event if they do not understand the routing. The main porpouse
is to decouple the app from express-js, skip boilerplate code and easily maintain the same behaviour in the API.

In fact. It is for my usage, but anyone is welcome to use and/or sugest improvements.

## Example

There is one usage example in ```example_usage.js``` and ```app.js``` files.

I recomend that you use four layers:
1. Router with express logic and this module.
2. Controller to controll the flow for the endpoint
3. Db to define the db queries. You can use pg-worker module to simplify things
4. Utils some logic that does not match on the previous layers

Of course you can have other things or not having it at all. It´s up to you


## TODO

1. Provide other registering mechanisms or allow to inject a way you want output response.
2. Throw errors in case router is not well configured