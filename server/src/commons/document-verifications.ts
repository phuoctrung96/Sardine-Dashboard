import { DocumentVerification, DocumentVerificationImages, AnyTodo } from "sardine-dashboard-typescript-definitions";
import { generateSignedUrl } from "../service/storage-service";

const DOCUMENT_IMAGE_BUCKET_NAME =
  process.env.SARDINE_ENV === "production" ? "uploaded-files-sardine-ai-prod" : "uploaded-files-sardine-ai-dev";

export const DOC_IMG_KEYS: readonly (keyof DocumentVerificationImages)[] = ["front_image_path", "back_image_path", "selfie_path"];

export const generateSignedDocumentVerificationImages = async (
  documentVerification: DocumentVerification | Record<string, AnyTodo>
) => {
  const result: Partial<Record<keyof DocumentVerification, string>> = {};

  const images = await Promise.all(
    DOC_IMG_KEYS.map((imageKey) => {
      const asyncFn = async () => {
        const path = documentVerification[imageKey];
        if (!path) {
          return { url: "", key: imageKey };
        }
        const url = await generateSignedUrl(path, DOCUMENT_IMAGE_BUCKET_NAME);
        return { url, key: imageKey };
      };

      return asyncFn();
    })
  );

  images.forEach((image) => {
    result[image.key] = image.url;
  });

  return result;
};
