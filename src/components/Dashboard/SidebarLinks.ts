
import { 
  LayoutDashboard,
  FileText,
  Image,
  Navigation,
  Settings,
  User,
  Home,
  ClipboardList,
  Bell,
  BarChart2,
  BarChart3,
  MessageSquare,
  DollarSign,
  Users,
  Wrench,
  Building2,
  Calculator,
  Zap
} from 'lucide-react'


// System routes (common for all roles)
export const systemRoutes = [
  { path: '/dashboard/profile', label: 'Profile', icon: User, badge: null },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings, badge: null },
]

// Role-based route configuration
export const routeConfig = {
  'SYSTEM_ADMIN': {
    main: [
      { path: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    ],
    content: [
      {
        path: '/admin/content/heroSection',
        label: 'Hero Section',
        icon: Zap,
        badge: null,
        description: 'Update background image and hero text'
      },
      {
        path: '/admin/content/about',
        label: 'About Section',
        icon: Users,
        badge: null,
        description: 'Edit company story and team info'
      },
      {
        path: '/admin/content/services',
        label: 'Services Section',
        icon: Wrench,
        badge: null,
        description: 'Manage services list and descriptions'
      },
      {
        path: '/admin/content/pricing',
        label: 'Pricing Section',
        icon: DollarSign,
        badge: null,
        description: 'Update pricing plans and features'
      },
      {
        path: '/admin/content/testimonials',
        label: 'Testimonials',
        icon: MessageSquare,
        badge: null,
        description: 'Manage customer reviews and ratings'
      },
    ],
    blog: [
      {
        path: '/admin/content/blog',
        label: 'Blog Posts',
        icon: FileText,
        badge: null,
        description: 'Create and edit blog articles'
      },
      {
        path: '/admin/content/blog/categories',
        label: 'Blog Categories',
        icon: FileText,
        badge: null,
        description: 'Organize blog posts by categories'
      },
    ],
    media: [
      {
        path: '/admin/content/media',
        label: 'Media Library',
        icon: Image,
        badge: null,
        description: 'Upload and manage images'
      },
    ],
    navigation: [
      {
        path: '/admin/content/navigation',
        label: 'Site Navigation',
        icon: Navigation,
        badge: null,
        description: 'Manage menu items and links'
      },
    ],
    system: [
      { path: '/admin/users', label: 'User Management', icon: Users, badge: null },
      { path: '/admin/settings', label: 'System Settings', icon: Settings, badge: null },
    ]
  },


  'PROPERTY_MANAGER': {
    main: [
      { path: '/property-manager', label: 'Dashboard Overview', icon: LayoutDashboard },
    ],
    properties: [
      { path: '/property-manager/properties/register', label: 'Register Property', icon: Building2 },
      { path: '/property-manager/properties/manage', label: 'Manage Units & Leases', icon: Building2 },
      { path: '/property-manager/properties/vacancy', label: 'Vacancy Tracker', icon: Building2 },
    ],
    tenants: [
      { path: '/property-manager/tenants/applications', label: 'Applications', icon: Users },
      { path: '/property-manager/tenants/moves', label: 'Move-ins / Move-outs', icon: Users },
      { path: '/property-manager/tenants/communication', label: 'Communication', icon: Users },
    ],
    maintenance: [
      { path: '/property-manager/maintenance/requests', label: 'Requests', icon: Wrench },
      { path: '/property-manager/maintenance/vendors', label: 'Assign Vendors', icon: Wrench },
      { path: '/property-manager/maintenance/analytics', label: 'Analytics', icon: Wrench },
    ],
    accounting: [
      { path: '/property-manager/accounting/invoicing', label: 'Rent Invoicing', icon: DollarSign },
      { path: '/property-manager/accounting/late-fees', label: 'Late Fees', icon: DollarSign },
      { path: '/property-manager/accounting/reconciliation', label: 'Reconciliation', icon: DollarSign },
    ],
    utilities: [
      { path: '/property-manager/utilities/track', label: 'Track Usage', icon: BarChart3 },
      { path: '/property-manager/utilities/allocate', label: 'Allocate Bills', icon: BarChart3 },
      { path: '/property-manager/utilities/reports', label: 'Reports', icon: BarChart3 },
    ],
    analytics: [
      { path: '/property-manager/analytics/revenue', label: 'Revenue Insights', icon: BarChart3 },
      { path: '/property-manager/analytics/satisfaction', label: 'Tenant Satisfaction', icon: BarChart3 },
      { path: '/property-manager/analytics/occupancy', label: 'Occupancy', icon: BarChart3 },
    ],
    settings: [
      { path: '/property-manager/settings/integrations', label: 'Integrations', icon: Settings },
      { path: '/property-manager/settings/notifications', label: 'Notifications', icon: Settings },
      { path: '/property-manager/settings/roles', label: 'Role Management', icon: Settings },
    ],
  },

  TENANT: {
    main: [
      { path: '/tenant', label: 'Overview', icon: LayoutDashboard },
    ],
    lease: [
      { path: '/tenant/lease-details', label: 'View Lease Details', icon: Users },
      { path: '/tenant/renew-terminate', label: 'Renew / Terminate Request', icon: Users },
      { path: '/tenant/insurance-upload', label: 'Insurance Upload', icon: Users },
    ],
    payments: [
      { path: '/tenant/pay-rent', label: 'Pay Rent (Stripe / Zelle / ACH)', icon: Calculator },
      { path: '/tenant/payment-history', label: 'Payment History', icon: Calculator },
      { path: '/tenant/upcoming-invoices', label: 'Upcoming Invoices', icon: Calculator },
    ],
    maintenance: [
      { path: '/tenant/submit-request', label: 'Submit Request', icon: Wrench },
      { path: '/tenant/track-progress', label: 'Track Progress', icon: Wrench },
      { path: '/tenant/past-requests', label: 'View Past Requests', icon: Wrench },
    ],
    utilities: [
      { path: '/tenant/usage-summary', label: 'Usage Summary', icon: Zap },
      { path: '/tenant/shared-bills', label: 'Shared Utility Bills', icon: Zap },
      { path: '/tenant/payment-breakdown', label: 'Payment Breakdown', icon: Zap },
    ],
    insurance: [
      { path: '/tenant/insurance-purchase', label: 'Purchase / Upload Policy', icon: Users },
      { path: '/tenant/insurance-renewal', label: 'Renewal Reminders', icon: Users },
      { path: '/tenant/insurance-claims', label: 'Claim Assistance', icon: Users },
    ],
    notifications: [
      { path: '/tenant/rent-reminders', label: 'Rent Reminders', icon: Zap },
      { path: '/tenant/maintenance-notifications', label: 'Maintenance Updates', icon: Zap },
      { path: '/tenant/lease-alerts', label: 'Lease Alerts', icon: Zap },
    ],
    profile: [
      { path: '/tenant/update-info', label: 'Update Info', icon: Settings },
      { path: '/tenant/security', label: 'MFA / Password Change', icon: Settings },
    ],
  },

  VENDOR: {
    main: [
      { path: '/vendor', label: 'Overview', icon: Home, badge: null },
    ],
    workOrders: [
      { path: '/vendor/jobs', label: 'My Jobs', icon: ClipboardList, badge: '4' },
      { path: '/vendor/assigned', label: 'Assigned Requests', icon: FileText, badge: null },
      { path: '/vendor/progress', label: 'Update Progress', icon: FileText, badge: null },
      { path: '/vendor/reports', label: 'Submit Reports / Photos', icon: FileText, badge: null },
      { path: '/vendor/status', label: 'Status Tracking', icon: FileText, badge: null },
      { path: '/vendor/history', label: 'Maintenance History', icon: FileText, badge: null },
    ],
    invoices: [
      { path: '/vendor/invoices', label: 'Invoices', icon: DollarSign, badge: '2' },
      { path: '/vendor/generate', label: 'Generate Invoice', icon: FileText, badge: null },
      { path: '/vendor/payment-history', label: 'Payment History', icon: FileText, badge: null },
      { path: '/vendor/payment-updates', label: 'Payment Updates', icon: FileText, badge: null },
    ],
    analytics: [
      { path: '/vendor/analytics', label: 'Analytics by Property', icon: BarChart2, badge: null },
    ],
    communication: [
      { path: '/vendor/messages', label: 'Messages', icon: MessageSquare, badge: '1' },
      { path: '/vendor/notifications', label: 'Notifications', icon: Bell, badge: null },
    ],
    profile: [
      { path: '/vendor/profile', label: 'Business Info', icon: User, badge: null },
      { path: '/vendor/certifications', label: 'Certifications & Documents', icon: User, badge: null },
      { path: '/vendor/security', label: 'Security Settings', icon: User, badge: null },
    ]
  }
}
