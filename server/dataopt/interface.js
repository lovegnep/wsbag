const Config = require('../config');
const Logger = require('../common/logger');
const Model = require('./model'); 

//new collection
function newCollection(data){
    if(!data || !data.url){
        return Logger.error('newCollection !data || !data.url');
    }
    let collection = new Model.Collection({
        url: data.url,
	abstract: data.abstract,
	account: data.account
    });
    collection.save(function(err, doc){
        if(err){
	    Logger.error('newCollection: save error.', data);
	}else{
	    Logger.debug('newCollection: save success.', data);
	}
    });
	
}


exports = {
    
};
Object.assign(module.exports, exports);
