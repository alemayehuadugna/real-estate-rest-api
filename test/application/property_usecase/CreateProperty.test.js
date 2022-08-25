'use strict';

const Property = require('../../../src/domain/entities/Property');
const Address = require('../../../src/domain/entities/Address');
const Room = require('../../../src/domain/entities/Room');
const GeoLocation = require('../../../src/domain/entities/GeoLocation');

const PropertyRepository = require('../../../src/domain/repository/PropertyRepository');
const mockUserRepository = new PropertyRepository();
const CreateProperty = require('../../../src/application/property_usecase/CreateProperty');

test('should resolve with the newly created user (augmented with an ID)', async () => {
    //given
    const rooms = [];
    rooms.push(new Room("bedroom", 5, 4, 120, 'http://something'));
    rooms.push(new Room("bedroom", 5, 4, 120, 'http://something'));
    const location = new GeoLocation();
    const address = new Address('oromia', 'jimma', '03', 'ginjo guduru', '565',  'kochi', 'Home', 3);
    const persistedProperty = new Property(123, 456, 'this is a test', 12000, address, 6532, 5, 7, 3, 1, rooms, 18, true, location, [], "villa", "forSale");
    
    mockUserRepository.create = jest.fn(() => persistedProperty);

    //when
    const property = await CreateProperty(456, 'this is a test', 12000, address, 6532, 5, 7, 3, 1, rooms, 18, true, location, [], "villa", "forSale", {propertyRepository: mockUserRepository});

    //then
    expect(mockUserRepository.create).toHaveBeenCalledWith(new Property(null, 456, 'this is a test', 12000, address, 6532, 5, 7, 3, 1, rooms, 18, true, location, [], "villa", "forSale"));
    expect(property).toEqual(persistedProperty);
});