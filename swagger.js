const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie & Group API',
      description: 'APIs to fetch movie data, including popular movies, details, genres, credits, and more from The Movie Database (TMDb). Also provides functionality for managing groups, memberships, and content.',
      version: '1.0.0',
      contact: {
        name: 'Afsaneh Heidari',
        email: 't3heaf00@students.oamk'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local Development Server'
      }
    ]
  },
  paths: {
    '/': {
      get: {
        summary: 'Welcome route',
        description: 'Returns a simple welcome message to the authenticated user.',
        operationId: 'getWelcomeMessage',
        security: [
          {
            BearerAuth: []
          }
        ],
        responses: {
          '200': {
            description: 'A welcome message to the authenticated user.',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                  example: 'Welcome to the route!'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized, if JWT token is missing or invalid.'
          }
        }
      }
    },
    '/login': {
      post: {
        summary: 'User login',
        description: 'Logs in a user by validating credentials.',
        operationId: 'loginUser',
        requestBody: {
          description: 'User login details',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'User logged in successfully.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Invalid credentials.'
          }
        }
      }
    },
    '/signup': {
      post: {
        summary: 'User signup',
        description: 'Registers a new user.',
        operationId: 'signUpUser',
        requestBody: {
          description: 'New user details for sign up.',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                  name: { type: 'string' }
                },
                required: ['email', 'password', 'name']
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User created successfully.'
          },
          '400': {
            description: 'Bad request, invalid input.'
          }
        }
      }
    },
    '/logout': {
      get: {
        summary: 'Log out user',
        description: 'Logs out the current user by clearing the JWT token.',
        operationId: 'logOutUser',
        responses: {
          '200': {
            description: 'User logged out successfully.'
          },
          '400': {
            description: 'Logout failed.'
          }
        }
      }
    },
    '/{userId}': {
      delete: {
        summary: 'Delete user',
        description: 'Deletes a user by their user ID.',
        operationId: 'deleteUser',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'The ID of the user to delete.',
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            BearerAuth: []
          }
        ],
        responses: {
          '200': {
            description: 'User deleted successfully.'
          },
          '401': {
            description: 'Unauthorized, if JWT token is missing or invalid.'
          },
          '404': {
            description: 'User not found.'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },  // Correctly set 'id' as an integer since it's a number in your TypeScript type
          email: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          profileUrl: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }  // Assuming the date format is 'date-time'
        }
      },
},
 
  paths: {
    // Movie API Routes
    '/movie/popular': {
      get: {
        summary: 'Retrieve popular movies',
        operationId: 'getPopularMovies',
        responses: {
          '200': {
            description: 'List of popular movies',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Movie'
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
    '/movie/{id}': {
      get: {
        summary: 'Retrieve movie details by ID',
        operationId: 'getMovieDetails',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The ID of the movie',
            schema: {
              type: 'integer'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Movie details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MovieDetails'
                }
              }
            }
          },
          '404': {
            description: 'Movie not found'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
    '/groups': {
      get: {
        summary: 'Get all groups',
        operationId: 'getGroups',
        responses: {
          '200': {
            description: 'List of all groups',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Group'
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error'
          }
        }
      },
      post: {
        summary: 'Create a new group',
        operationId: 'createGroup',
        responses: {
          '201': {
            description: 'Group created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Group'
                }
              }
            }
          },
          '400': {
            description: 'Invalid data provided'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
    '/groups/{groupId}/members/{userId}': {
      post: {
        summary: 'Add a member to the group',
        operationId: 'addGroupMember',
        parameters: [
          {
            name: 'groupId',
            in: 'path',
            required: true,
            description: 'The ID of the group',
            schema: {
              type: 'integer'
            }
          },
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'The ID of the user to be added',
            schema: {
              type: 'integer'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Member added successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GroupMember'
                }
              }
            }
          },
          '400': {
            description: 'Invalid user or group ID'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
  },
},
  components: {
    schemas: {
      // Group Related Schemas
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          email: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          profileUrl: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      Group: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          ownersId: { type: 'integer' }
        }
      },
      CreateGroupInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          ownersId: { type: 'integer' }
        }
      },
      IdGroupInput: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        }
      },
      UidIdGroupInput: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          userId: { type: 'integer' }
        }
      },
      RemoveMemberInput: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          userId: { type: 'integer' },
          ownerId: { type: 'integer', nullable: true }
        }
      },
      GroupContent: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          timestamp: { type: 'string', format: 'date-time', nullable: true },
          addedByUserId: { type: 'integer' },
          groupsId: { type: 'integer' },
          movieId: { type: 'integer' }
        }
      },
      CreateGroupContentInput: {
        type: 'object',
        properties: {
          addedByUserId: { type: 'integer' },
          groupsId: { type: 'integer' },
          movieId: { type: 'integer' }
        }
      },
      JoinGroupInput: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          userId: { type: 'integer' },
          ownerId: { type: 'integer' }
        }
      },

      // Movie API Components
      Genre: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' }
        }
      },
      Cast: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          character: { type: 'string' },
          profilePath: { type: 'string' },
          gender: { type: 'integer' },
          knownForDepartment: { type: 'string' },
          order: { type: 'integer' }
        }
      },
      Crew: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          job: { type: 'string' },
          profilePath: { type: 'string' }
        }
      },
      Movie: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          originalTitle: { type: 'string' },
          overview: { type: 'string' },
          releaseDate: { type: 'string', format: 'date' },
          genreIds: { type: 'array', items: { type: 'integer' } },
          genres: { type: 'array', items: { $ref: '#/components/schemas/Genre' } },
          runtime: { type: 'integer' },
          tagline: { type: 'string' },
          posterPath: { type: 'string' },
          backdropPath: { type: 'string' },
          voteAverage: { type: 'number', format: 'float' },
          voteCount: { type: 'integer' },
          popularity: { type: 'number', format: 'float' },
          adult: { type: 'boolean' }
        }
      },
      MovieDetails: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          originalTitle: { type: 'string' },
          overview: { type: 'string' },
          releaseDate: { type: 'string', format: 'date' },
          genres: { type: 'array', items: { $ref: '#/components/schemas/Genre' } },
          runtime: { type: 'integer' },
          tagline: { type: 'string' },
          posterPath: { type: 'string' },
          backdropPath: { type: 'string' },
          voteAverage: { type: 'number', format: 'float' },
          voteCount: { type: 'integer' },
          popularity: { type: 'number', format: 'float' },
          adult: { type: 'boolean' }
        }
      },
      MovieCredits: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          cast: { type: 'array', items: { $ref: '#/components/schemas/Cast' } },
          crew: { type: 'array', items: { $ref: '#/components/schemas/Crew' } }
        }
      }
    }
  }
};

// Generate the swagger specification
const specs = swaggerJsdoc(options);

// Set up Swagger documentation for the app
const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

  app.get('/swagger-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log(`API documentation is available at http://localhost:3000/api-docs`);
};

module.exports = swaggerDocs;
