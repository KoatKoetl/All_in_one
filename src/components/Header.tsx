import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between py-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className={`${navigationMenuTriggerStyle()}`}>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()}`}
              >
                <a href="/">Home</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={`${navigationMenuTriggerStyle()}`}>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()}`}
              >
                <a href="/todo">ToDO</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </>
  );
};

export default Header;
