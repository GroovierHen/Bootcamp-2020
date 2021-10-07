import dotenf from 'react';

export const handler = async function (event, context) {
  console.log(process.env.FAUNDB_SECRET_KEY);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};
