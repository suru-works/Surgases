module.exports = {
    '/maps': {
        get: {
            tags: ['maps'],
            summary: 'Retrieve the Maps key',
            description: 'Retrieve the Google Maps API key.',
            responses: {
                200: {
                    description: 'Google Maps aPI key.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    key: {
                                        type: 'string',
                                        example: 'aaaaaaaaaaaaaaaaaaaa1111111111111111111'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}