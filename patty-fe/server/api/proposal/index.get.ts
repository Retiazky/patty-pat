import { useProposalService } from "../../services";

export default defineEventHandler(async (event) => {
  const service = useProposalService();
  const address = getQuery(event).address as string;

  return await service.getProposals(address);
});
