import 'dotenv/config';

export default {
  expo: {
    name: 'your-app',
    slug: 'your-app',
    version: '1.0.0',
    extra: {
      apolloUri: process.env.APOLLO_URI,
    },
  },
};
