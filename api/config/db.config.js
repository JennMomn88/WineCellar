const mongooose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb://localhost:27017/express-api-test-${process.env.NODE_ENV}`;

mongooose
  .connect(MONGODB_URI)
  .then(() =>
    console.info(`Successfully connected to the database ${MONGODB_URI}`)
  )
  .catch((error) => {
    console.error(
      `An error occurred trying to connect to the database ${MONGODB_URI}`,
      error
    );
    process.exit(0);
  });

process.on('SIGINT', () => {
  mongooose.connection.close().finally(() => {
    console.log(`Database connection closed`);
    process.exit(0);
  });
});
