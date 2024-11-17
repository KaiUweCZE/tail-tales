import MenuPrimary from "./menu-primary";

const NavbarPrimary = () => {
  return (
    <header className="grid w-full sticky top-0 bg-slate-900 z-50">
      <div className="grid grid-cols-2 w-full mx-auto max-w-[var(--max-size)]">
        <div className="px-2">
          <span className="font-bold">Tail-Tales</span>
        </div>
        <MenuPrimary />
      </div>
    </header>
  );
};

export default NavbarPrimary;
