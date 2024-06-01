import type { Funding } from '~/types';

export function useFundingService() {
  const fundings: Funding[] = [
    {
      id: '1',
      title: 'Funding 1',
      description: 'Description 1',
      imageSrc: 'img/prop_cat.png',
      tokenName: 'Cattie',
      tokenSymbol: 'CAT',
    },
    {
      id: '2',
      title: 'Funding 2',
      description: 'Description 2',
      imageSrc: 'img/prop_dino.png',
      tokenName: 'Dino',
      tokenSymbol: 'DINO',
    },
  ];
  
  const getFundings = () => {
    return fundings;
  };

  const getFundingById = (id: string) => {
    return fundings.find((funding) => funding.id === id);
  };

  return { getFundings, getFundingById };
}
