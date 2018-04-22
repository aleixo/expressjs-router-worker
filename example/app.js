const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const Router = require('./example_usage');

const app = express();
const port = process.env.PORT || 3000;

const usersRouter = new UsersRouter();
const activityRouter = new ActivityRouter();
const authenticationRouter = new AuthenticationRouter();
const configurationRouter = new ConfigurationRouter();
const eventsRouter = new EventsRouter();

const router = new Router();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// The module exposes routerEntry and configured router with the router endpoints registered
app.use(router.routerEntry, router.configuredRouter);

app.listen(port, function() {
    console.log(`Runpetitor started on port ${port}`);
});

module.exports = app;
