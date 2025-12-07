import {
  BookOpen,
  Bot,
  ChevronRight,
  Frame,
  LogOut,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import {
  Link,
  redirect,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router'
import * as React from 'react'
import { motion } from 'motion/react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import { cn } from '@/lib/utils'
import { useAuth } from '@/context/use-auth'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: SquareTerminal,
      items: [],
    },
    {
      title: 'Goods',
      url: '/dashboard/goods',
      icon: Bot,
      items: [],
    },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouterState()
  const pathname = router.location.pathname
  const { signOut } = useAuth()
  // const navigate = useNavigate()
  const handleLogout = () => {
    signOut()
    redirect({ to: '/login' })
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default pointer-events-none gap-3"
            >
              <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-md">
                <Bot className="w-4 h-4 text-primary" />
              </div>

              <motion.div
                layout
                className={cn(
                  'flex flex-col leading-tight overflow-hidden',
                  'group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:w-0',
                )}
              >
                <span className="font-semibold text-base truncate">
                  My Dashboard
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Client System
                </span>
              </motion.div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const isActive =
                pathname === item.url || pathname.startsWith(item.url + '/')

              return (
                <Collapsible key={item.title} asChild defaultOpen={isActive}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={cn(
                          'transition-all',
                          isActive && 'bg-primary/10 text-primary',
                        )}
                        asChild
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>

                          {item.items.length > 0 && (
                            <ChevronRight
                              className={cn(
                                'ml-auto transition-transform',
                                isActive && 'rotate-90',
                              )}
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex flex-col text-left text-sm">
                <span className="font-medium">Unknown User</span>
                <span className="text-xs text-muted-foreground">no-email</span>
              </div>
            </SidebarMenuButton>

            <SidebarMenuAction onClick={handleLogout}>
              <LogOut />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
