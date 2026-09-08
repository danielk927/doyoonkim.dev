"use client";

const WIDTH = 1000;
const HEIGHT = 780;

/**
 * Opens in a separate window rather than replacing this tab. Keeps a real
 * href so middle-click, keyboard and no-JS all still work, and falls back to
 * a normal new tab if the browser refuses the popup.
 */
export default function PopupLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        const width = Math.min(WIDTH, window.screen.availWidth);
        const height = Math.min(HEIGHT, window.screen.availHeight);
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
          href,
          "_blank",
          `popup=yes,width=${width},height=${height},left=${Math.max(0, left)},top=${Math.max(0, top)},noopener,noreferrer`,
        );
        if (popup) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
