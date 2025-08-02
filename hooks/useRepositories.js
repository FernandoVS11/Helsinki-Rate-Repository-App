import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const getOrderVariables = (order) => {
  switch (order) {
    case 'highest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case 'lowest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    case 'latest':
    default:
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }
};

const useRepositories = (sortOrder = 'latest', searchKeyword = '') => {
  const ordering = getOrderVariables(sortOrder);

  const variables = {
    ...ordering,
    searchKeyword,
  };

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data?.repositories,
    loading,
    refetch,
  };
};

export default useRepositories;
