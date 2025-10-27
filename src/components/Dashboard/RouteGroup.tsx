'use client'

import { motion } from 'framer-motion'
import { RouteItem } from './RouteItem'
import { usePathname } from 'next/navigation'

interface RouteGroupProps {
  routes: any[]
  open: boolean
  categoryLabel?: string
  isCollapsed?: boolean
  darkMode?: boolean
}

export function RouteGroup({ routes, open, categoryLabel, isCollapsed, darkMode }: RouteGroupProps) {
  const pathname = usePathname()

  return (
    <motion.div className="w-full mb-6" layout transition={{ duration: 0.2, ease: "easeIn" }}>
      {categoryLabel && open && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={darkMode ? "text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-3 px-3" : "text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-3 px-3"}
        >
          {categoryLabel}
        </motion.p>
      )}
      <div className="space-y-1 px-2">
        {routes.map((route) => (
          <RouteItem
            key={route.path} // Use path as key for better uniqueness
            route={route}
            open={open}
            isActive={pathname === route.path}
            isCollapsed={isCollapsed}
            darkMode={darkMode}
          />
        ))}
      </div>
    </motion.div>
  )
}