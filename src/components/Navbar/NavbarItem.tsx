import { View } from "../../types/view";

interface NavbarProps {
  title: string;
  view: View;
  currentView: View;
  onClick: (view: View) => void;
}

export const NavbarItem = ({
  title,
  view,
  currentView,
  onClick,
}: NavbarProps) => {
  return (
    <button
      className={`btn btn-ghost btn-link lowercase ${
        view === currentView ? "text-orange-500" : "text-orange-300"
      } no-underline hover:underline font-bold`}
      onClick={() => onClick(view)}
    >
      {title}
    </button>
  );
};
