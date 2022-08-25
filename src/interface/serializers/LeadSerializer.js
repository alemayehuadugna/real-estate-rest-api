'use strict';

const _serializeSingleLead = (lead) => {
    return {
        'leadId': lead.leadId,
        'agentId': lead.agentId,
        'userId': lead.userId,
        'propertyId': lead.propertyId,
        'type': lead.type,
        'startDate': lead.startDate,
        'endDate': lead.endDate,
        'progress': lead.progress,
        'description': lead.description,

    };
};


module.exports = class {
    serialize(data) {
        if(!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleLead);
        }
        return _serializeSingleLead(data);
    }
}