export interface ModelCardData {
  id: string;
  title: string;
  image: string;
  date: string;
  style: string;
  description: string;
  mapsUrl: string;
  galleryUrl: string;
}

export const relojCard: ModelCardData = {
  id: "reloj",
  title: "Reloj Monumental",
  image:
    "https://images.unsplash.com/photo-1678113865139-cf639d3fa6d2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  date: "1910",
  style: "Arquitectura neoclásica",
  description:
    "Icono arquitectónico del municipio, testigo de más de un siglo de historia tlahuelilpense.",
  mapsUrl: "https://maps.google.com/?q=20.131354,-99.232346",
  galleryUrl: "/galeria",
};
