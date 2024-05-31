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

  const transfers = [
    {
      id: '1',
      fundingId: '1',
      account: '0xf0A49418375CfD4A33CA316C2522e65F46e3f909',
      type: 'buy',
      eth: 0.00002,
      token: 0.1,
      date: '5 seconds ago',
      transaction: '0xf0A49418375CfD4A33CA316C2522e65F46e3f909',
    },
    {
      id: '2',
      fundingId: '1',
      account: '0xf0A49418375CfD4A33CA316C2522e65F46e3f909',
      type: 'buy',
      eth: 0.00005,
      token: 1.345,
      date: '15 seconds ago',
      transaction: '0xf0A49418375CfD4A33CA316C2522e65F46e3f909',
    },
  ];

  const getFundings = () => {
    return fundings;
  };

  const getFundingById = (id: string) => {
    return fundings.find((funding) => funding.id === id);
  };

  const getTransfersById = (id: string) => {
    return transfers.filter((transfer) => transfer.fundingId === id);
  };

  return { getFundings, getFundingById, getTransfersById };
}
