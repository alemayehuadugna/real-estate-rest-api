'use strict'
const moment = require('moment');

module.exports = async (limit, page, { leadRepository }) =>{
    const lead = await leadRepository.find(limit, page);
    for(var i=0; i<lead.length;i++) { 
        var startDate = moment(String(lead[i].startDate)).format('YYYY/MM/DD hh:mm')
        var endDate = moment(String(lead[i].endDate)).format('YYYY/MM/DD hh:mm')
        lead[i].startDate = startDate
        lead[i].endDate=  endDate
    }
    return lead;
}