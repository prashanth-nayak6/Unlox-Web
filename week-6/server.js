const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Blog REST API server is running on port ${port}`);
});
