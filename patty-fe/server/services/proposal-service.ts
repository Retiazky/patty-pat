import { createClient } from '@supabase/supabase-js';
import type { Proposal } from '~/types';

const RUNTIME_CONFIG = useRuntimeConfig();

export function useProposalService() {
  const proposals: Proposal[] = [
    {
      id: '1',
      title: 'Proposal 1',
      description: 'Description 1',
      minAmount: 100,
      imageSrc: 'img/prop_cat.png',
      votes: {
        votesFor: 210,
        votesAgainst: 10,
        votesAbstain: 2,
      },
      endingDateTime: '2024-08-31 12:00',
      creator: '0xf0A49418375CfD4A33CA316C2522e65F46e3f909',
    },
    {
      id: '2',
      title: 'Proposal 2',
      description: 'Description 2',
      minAmount: 200,
      imageSrc: 'img/prop_dino.png',
      votes: {
        votesFor: 110,
        votesAgainst: 219,
        votesAbstain: 1,
      },
      endingDateTime: '2024-08-31 13:00',
      creator: '0xff0A49418375CfD4A33CA316C2522e65F411111',
    },
  ];

  const getProposals = (address?: string) => {
    if (address) {
      return proposals.filter((proposal) => proposal.creator === address);
    }
    return proposals;
  };

  const saveImage = async (blob: Blob): Promise<string> => {
    const supabase = createClient(
      RUNTIME_CONFIG.supabaseUrl,
      RUNTIME_CONFIG.supabaseKey
    );
    const date = new Date();
    const uniqueId = date.getTime();
    await supabase.storage.from('images').upload(`${uniqueId}.png`, blob);

    const path = `${RUNTIME_CONFIG.supabaseUrl}/storage/v1/object/public/images/${uniqueId}.png`;

    const json = JSON.stringify({ image: path });
    await supabase.storage.from('json').upload(`${uniqueId}.json`, json);

    const jsonPath = `${RUNTIME_CONFIG.supabaseUrl}/storage/v1/object/public/json/${uniqueId}.json`;
    return jsonPath;
  };

  return { getProposals, saveImage };
}
