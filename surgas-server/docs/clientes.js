module.exports = {
    paths: {
        '/clientes': {
            get: {
                summary: 'Retrieve a list of clients',
                description: 'Retrieve a list of clients based on search criteria.',
                parameters: [
                    {
                        in: 'query',
                        name: 'telefono',
                        schema: {
                            type: 'string'
                        },
                        description: 'Telephone number to query.'
                    },
                    {
                        in: 'query',
                        name: 'email',
                        schema: {
                            type: 'string'
                        },
                        description: 'Email address to query.'
                    },
                    {
                        in: 'query',
                        name: 'nombre',
                        schema: {
                            type: 'string'
                        },
                        description: 'Name to query.'
                    },
                    {
                        in: 'query',
                        name: 'fechaRegistroMinima',
                        schema: {
                            type: 'string'
                        },
                        description: 'Minimum registration date to query.'
                    },
                    {
                        in: 'query',
                        name: 'fechaRegistroMaxima',
                        schema: {
                            type: 'string'
                        },
                        description: 'Maximum registration date to query.'
                    },
                    {
                        in: 'query',
                        name: 'puntosMinimos',
                        schema: {
                            type: 'integer'
                        },
                        description: 'Minimum accumulated points to query.'
                    },
                    {
                        in: 'query',
                        name: 'puntosMaximos',
                        schema: {
                            type: 'integer'
                        },
                        description: 'Maximum accumulated points to query.'
                    },
                    {
                        in: 'query',
                        name: 'tipo',
                        schema: {
                            type: 'string'
                        },
                        description: 'Type to query.'
                    },
                    {
                        in: 'query',
                        name: 'fechaPedidoMinima',
                        schema: {
                            type: 'string'
                        },
                        description: 'Minimum last order date to query.'
                    },
                    {
                        in: 'query',
                        name: 'fechaPedidoMaxima',
                        schema: {
                            type: 'string'
                        },
                        description: 'Maximum last order date to query.'
                    },
                    {
                        in: 'query',
                        name: 'numeroUltimoPedidoMinimo',
                        schema: {
                            type: 'integer'
                        },
                        description: 'Minimum last order number to query.'
                    },
                    {
                        in: 'query',
                        name: 'numeroUltimoPedidoMaximo',
                        schema: {
                            type: 'integer'
                        },
                        description: 'Maximum last order number to query.'
                    },
                    {
                        in: 'query',
                        name: 'numeroPedidosMinimo',
                        schema: {
                            type: 'integer'
                        },
                        description: 'Minimum total amount of orders to query.'
                    },
                    {
                        in: 'query',
                        name: 'numeroPedidosMaximo',
                        schema: {
                            type: 'integer'
                        },
                        description: 'Maximum total amount of orders to query.'
                    }
                ],
                responses: {
                    200: {
                        description: 'A list of clients',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        telefono: {
                                            type: 'string',
                                            description: "The client's telephone number.",
                                            example: '3333333333'
                                        },
                                        email: {
                                            type: 'string',
                                            description: "The client's email address.",
                                            example: 'johndoe@example.com'
                                        },
                                        nombre: {
                                            type: 'string',
                                            description: "The client's name.",
                                            example: 'John Doe'
                                        },
                                        fecha_registro: {
                                            type: 'string',
                                            description: "The client's date of registration.",
                                            example: '2021-08-19'
                                        },
                                        puntos: {
                                            type: 'integer',
                                            description: "The client's total accumulated points.",
                                            example: '100'
                                        },
                                        tipo: {
                                            type: 'string',
                                            description: "The client's type (person or company).",
                                            example: 'natural'
                                        },
                                        fecha_ultimo_pedido: {
                                            type: 'string',
                                            description: "The date of the client's last order.",
                                            example: '2021-08-19'
                                        },
                                        numero_ultimo_pedido: {
                                            type: 'integer',
                                            description: "The number of the client's last order.",
                                            example: '1'
                                        },
                                        numero_pedidos: {
                                            type: 'integer',
                                            description: "The client's total amount of orders made.",
                                            example: '1'
                                        },
                                        promotor: {
                                            type: 'string',
                                            description: "The employee that recommended the company to the client.",
                                            example: 'Jason Doe'
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
}