import { useProposalService } from '../../services';

export default defineEventHandler(async () => {
  const service = useProposalService();
  return await service.getProposals();
});
