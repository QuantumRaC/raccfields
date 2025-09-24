import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import { paths } from "@/lib/paths"

const devComponents: { title: string; href: string; description: string }[] = [
  {
    title: "T3xtAnlys",
    href: paths.textanlys, //TODO
    description:
      "NLP tool for style, grammar, and sentiment analysis",
  },
  {
    title: "Mesh Renderer",
    href: "/docs/primitives/hover-card", //TODO
    description:
      "Renders OBJ meshes with lighting, textures, and PN triangles",
  },
]
const secComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Notes Archive",
    href: "/docs/primitives/alert-dialog", //TODO
    description:
      "Archive of personal notes while learning cybersecurity",
  },
  {
    title: "Writeups",
    href: "/docs/primitives/hover-card",
    description:
      "Writeups for CTFs and hands-on exercises",
  },
  {
    title: "Projects",
    href: "/docs/primitives/progress",
    description:
      "Security related builds",
  },
  {
    title: "Resources",
    href: "/docs/primitives/scroll-area",
    description: "Curated links & cheat sheets",
  },
]

const TopNavigationMenu = () => {
  return (
    // https://ui.shadcn.com/docs/components/navigation-menu
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="font-mono">

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={paths.about} className="font-semibold text-muted-foreground">About Me</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href={paths.dev} className="font-semibold text-muted-foreground">Dev</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {devComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href={paths.security} className="font-semibold text-muted-foreground">Security</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {secComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={paths.music} className="font-semibold text-muted-foreground">Music</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={paths.art} className="font-semibold text-muted-foreground">Art</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={paths.blog} className="font-semibold text-muted-foreground">All Blogs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
};


function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default TopNavigationMenu;