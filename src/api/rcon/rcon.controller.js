/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/devices              ->  index
 * POST    /api/devices              ->  create
 * GET     /api/devices/:id          ->  show
 * PUT     /api/devices/:id          ->  update
 * DELETE  /api/devices/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Q3RCon from 'quake3-rcon'
import { parseStatus, parseServerInfo } from './rcon.utils'

const rcon = new Q3RCon({
    address: process.env.Q3SERV_HOST || '192.168.120.4',
    port: process.env.Q3SERV_PORT || 27960, // optional
    password: process.env.Q3SERV_PASS || 'uniquake3',
    debug: process.env.Q3SERV_RCON_DBG || false // optional
});

function rconP(cmd) {
    return new Promise((resolve, reject) => {
        try {
            rcon.send(cmd, function(response) {
                resolve(response);
            });
        } catch (e) {
            reject(e)
        }
    })
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function mapToArray() {
    return function(rconData) {
        if (rconData) {
            return rconData.split('\n')
        }
    };
}



function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity || !entity.trim()) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates, res) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.save((err, savedDevice) => {
            console.log(err);
            console.log(savedDevice);
            if (err) handleError(res)(savedDevice.errors);
            else responseWithResult(res, 203)(savedDevice);
        });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.destroy(() => res.status(204)
                .end());
            //return entity.destroyBanana().then(res.status(204).end());
        }
    };
}


export function command(cmd){
    return function (req,res) {
        rconP(cmd || req.params.cmd)
            .then(mapToArray())
            .then(responseWithResult(res))
            .catch(handleError(res));
    }
}

export function status(){
    return function (req,res) {
        rconP('status')
            .then(parseStatus())
            .then(responseWithResult(res))
            .catch(handleError(res));
    }
}
export function serverinfo(){
    return function (req,res) {
        rconP('serverinfo')
            .then(parseServerInfo())
            .then(responseWithResult(res))
            .catch(handleError(res));
    }
}

export function setVar(req,res) {
    let cmd = `${req.body.q3var}`;
    cmd = req.body.value ? `${cmd} ${req.body.value}` : cmd;
    rconP(cmd)
        .then(parseServerInfo())
        .then(responseWithResult(res))
        .catch(handleError(res));
}