const app = require('./app.js')//Require app module to use app context



//Start server
let server = app.listen(process.env.PORT, () => {
  console.log('server is running on port', server.address().port);
});