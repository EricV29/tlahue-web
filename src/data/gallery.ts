export interface GalleryItem {
  id: string;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  fotografo: string;
  enlace_portfolio: string;
  categoria: string;
  lugar: string;
  lugar_maps_url: string;
  is_featured: boolean;
  fecha_captura: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "1",
    titulo: "Parroquia de San Francisco de Asís",
    descripcion:
      "Vista frontal de la parroquia principal de Tlahuelilpan, un emblemático edificio de estilo colonial que data del siglo XVIII.",
    imagen_url:
      "https://images.unsplash.com/photo-1590664863019-0f1b2dd7a4f6?w=800&q=80",
    fotografo: "Ana María López",
    enlace_portfolio: "https://unsplash.com/@anamarialopez",
    categoria: "Arquitectura",
    lugar: "Centro Histórico",
    lugar_maps_url: "https://maps.google.com/?q=Parroquia+San+Francisco+de+Asis+Tlahuelilpan",
    is_featured: true,
    fecha_captura: "2024-03-15",
  },
  {
    id: "2",
    titulo: "Atardecer en la Plaza Principal",
    descripcion:
      "El sol se oculta detrás de la plaza principal mientras los locales disfrutan de una tarde tranquila.",
    imagen_url:
      "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80",
    fotografo: "Carlos Mendoza",
    enlace_portfolio: "https://unsplash.com/@carlosmendoza",
    categoria: "Paisaje",
    lugar: "Plaza Principal",
    lugar_maps_url: "https://maps.google.com/?q=Plaza+Principal+Tlahuelilpan",
    is_featured: true,
    fecha_captura: "2024-02-20",
  },
  {
    id: "3",
    titulo: "Feria Anual de Tlahuelilpan",
    descripcion:
      "Los juegos mecánicos y puestos de comida iluminan la noche durante la feria anual del municipio.",
    imagen_url:
      "https://images.unsplash.com/photo-1579032367483-5bfc60a26b60?w=800&q=80",
    fotografo: "María Fernanda Reyes",
    enlace_portfolio: "https://unsplash.com/@maferreyes",
    categoria: "Eventos",
    lugar: "Recinto Ferial",
    lugar_maps_url: "https://maps.google.com/?q=Recinto+Ferial+Tlahuelilpan",
    is_featured: false,
    fecha_captura: "2024-01-10",
  },
  {
    id: "4",
    titulo: "Murales del Centro",
    descripcion:
      "Coloridos murales que adornan las calles del centro, reflejando la cultura e historia de la región.",
    imagen_url:
      "https://images.unsplash.com/photo-1578489758854-f134a358f08b?w=800&q=80",
    fotografo: "Diego Ramírez",
    enlace_portfolio: "https://unsplash.com/@diegoramirez",
    categoria: "Arte Urbano",
    lugar: "Centro Histórico",
    lugar_maps_url: "https://maps.google.com/?q=Centro+Tlahuelilpan",
    is_featured: false,
    fecha_captura: "2024-04-05",
  },
  {
    id: "5",
    titulo: "Árboles Centenarios del Parque",
    descripcion:
      "Imponentes ahuehuetes que han sido testigos del crecimiento de Tlahuelilpan a lo largo de los siglos.",
    imagen_url:
      "https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800&q=80",
    fotografo: "Luis Fernando Torres",
    enlace_portfolio: "https://unsplash.com/@luistorres",
    categoria: "Naturaleza",
    lugar: "Parque Municipal",
    lugar_maps_url: "https://maps.google.com/?q=Parque+Municipal+Tlahuelilpan",
    is_featured: true,
    fecha_captura: "2024-05-12",
  },
  {
    id: "6",
    titulo: "Callejón de las Artesanas",
    descripcion:
      "Un pintoresco callejón donde artesanas locales venden sus productos tradicionales hechos a mano.",
    imagen_url:
      "https://images.unsplash.com/photo-1580661869737-3f034e0d0e0c?w=800&q=80",
    fotografo: "Gabriela Silva",
    enlace_portfolio: "https://unsplash.com/@gabrielasilva",
    categoria: "Urbanismo",
    lugar: "Callejón de las Artesanas",
    lugar_maps_url: "https://maps.google.com/?q=Callejon+Artesanas+Tlahuelilpan",
    is_featured: false,
    fecha_captura: "2024-06-18",
  },
];
