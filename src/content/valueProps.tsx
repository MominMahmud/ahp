import { ComplianceIcon, DiscoverIcon, RiskIcon } from '@/pages/RequestDemo/icons'

export const VALUE_PROPS = [
  {
    icon: DiscoverIcon,
    title: 'Discover every device',
    description: 'A lightweight collector finds what is on your network. Nothing counts as trusted until you approve it.',
  },
  {
    icon: RiskIcon,
    title: 'Find what is at risk',
    description: 'Authenticated, black-box and container scans feed one prioritised list, ranked by how critical each asset is.',
  },
  {
    icon: ComplianceIcon,
    title: 'Prove compliance',
    description: 'Patch and software-version compliance tracked daily, with PDF reports your auditors can use as-is.',
  },
] as const
