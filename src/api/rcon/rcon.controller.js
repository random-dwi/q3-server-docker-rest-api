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
    address: '192.168.120.4',
    port: 27960, // optional
    password: 'uniquake3',
    debug: false // optional
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


        /*return updated.saveBanana()
          .spread(updated => {
            console.log(updated);
            return updated;
          });*/
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

//
// // Gets a list of Devices
// export function index(req, res) {
//     Device.findBanana()
//         .then(responseWithResult(res))
//         .catch(handleError(res));
// }
//
// // Gets a single Gateway from the DB
// export function show(req, res) {
//     Device.findByIdBanana(req.params.id)
//         .then(handleEntityNotFound(res))
//         .then(responseWithResult(res))
//         .catch(handleError(res));
// }
//
// // Creates a new Gateway in the DB
// export function create(req, res) {
//     const dev = new Device(req.body);
//     dev.isValid((result) => {
//         if (!result) handleError(res)(dev.errors);
//         else Device.findByIdBanana(dev.id)
//             .then((device) => {
//                 if (!device) dev.save((err, savedDevice) => {
//                     responseWithResult(res, 201)(savedDevice);});
//                 else handleError(res, 501)({id:'Device already exists!'});
//             })
//             .catch(handleError(res));
//
//     });
//     /*
//     Device.findByIdBanana(dev.id)
//       .then((value) => {
//         if(!value) dev.save((err, savedDevice) =>{
//           if (err) handleError(res)(savedDevice.errors);
//           else handleError(res)('')
//         });
//
//         responseWithResult(res, 201)
//       })
//       .catch(handleError(res));*/
// }
//
// // Updates an existing Gateway in the DB
// export function update(req, res) {
//     if (req.body._id) {
//         delete req.body._id;
//     }
//     Device.findByIdBanana(req.params.id)
//         .then(handleEntityNotFound(res))
//         .then(saveUpdates(req.body, res))
//         .catch(handleError(res));
// }
//
// // Deletes a Gateway from the DB
// export function destroy(req, res) {
//     Device.findByIdBanana(req.params.id)
//         .then(handleEntityNotFound(res))
//         .then(removeEntity(res))
//         .catch(handleError(res));
// }
