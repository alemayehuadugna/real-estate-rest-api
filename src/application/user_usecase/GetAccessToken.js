'use strict';

module.exports = async (phone, password, { userRepository, accessTokenManager }) => {
    const user = await userRepository.getByPhone(phone);

    if(!user || user.password !== password) {
        throw new Error('Bad credentials');
    }

    return accessTokenManager.generate({ uid: user.id, scope: user.role });
};