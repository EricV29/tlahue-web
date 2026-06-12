import IconCalendar from "./icons/IconCalendar";
import IconLocation from "./icons/IconLocation";
import { getImageUrl } from "../utils/cloudinary";

interface FormattedEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  location: string;
  link: string;
  uiStartDate: string;
  uiEndDate: string;
  calendarDates: string;
}

export default function EventCard({
  event,
  onImageClick,
}: {
  event: FormattedEvent;
  onImageClick: (url: string, title: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#dee2de]/50 md:transition-all md:duration-300 md:hover:shadow-lg">
      <button
        type="button"
        className="h-40 md:h-48 w-full overflow-hidden cursor-pointer appearance-none bg-transparent border-none p-0 text-left"
        onClick={() => onImageClick(getImageUrl(event.image), event.title)}
      >
        <img
          src={getImageUrl(event.image)}
          alt={event.title}
          className="w-full h-full object-cover md:transition-transform md:duration-300 md:hover:scale-120"
        />
      </button>
      <div className="p-4">
        <a
          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.calendarDates}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location + ", Tlahuelilpan Hidalgo")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-gray md:w-fit mb-2"
        >
          <IconCalendar className="w-4 h-4" />
          <span className="font-body text-xs hover:text-tlahu-gold hover:underline transition-colors min-w-0">
            {event.uiStartDate}{" "}
            {event.uiStartDate !== event.uiEndDate
              ? `- ${event.uiEndDate}`
              : ""}{" "}
            | agendar
            <span className="sr-only"> (se abre en nueva ventana)</span>
          </span>
        </a>
        <h3 className="font-display font-medium text-lg md:text-xl text-dark-charcoal mb-2">
          {event.title}
        </h3>
        <p className="font-body text-sm text-slate-gray mb-2 md:mb-4">
          {event.description}
        </p>
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-slate-gray md:text-tlahu-blue hover:text-tlahu-blue md:hover:text-tlahu-gold hover:underline transition-colors min-w-0"
        >
          <IconLocation className="w-3.5 h-3.5" />
          <span className="font-body text-xs truncate">
            {event.location}
          </span>
          <span className="sr-only"> (se abre en nueva ventana)</span>
        </a>
      </div>
    </div>
  );
}
