import type { Funding } from '~/types';

export function useFundingService() {
  const fundings: Funding[] = [
    {
      title: 'Funding 1',
      description: 'Description 1',
      imageSrc: 'img/prop_cat.png',
    },
    {
      title: 'Funding 2',
      description: 'Description 2',
      imageSrc: 'img/prop_dino.png',
    },
  ];

  const getFundings = () => {
    return fundings;
  };

  return { getFundings };
}
