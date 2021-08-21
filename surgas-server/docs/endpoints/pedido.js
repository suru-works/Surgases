module.exports = {
    '/pedidos': {
        get: {
            tags: ['pedido'],
            summary: 'Retrieve a list of orders',
            description: 'Retrieve a list of orders based on search criteria.',
            parameters: [
                {
                    in: 'query',
                    name: 'fechaMinima',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'fechaMaxima',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'numeroMinimo',
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    in: 'query',
                    name: 'numeroMaximo',
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    in: 'query',
                    name: 'horaMinima',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'horaMaxima',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'direccion',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'municipio',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'precioBrutoMinimo',
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    in: 'query',
                    name: 'precioBrutoMaximo',
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    in: 'query',
                    name: 'precioFinalMinimo',
                    schema: {
                        type: 'number'
                    }
                },
                {
                    in: 'query',
                    name: 'precioFinalMaximo',
                    schema: {
                        type: 'number'
                    }
                },
                {
                    in: 'query',
                    name: 'estado',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'bodega',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'puntosMinimos',
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    in: 'query',
                    name: 'puntosMaximos',
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    in: 'query',
                    name: 'tipoCliente',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'nota',
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'List of orders matching search criteria.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        fecha: {
                                            type: 'string',
                                            example: '2021-08-01'
                                        },
                                        numero: {
                                            type: 'integer',
                                            example: '3'
                                        },
                                        hora_registro: {
                                            type: 'string',
                                            example: '12:20'
                                        },
                                        direccion: {
                                            type: 'string',
                                            example: 'Calle 10 #10-10'
                                        },
                                        municipio: {
                                            type: 'string',
                                            example: 'Medellin, Antioquia'
                                        },
                                        precio_bruto: {
                                            type: 'integer',
                                            example: '100000'
                                        },
                                        precio_final: {
                                            type: 'number',
                                            example: '880000.50'
                                        },
                                        estado: {
                                            type: 'string',
                                            example: 'pago'
                                        },
                                        bodega: {
                                            type: 'string',
                                            example: 'Los Colores'
                                        },
                                        puntos_compra: {
                                            type: 'integer',
                                            example: '100'
                                        },
                                        tipo_cliente: {
                                            type: 'string',
                                            example: 'natural'
                                        },
                                        nota: {
                                            type: 'string',
                                            example: 'Se entrega en dos tandas.'
                                        },
                                        empleado_vendedor: {
                                            type: 'string',
                                            example: '1111111111'
                                        },
                                        empleado_repartidor: {
                                            type: 'string',
                                            example: '2222222222'
                                        },
                                        cliente_pedidor: {
                                            type: 'string',
                                            example: '3333333333'
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
            tags: ['pedido'],
            summary: 'Create an order',
            description: 'Create an order with the specified information.',
            parameters: [
                {
                    in: 'body',
                    name: 'direccion',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'municipio',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'bodega',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'nota',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'empleado_vendedor',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'cliente_pedidor',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'productos',
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                codigo: {
                                    type: 'integer',
                                    example: '202'
                                },
                                precio: {
                                    type: 'integer',
                                    example: '50000'
                                },
                                cantidad: {
                                    type: 'integer',
                                    example: '2'
                                }
                            }
                        }
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Order created successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    fecha: {
                                        type: 'string',
                                        example: '2021-08-21'
                                    },
                                    numero: {
                                        type: 'integer',
                                        example: '1'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'User is not logged in.'
                }
            }
        }
    },
    '/pedidos/{fecha}/{numero}': {
        put: {
            tags: ['pedido'],
            summary: 'Update an order',
            description: 'Update an order with the specified information.',
            parameters: [
                {
                    in: 'path',
                    name: 'fecha',
                    description: "The order's date of creation.",
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'path',
                    name: 'numero',
                    description: "The order's number.",
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    in: 'body',
                    name: 'direccion',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'municipio',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'estado',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'bodega',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'nota',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'empleado_repartidor',
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Order updated successfully.'
                },
                401: {
                    description: 'User is not logged in.'
                }
            }
        }
    },
    '/pedidos/{fecha}/{numero}/productos': {
        get: {
            tags: ['pedido'],
            summary: 'Retrieve a list of products from an order',
            description: 'Retrieve a list of products included in an order.',
            parameters: [
                {
                    in: 'path',
                    name: 'fecha',
                    description: "The order's date of creation.",
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'path',
                    name: 'numero',
                    description: "The order's number.",
                    schema: {
                        type: 'integer'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'List of products included in an order.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        codigo: {
                                            type: 'integer',
                                            example: '202'
                                        },
                                        nombre: {
                                            type: 'string',
                                            example: 'Gas Propano'
                                        },
                                        color: {
                                            type: 'string',
                                            example: 'Verde'
                                        },
                                        peso: {
                                            type: 'number',
                                            example: '50.0'
                                        },
                                        tipo: {
                                            type: 'string',
                                            example: 'Pipeta'
                                        },
                                        precio: {
                                            type: 'integer',
                                            example: '50000'
                                        },
                                        cantidad: {
                                            type: 'integer',
                                            example: '2'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'User is not logged in.'
                }
            }
        }
    },
    '/pedidos/stats': {
        get: {
            tags: ['pedido'],
            summary: 'Retrieve the amount of orders by day',
            description: 'Retrieve the amount of orders by day.',
            responses: {
                200: {
                    description: 'Amount of orders by day',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        fecha: {
                                            type: 'string',
                                            example: '2021-08-21'
                                        },
                                        cantidad: {
                                            type: 'integer',
                                            example: '1'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/pedidos/print': {
        post: {
            tags: ['pedido'],
            summary: 'Print the receipt of an order',
            description: 'Print the receipt of an order.',
            parameters: [
                {
                    in: 'body',
                    name: 'fecha',
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'numero',
                    schema: {
                        type: 'integer'
                    }
                }
            ]
        }
    }
}