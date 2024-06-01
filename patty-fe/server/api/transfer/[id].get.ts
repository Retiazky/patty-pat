import { useTransferService } from '../../services';

export default defineEventHandler(async (event) => {
  const service = useTransferService();
  const id = getRouterParam(event, 'id');
  if (!id) throw new Error('Missing id parameter');
  return await service.getTransfersById(id);
});
