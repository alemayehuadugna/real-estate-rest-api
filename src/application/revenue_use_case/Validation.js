'use strict';
const Moment = require('moment');

module.exports = {
    
    async validateCreateInput(totalIncome, date){
        // validate revenue input to create revenue
        if(!totalIncome ||!date){
            throw new Error("error null input");
        }

        //validating income
        const incomeRegx = /\d+/;
        if(!(incomeRegx.test(totalIncome) && totalIncome > 0)){
            throw new Error("Income can only be digit greater than 1 birr");
        }

        // validating date 
        var today = new Date();
        var tDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        tDate = tDate.split("-");
        var tempDate = date.split("-");
        date = Moment(date, "YYY-MM-DD").isValid();
        if(!date){
            throw new Error("Invalid date");
        }else if(parseInt(tempDate[0]) > parseInt(tDate[0])){
            throw new Error("no future year allowed");
        }else if(parseInt(tempDate[0]) === parseInt(tDate[0]) && parseInt(tempDate[1]) > parseInt(tDate[1])){
            throw new Error("no future month allowed");
        }else if(parseInt(tempDate[0]) === parseInt(tDate[0]) && parseInt(tempDate[1]) === parseInt(tDate[1]) && parseInt(tempDate[2]) > parseInt(tDate[2])){
            throw new Error("no future day allowed");
        }

    },

    async validateUpdate(revenueId, date, income){
        // validating date
        if(!revenueId || !date || !income){
            throw new Error("error null input");
        }
        
        //validating income
        const incomeRegx = /\d+/;
        if(!(incomeRegx.test(income) && income > 0)){
            throw new Error("Income can only be digit greater than 1 birr");
        }

        // converting to normal date format
        var today = new Date();
        var tDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        tDate = tDate.split("-");
        var tempDate = date.split("-");
        date = Moment(date, "YYY-MM-DD").isValid();
        if(!date){
            throw new Error("Invalid date");
        }else if(parseInt(tempDate[0]) > parseInt(tDate[0])){
            throw new Error("no future year allowed");
        }else if(parseInt(tempDate[0]) === parseInt(tDate[0]) && parseInt(tempDate[1]) > parseInt(tDate[1])){
            throw new Error("no future month allowed");
        }else if(parseInt(tempDate[0]) === parseInt(tDate[0]) && parseInt(tempDate[1]) === parseInt(tDate[1]) && parseInt(tempDate[2]) > parseInt(tDate[2])){
            throw new Error("no future day allowed");
        }

    }
}





