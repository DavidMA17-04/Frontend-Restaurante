import {
  Ban,
  Briefcase,
  Calendar,
  Clock,
  Home,
  LayoutGrid,
  List,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { NavIconKey } from "@/shared/constants/routeConstants";

export const NAV_ICONS: Record<NavIconKey, LucideIcon> = {
  home: Home,
  users: Users,
  briefcase: Briefcase,
  layoutGrid: LayoutGrid,
  calendar: Calendar,
  clock: Clock,
  mapPin: MapPin,
  ban: Ban,
  list: List,
};
