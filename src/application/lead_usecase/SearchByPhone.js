'use strict';

module.exports = async (phone, { leadRepository, userRepository }) => {
    const user = await userRepository.getByPhone(phone);
    let lead;
    if(user.role.includes('Agent')) {
        lead = await leadRepository.findByAgentId(user.id);
    }else if(user.role.includes('User')) {
        lead = await leadRepository.findByUserId(user.id);
    }
    return lead;
}