// src/pages/MyReviews.jsx
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <FlatList
      data={data.me.reviews.edges.map(edge => edge.node)}
      renderItem={({ item }) => (
        <ReviewItem review={item} showActions />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
