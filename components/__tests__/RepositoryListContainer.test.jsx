import React from 'react';
import { render } from '@testing-library/react-native';
import RepositoryListContainer from '../../components/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'cursor1',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'cursor2',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = getAllByTestId('repositoryItem');

      expect(repositoryItems).toHaveLength(2);

      const [firstRepo, secondRepo] = repositoryItems;

      expect(firstRepo).toHaveTextContent('jaredpalmer/formik');
      expect(firstRepo).toHaveTextContent('Build forms in React, without the tears');
      expect(firstRepo).toHaveTextContent('TypeScript');
      expect(firstRepo).toHaveTextContent('1.6k'); // forksCount
      expect(firstRepo).toHaveTextContent('21.9k'); // stars
      expect(firstRepo).toHaveTextContent('88');
      expect(firstRepo).toHaveTextContent('3');

      expect(secondRepo).toHaveTextContent('async-library/react-async');
      expect(secondRepo).toHaveTextContent('Flexible promise-based React data loader');
      expect(secondRepo).toHaveTextContent('JavaScript');
      expect(secondRepo).toHaveTextContent('69');
      expect(secondRepo).toHaveTextContent('1.8k');
      expect(secondRepo).toHaveTextContent('72');
      expect(secondRepo).toHaveTextContent('3');
    });
  });
});
