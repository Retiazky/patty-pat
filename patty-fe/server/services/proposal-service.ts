import { createClient } from "@supabase/supabase-js";
import type { Proposal } from "~/types";

const RUNTIME_CONFIG = useRuntimeConfig();

export function useProposalService() {
  const proposals: Proposal[] = [
    {
      id: "1",
      title: "Proposal 1",
      description: "Description 1",
      minAmount: 100,
      imageSrc: "img/prop_cat.png",
      votes: 0,
      endingDateTime: "2024-08-31 12:00",
    },
    {
      id: "2",
      title: "Proposal 2",
      description: "Description 2",
      minAmount: 200,
      imageSrc: "img/prop_dino.png",
      votes: 0,
      endingDateTime: "2024-08-31 13:00",
    },
  ];

  const getProposals = () => {
    return proposals;
  };
  const saveImage = async (blob: Blob): Promise<string> => {
    const supabase = createClient(
      RUNTIME_CONFIG.supabaseUrl,
      RUNTIME_CONFIG.supabaseKey
    );
    const date = new Date();
    const uniqueId = date.getTime();
    await supabase.storage.from("images").upload(`${uniqueId}.png`, blob);

    const path = `${RUNTIME_CONFIG.supabaseUrl}/storage/v1/object/public/images/${uniqueId}.png`;
    return path;
  };

  return { getProposals, saveImage };
}
