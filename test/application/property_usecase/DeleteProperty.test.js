'use strict';

const PropertyRepository = require('../../../src/domain/repository/PropertyRepository');
const mockPropertyRepository = new PropertyRepository();
const DeleteProperty = require('../../../src/application/property_usecase/DeleteProperty');

test('should resolve delete (without result)', async () => {
    //given
    mockPropertyRepository.delete = jest.fn(() => true);

    //when
    await DeleteProperty(123, {propertyRepository: mockPropertyRepository});

    //then
    expect(mockPropertyRepository.delete).toHaveBeenCalledWith(123);
});