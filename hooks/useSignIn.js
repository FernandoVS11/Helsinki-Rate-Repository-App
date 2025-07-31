import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
