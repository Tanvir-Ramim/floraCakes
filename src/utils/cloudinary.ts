const cloudinaryBaseURL = "https://res.cloudinary.com/ds6zprd3z/image/upload";

export function buildCloudinaryUrl(
  publicId: string,
  transformation: string = "q_auto,f_auto"
) {
  return `${cloudinaryBaseURL}/${transformation}/${publicId}`;
}
