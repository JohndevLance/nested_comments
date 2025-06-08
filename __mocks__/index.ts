// Create a new instance of the mock adapter attached to your axios instance
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios, {delayResponse: 500}); // optional delay to simulate network

// Define your mocked routes
mock.onGet('/api/posts').reply(200, []);

mock.onGet('/api/comments').reply(200, []);

// Optional: fallback for unhandled requests
mock.onAny().passThrough();

export default mock;
