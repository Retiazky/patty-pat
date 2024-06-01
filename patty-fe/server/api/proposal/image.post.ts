import { useProposalService } from "~/server/services";

export default defineEventHandler(async (event) => {
  const data = await readFormData(event);
  const image = data.get("image") as Blob;

  const proposalService = useProposalService();
  return await proposalService.saveImage(image);
});
