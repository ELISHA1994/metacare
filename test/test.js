import { server } from "../server.js";
import supertest from 'supertest';
const request = supertest(server);

afterAll((done) => {
    server.close(() => {
        done();
    });
});

describe('Movies List Routes', () => {
    test('should return Welcome to the API', async function () {
        const res = await request
            .get('/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('message');
        // expect(res.body.message).toBe('Welcome to the json patch microservice API')
        expect(res.body.message).toMatchInlineSnapshot(`"server is up and running"`);

    });

    test('should return a list of starwars movies', async function () {
        const res = await request
            .get('/api/v1/movies/list')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('body');
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toMatchInlineSnapshot(`"MOVIES Fetched Successfully"`);
        expect(res.body.body).toEqual(
            expect.arrayContaining(
                [expect.any(Object)]
            )
        )
    });

})

describe('Movies Characters Routes', () => {

    test('should return missing title query parameters', async function () {
        const res = await request
            .get('/api/v1/movie/characters-list')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('body');
        expect(res.body.status).toEqual(400);
        expect(res.body.message).toMatchInlineSnapshot(`"Bad request! Please input title query"`)
    })

    test('should return list of movie characters', async function () {
        const query_params = { title: 'A New Hope' };
        const res = await request
            .get('/api/v1/movie/characters-list')
            .query(query_params)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('body');
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toMatchInlineSnapshot(`"Characters  list fetch successfully"`);
        expect(res.body.body.characters).toEqual(
            expect.arrayContaining(
                [expect.any(Object)]
            )
        );
    })

    test('should sort the list of characters by name', async function () {
        const query_params = {
            title: 'A New Hope',
            sortName: 'a-z'
        };
        const res = await request
            .get('/api/v1/movie/characters-list')
            .query(query_params)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        const charactersArray = res.body.body.characters;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('body');
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toMatchInlineSnapshot(`"Characters list fetch successfully"`);
        expect(res.body.body.characters).toStrictEqual(
            charactersArray.sort((a, b) => {
                if (query_params.sortName.toLowerCase() === 'a-z') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            })
        );
    })

    test('should sort the list of characters by height', async function () {
        const query_params = {
            title: 'A New Hope',
            sortHeight: 'asc'
        };
        const res = await request
            .get('/api/v1/movie/characters-list')
            .query(query_params)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        const charactersArray = res.body.body.characters;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('body');
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toMatchInlineSnapshot(`"Characters  list fetch successfully"`);
        expect(res.body.body.characters).toStrictEqual(
            charactersArray.sort((a, b) => {
                if (query_params.sortHeight.toLowerCase() === 'asc') {
                    return parseInt(a.height) - parseInt(b.height)
                } else {
                    return parseInt(b.height) - parseInt(a.height)
                }
            })
        );
    })

    test('should filter the list of characters by gender', async function () {
        const query_params = {
            title: 'A New Hope',
            gender: 'male'
        };
        const res = await request
            .get('/api/v1/movie/characters-list')
            .query(query_params)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        const charactersArray = res.body.body.characters;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('body');
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toMatchInlineSnapshot(`"Characters  list fetch successfully"`);
        expect(res.body.body.characters).toStrictEqual(
            charactersArray.filter(character => character.gender === query_params.gender.toLowerCase())
        );
    })
})

describe('Movies Comments Routes', () => {
    test('Post a comment on a movie', async function () {
        const postComment = {
            movieUrl: 'https://swapi.py4e.com/api/films/1/',
            description: 'This is the best movie of the starwars series'
        };
        const res = await request
            .post('/api/v1/movie/post-comment')
            .send(postComment)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('body');
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toMatchInlineSnapshot(`"COMMENT Created Successfully"`);
        expect(res.body.body).toEqual(
            expect.objectContaining(
                postComment
            )
        );

    })

    test('List of Comments on a Movie', async function () {
        const query_params = {
            movieUrl: 'https://swapi.py4e.com/api/films/1/'
        };
        const res = await request
            .get('/api/v1/movie/list-comment')
            .query(query_params)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        const commentsArray = res.body.body.characters;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('body');
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toMatchInlineSnapshot(`"COMMENTS Fetched Successfully"`);
    })
})
