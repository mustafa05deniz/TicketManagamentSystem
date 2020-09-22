const userFunctions = require('../functions/users');
const TicketFunctions = require('../functions/ticket');
const response = require('../_helpers/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = {

    TicketsWithFilter: async function (req, res, next) {
        console.log(req.query)
        await userFunctions.checkUserRole(0,req.body.userId).then(async checkUser=>{
            if(checkUser && req.query.filter){
                await TicketFunctions.filter(req.query).then(results=>{
                    response.successResponse(res, 'succesfuly', 'data', results);
                }).catch(err=>{
                    response.ErrorResponse(res, 'tickets found error : '+err);
                })
            }else{
                await TicketFunctions.FindAllWithKey("userId",req.body.userId).then(results=>{
                    response.successResponse(res, 'succesfuly', 'data', results);
                }).catch(err=>{
                    response.ErrorResponse(res, 'tickets found error : '+err);
                })
            }

        }).catch(err=>{
            response.ErrorResponse(res, 'this role has not allow this page');
        })
        
    },

	addTicket: async function (req, res, next) {
        console.log("burda",req.files)
        await userFunctions.checkUserRole(0,req.body.userId).then(async isAdmin=>{
            console.log(isAdmin)
            var ticketCount = await TicketFunctions.ticketCount();
            const url = req.protocol + '://' + req.get('host');
            console.log(req.body);
            var file_list = [];
            for (let index = 0; index < req.files.length; index++) {
                file_list.push(url + '/public/' +req.files[index].filename)
            }
            console.log(file_list);
            await userFunctions.FindWithKey("_id",req.body.userId).then(async userInfo=>{
                const data  = {
                    "title":req.body.title,
                    "userId":req.body.userId,
                    "userEmail":userInfo.email,
                    "files":file_list,
                    "ticketCount":parseInt(ticketCount)+1,
                    "messages":{
                        "text":req.body.text,
                        "role":isAdmin ? 0 : 1
                    }
                }
                await TicketFunctions.push(data).then(result=>{
                    response.successResponse(res, 'succesfuly', 'data', result);
                }).catch(err=>{
                    response.ErrorResponse(res, 'ticket add error   : ' + err);
                })
            }).catch(err=>{
                response.ErrorResponse(res, 'ticket add error   : ' + err);
            })
            
        }).catch(err=>{
            response.ErrorResponse(res, 'this role has not allow this page');
        })
        
    },
    addMessageToTicket: async function (req, res, next) {
        const url = req.protocol + '://' + req.get('host');
        console.log(req.body);
        var file_list = [];
        for (let index = 0; index < req.files.length; index++) {
            file_list.push(url + '/public/' +req.files[index].filename)
        }
        await userFunctions.checkUserRole(0,req.body.userId).then(async isAdmin=>{
            const data  = {
                "messages":{
                    "text":req.body.message,
                    "role":isAdmin ? 0 : 1,
                    "files":file_list
                }
            }
    
            await TicketFunctions.update(0,"push","_id",req.body.ticketId,data,null,null).then(result=>{
                response.successResponse(res, 'succesfuly', 'data', result);
            }).catch(err=>{
                response.ErrorResponse(res, 'ticket add error   : ' + err);
            })
        }).catch(err=>{
            response.ErrorResponse(res, 'this role has not allow this page');
        })
    },
    changeStatus: async function (req, res, next) {
        console.log("help")
        await userFunctions.checkUserRole(0,req.body.userId).then(async isAdmin=>{
            const data  = {
                "status":req.body.status
            }
    
            await TicketFunctions.update(0,"set","_id",req.body.ticketId,data,null,null).then(result=>{
                response.successResponse(res, 'succesfuly', 'data', result);
            }).catch(err=>{
                response.ErrorResponse(res, 'ticket add error   : ' + err);
            })
        }).catch(err=>{
            response.ErrorResponse(res, 'this role has not allow this page');
        })
    },
    deleteMessageToTicket: async function (req, res, next) {
        console.log("help")
        await userFunctions.checkUserRole(0,req.body.userId).then(async isAdmin=>{
            console.log(isAdmin)
            if(isAdmin){
                await TicketFunctions.deleteWithNestedArray("_id",req.body.ticketId,"messages","_id",req.body.messageId).then(result=>{
                    response.successResponse(res, 'succesfuly', 'data', result);
                }).catch(err=>{
                    response.ErrorResponse(res, 'ticket add error   : ' + err);
                })
            }else{
                response.ErrorResponse(res, 'this role has not allow this page');
            }
            
        }).catch(err=>{
            response.ErrorResponse(res, 'this role has not allow this page');
        })
    },
    search:async function(req,res,next){
        await TicketFunctions.filter(req.query).then(results=>{
            response.successResponse(res, 'succesfuly', 'data', results);
        }).catch(err=>{
            response.ErrorResponse(res, 'tickets found error : '+err);
        })
    },
    List:async function(req,res,next){
        await TicketFunctions.list().then(results=>{
            response.successResponse(res, 'succesfuly', 'data', results);
        }).catch(err=>{
            response.ErrorResponse(res, 'tickets found error : '+err);
        })
    }



};