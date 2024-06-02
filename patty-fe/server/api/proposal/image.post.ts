import { useProposalService } from "~/server/services";

export default defineEventHandler(async (event) => {
  const data = await readFormData(event);
  const image = data.get("image") as Blob;
  const description = data.get("description") as string;

  const proposalService = useProposalService();
  return await proposalService.saveImage(image, description);
});
