import type { Transfer } from '~/types';

export function useTransferService() {
  const transfers: Transfer[] = [
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
    {
      id: '3',
      fundingId: '1',
      account: '0xf0A49418375CfD4A33CA316C2522e65F46e3f909',
      type: 'sell',
      eth: 0.00001,
      token: 15.2,
      date: '30 seconds ago',
      transaction: '0xf0A49418375CfD4A33CA316C2522e65F46e3f909',
    },
  ];

  const getTransfersById = (id: string) => {
    return transfers.filter((transfer) => transfer.fundingId === id);
  };

  return { getTransfersById };
}
