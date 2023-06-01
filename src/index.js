import App from './app.js';

const app = new App();
global.APP = app;
await app.buildAsync();
app.start();
