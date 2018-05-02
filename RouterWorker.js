const { Router } = require('express');

/**
 * This class allows other routers to have one worker.
 * Every router must implement this class
 *
 * @class RouterWorker
 */
module.exports = class RouterWorker {

    /**
    * One getter with the verbs for convinience
    * 
    * @static
    */
    static get VERBS() {
        return {
            get : 'get',
            post: 'post',
            put: 'put',
            patch: 'patch',       
            delete: 'delete'       
        }
    }

    /**
     * Creates an instance of RouterWorker.
     *
     * @memberof RouterWorker
     */
    constructor () {
        this.router = Router();
        this.customResponse = undefined;
    }

    /**
     * Returns the express router instance of the class.
     *
     * @returns {Object} The configured router.
     * @memberof RouterWorker
     */
    get configuredRouter () {
        return this.router;
    }

    /**
     * Sets the router controller to be user when registering the route.
     *
     * @param {Object} controller - The controller responsible for the flow.
     * @memberof RouterWorker
     */
    set controller (controller) {
        this.workerController = controller;
    }

    /**
     * Setter to set the router entry point.
     *
     * @param {string} entry - One string representing the entry router path.
     * @memberof RouterWorker
     */
    set entry (entry) {
        this.routerEntry = entry;
    }
    
    /**
     * This function allows the dev to set custom response for the router instance.
     * 
     * @param {Function} - The function that will handle the router response and custom it.          
     */
    set routerCustomResponse(response) {
        this.customResponse = response;
    }

    /**
     * Register one new route on the router and setts ist callback.
     *
     * @param {Object} config - The object with the configurations for the endpoint.
     * @memberof RouterWorker
     */
    registerRoute (config) {        
        console.log(`[REGISTER ROUTE] ${config.method} -> ${this.routerEntry}${config.path || ''}`);
        this.router[config.method](config.path || '', (req, res, next) => {

            let mergedRequest = Object.assign(req.params, req.body);
            mergedRequest = Object.assign(mergedRequest, req.query);
            mergedRequest = Object.assign(mergedRequest, req.files);
            
            config.controllerAction.call(this.workerController, mergedRequest)
                .then( result => res.json(this.customResponse ? this.customResponse(result) : result) )
                .catch(next);
        });            
    }
};
