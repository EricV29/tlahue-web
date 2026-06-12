export default function SkipToContent({ targetId }: { targetId: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="fixed left-4 top-4 z-[9999] -translate-y-full focus:translate-y-0 transition-transform duration-200 bg-tlahu-clay text-white px-4 py-2 rounded-md font-body text-sm font-medium shadow-lg"
    >
      Saltar al contenido
    </a>
  );
}
