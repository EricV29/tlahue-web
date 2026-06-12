const CLOUDINARY_BASE = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/`;

export const getImageUrl = (publicId: string) =>
  `${CLOUDINARY_BASE}${publicId}`;
