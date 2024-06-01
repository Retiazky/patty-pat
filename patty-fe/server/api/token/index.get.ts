import { useTransferService } from '../../services';

export default defineEventHandler(async (event) => {
  const address = getQuery(event).address as string;
  const service = useTransferService();

  if (!address) throw new Error('Missing address parameter');
  return await service.getTokensByAddress(address);
});
