import { useFundingService } from '../../services';

export default defineEventHandler(async (event) => {
  const service = useFundingService();
  const id = getRouterParam(event, 'id');
  if (!id) throw new Error('Missing id parameter');
  return await service.getFundingById(id);
});
