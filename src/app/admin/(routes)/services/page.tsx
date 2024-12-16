import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ServiceTypesTab } from './_components/service-types/service-types-tab';
import { ServicesTab } from './_components/services/services-tab';

export default function ServicesPage() {
  return (
    <>
      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">Ordens de Serviço</TabsTrigger>
          <TabsTrigger value="types">Tipos de Serviço</TabsTrigger>
        </TabsList>

        <ServicesTab />
        <ServiceTypesTab />
      </Tabs>
    </>
  );
}
