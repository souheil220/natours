const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
// eslint-disable-next-line prettier/prettier
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    //   .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('running on Port', port));

// eslint-disable-next-line prettier/prettier
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandledRejection ! shutting down');
  server.close(() => {
    process.exit(1);
  });
});
