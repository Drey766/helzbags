type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "blockquote" | "aside" | "section";
};

/** Slim primary + pale-accent bars on the left, like the side panels of the bag in the logo. */
export function SidePanelBlock({ children, className = "", as: Tag = "div" }: Props) {
  return (
    <Tag className={`relative pl-6 ${className}`}>
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[5px] rounded-full bg-primary" />
      <span aria-hidden="true" className="absolute inset-y-1 left-[8px] w-[3px] rounded-full bg-accent-light" />
      {children}
    </Tag>
  );
}
