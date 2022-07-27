export interface EnvironmentVariables {
  mongo: {
    databaseurl: string;
    databasename: string;
  };
  jwt: {
    secret: string;
    expirationTime: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export default (): EnvironmentVariables => ({
  mongo: {
    databaseurl: process.env['MONGO_DATABASE_URL']!,
    databasename: process.env['MONGO_DATABASE_NAME']!,
  },
  jwt: {
    secret: process.env['JWT_SECRET']!,
    expirationTime: {
      accessToken: process.env['JWT_EXPIRATION_TIME_ACCESS_TOKEN']!,
      refreshToken: process.env['JWT_EXPIRATION_TIME_REFRESH_TOKEN']!,
    },
  },
});
