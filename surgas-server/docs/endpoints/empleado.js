module.exports = {
    '/empleados': {
        get: {
            tags: ['empleado'],
            summary: 'Retrieve a list of employees',
            description: 'Retrieve a list of employees based on search criteria.',
            parameters: [
                {
                    in: 'query',
                    name: 'id',
                    description: 'ID to query.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'nombre',
                    description: 'Name to query.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'direccion',
                    description: 'Physical address to query.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'telefono',
                    description: 'Telephone number to query.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'estado',
                    description: 'State to query.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'tipo',
                    description: 'Type to query.',
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'List of employees matching search criteria.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            example: '1111111111'
                                        },
                                        nombre: {
                                            type: 'string',
                                            example: 'John Doe'
                                        },
                                        direccion: {
                                            type: 'string',
                                            example: 'Calle 10 #10-10, Medellin, Antioquia'
                                        },
                                        telefono: {
                                            type: 'string',
                                            example: '3333333333'
                                        },
                                        estado: {
                                            type: 'string',
                                            example: 'activo'
                                        },
                                        tipo: {
                                            type: 'string',
                                            example: 'vendedor'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['empleado'],
            summary: 'Create an employee',
            description: 'Create an employee with the specified information',
            parameters: [
                {
                    in: 'body',
                    name: 'id',
                    description: 'ID to insert.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'nombre',
                    description: 'Name to insert.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'direccion',
                    description: 'Physical address to insert.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'telefono',
                    description: 'Telephone number to insert.',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'tipo',
                    description: 'Type to insert.',
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Employee created successfully.'
                },
                401: {
                    description: 'User is not logged in.'
                },
                403: {
                    description: 'User is not an admin.'
                }
            }
        }
    },
    '/empleados/{id}': {
        put: {
            tags: ['empleado'],
            summary: 'Update an employee',
            description: 'Update an employee with the specified information.',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: "The employee's ID.",
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'id',
                    description: "New ID.",
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'nombre',
                    description: "New name.",
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'direccion',
                    description: "New physical address.",
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'telefono',
                    description: "New telephone number.",
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'estado',
                    description: "New state.",
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'tipo',
                    description: "New type.",
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Employee updated successfully.'
                },
                401: {
                    description: 'User is not logged in.'
                },
                403: {
                    description: 'User is not an admin.'
                }
            }
        },
        delete: {
            tags: ['empleado'],
            summary: 'Delete an employee',
            description: 'Delete an employee.',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: "The employee's ID.",
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Employee deleted successfully.'
                },
                401: {
                    description: 'User is not logged in.'
                },
                403: {
                    description: 'User is not an admin.'
                }
            }
        }
    }
}