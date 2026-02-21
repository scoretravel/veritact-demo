import { createFileRoute } from '@tanstack/react-router';
import { IdentifyAppliancePage } from '@/components/identify-appliance/identify-appliance-page';

export const Route = createFileRoute('/identify')({
  component: IdentifyAppliancePage,
});
