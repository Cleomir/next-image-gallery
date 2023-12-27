import { ImagesResults, ImagesSchemaWithPhotos } from "../models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResults | undefined> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error("Fetch Images error!");
    }

    const ImagesResults: ImagesResults = await response.json();
    const parsedData = ImagesSchemaWithPhotos.parse(ImagesResults);

    return parsedData.total_results === 0 ? undefined : parsedData;
  } catch (error) {
    if (error instanceof Error) {
      error.stack;
    }
  }
}
