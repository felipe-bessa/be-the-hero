const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
let ongId = '';
let incidentId = '';

describe('Be The Hero Application Actions', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  /**
   * CREATE A ONG
   * 
   * Endpoint: /ongs
   * Method: POST
   */
  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'ONG Legal',
        email: 'contato@onglegal.com',
        whatsapp: '31987651234',
        city: 'Cidade Teste',
        uf: 'MG'
      });
      
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    ongId = response.body.id;
  });

  /**
   * LOGIN IN APP
   * 
   * Endpoint: /sessions
   * Methos: POST
   */
  it('should be able to login on app', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        id: ongId
      });
    
    expect(response.body).toHaveProperty('name');
  });

  /**
   * LIST ALL ONGs
   * 
   * Endpoint: /ongs
   * Method: GET
   */
  it('should be able to get all ONGs', async () => {
    const response = await request(app).get('/ongs');

    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.stringMatching(/^[0-9a-fA-F]{8}$/),
        name: expect.any(String),
        email: expect.any(String),
        whatsapp: expect.any(String),
        city: expect.any(String),
        uf: expect.any(String)
      })
    ]));
  });


  /**
   * CREATE AN INCIDENT
   * 
   * Endpoint: /incidents
   * Method: POST
   */
  it('should to be able to create an Incident', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('Authorization', ongId)
      .send({
        title: 'Caso Legal',
        description: 'Um caso realmente muito legal',
        value: 10
      });
    
      expect(response.body).toHaveProperty('id');
      incidentId = response.body.id;
  });

  /**
   * LIST ALL INCIDENTS CREATED BY AN SPECIFIC ONG
   * 
   * Endpoint: /profile
   * Method: GET
   */
  it('should to be able to get all Incidents of a ONG', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Authorization', ongId);

      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          value: expect.any(Number),
          ong_id: ongId
        })
      ]));
  });

  /**
   * LIST ALL INCIDENTS
   * 
   * Endpoint: /incidents
   * Method: GET
   */
  it('should to be able to get all Incidents', async () => {
    const response = await request(app).get('/incidents');

    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        value: expect.any(Number),
        ong_id: expect.stringMatching(/^[0-9a-fA-F]{8}$/),
        name: expect.any(String),
        email: expect.any(String),
        whatsapp: expect.any(String),
        city: expect.any(String),
        uf: expect.any(String)
      })
    ]));
  });

  /**
   * DELETE AN INCIDENT
   * 
   * Endpoint: /incidents/:id
   * Method: DELETE
   */
  it('should to be able to delete an Incident by your owner', async () => {
    const response = await request(app)
      .delete(`/incidents/${incidentId}`)
      .set('Authorization', ongId);

    expect(response.statusCode).toBe(204);
  });

});