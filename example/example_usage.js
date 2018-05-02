const Worker = require('expressjs-router-worker');
const Controller = require('./MyController');

/**
 * This class allows user to build one Activity router.
 *
 * @class Router
 * @extends {RouterWorker}
 */
module.exports = class Router extends Worker {
    /**
     * Builds one new instance and registers the router routes.
     *
     * @memberof Router
     */
    constructor () {
        super();
        //The controller. This layer totaly decouples your app from expressjs. Controll the flow there
        this.controller = new Controller();
        //Set the entry point to be used latter on app.js
        this.entry = '/router';
        //Set custom response on router
        this.routerCustomResponse = (response) => {
            return [
                response
            ]
        }
        //Build the router
        this.build();
    }

    /**
     * Builds the router registering the routes.
     *
     * @memberof Router
     */
    build () {             
        //Notice that first two routes do not have path. That is because they will be on router 
        //route pass, so you can omit it
        this.registerRoute({                        
            method: Worker.VERBS.get,
            controllerAction: this.workerController.getNextNumber,
        });    

        this.registerRoute({            
            method: Worker.VERBS.post,
            controllerAction: this.workerController.insertNumber,
        });    
        
        this.registerRoute({
            path: '/probability',
            method: Worker.VERBS.get,
            controllerAction: this.workerController.getProbability,
        });    
    }       
};
