export interface EnvironmentVariables {
  port: number;
  mongo: {
    databaseUrl: string;
    databaseName: string;
  };
  jwt: {
    secret: string;
    expirationTime: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

const getPort = () => {
  const port = process.env['PORT'] || '3000';
  return parseInt(port, 10);
};

export default (): EnvironmentVariables => ({
  port: getPort(),
  mongo: {
    databaseUrl: process.env['MONGO_DATABASE_URL']!,
    databaseName: process.env['MONGO_DATABASE_NAME']!,
  },
  jwt: {
    secret: process.env['JWT_SECRET']!,
    expirationTime: {
      accessToken: process.env['JWT_EXPIRATION_IN_SECOND_ACCESS_TOKEN']!,
      refreshToken: process.env['JWT_EXPIRATION_IN_SECOND_REFRESH_TOKEN']!,
    },
  },
});
