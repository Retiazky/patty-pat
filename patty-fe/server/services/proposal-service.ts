import type { Proposal } from '~/types';

export function useProposalService() {
  const proposals: Proposal[] = [
    {
      id: '1',
      title: 'Proposal 1',
      description: 'Description 1',
      minAmount: 100,
      imageSrc: 'img/prop_cat.png',
      votes: 0,
      endingDateTime: '2024-08-31 12:00',
    },
    {
      id: '2',
      title: 'Proposal 2',
      description: 'Description 2',
      minAmount: 200,
      imageSrc: 'img/prop_dino.png',
      votes: 0,
      endingDateTime: '2024-08-31 13:00',
    },
  ];

  const getProposals = () => {
    return proposals;
  };

  return { getProposals };
}
