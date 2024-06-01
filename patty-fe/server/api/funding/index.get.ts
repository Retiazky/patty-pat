import { useFundingService } from '../../services';

export default defineEventHandler(async () => {
  const service = useFundingService();
  return await service.getFundings();
});
