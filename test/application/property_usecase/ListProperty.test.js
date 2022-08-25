
const PropertyRepository = require('../../../src/domain/repository/PropertyRepository');
const mockPropertyRepository = new PropertyRepository();
const ListProperties = require('../../../src/application/property_usecase/ListProperty');

test('should resolve with all the property persisted in repository', async () => {
    // given
    mockPropertyRepository.find = () => ['Home1', 'Home2'];

    // when
    const properties = await ListProperties({ propertyRepository: mockPropertyRepository });

    // then
    expect(properties).toEqual(['Home1', 'Home2']);
}) 