import { ServicesCard } from './services-card';

const services = [
  {
    id: '1',
    imageUrl: 'https://placehold.co/384x224/png',
    title: 'Banho',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, at corrupti? Ipsam est recusandae quod, obcaecati impedit provident.',
  },
  {
    id: '2',
    imageUrl: 'https://placehold.co/384x224/png',
    title: 'Tosa higiênica',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, at corrupti? Ipsam est recusandae quod, obcaecati impedit provident.',
  },
  {
    id: '3',
    imageUrl: 'https://placehold.co/384x224/png',
    title: 'Escovação dentária',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, at corrupti? Ipsam est recusandae quod, obcaecati impedit provident.',
  },
  {
    id: '4',
    imageUrl: 'https://placehold.co/384x224/png',
    title: 'Hotelzinho',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, at corrupti? Ipsam est recusandae quod, obcaecati impedit provident.',
  },
  {
    id: '5',
    imageUrl: 'https://placehold.co/384x224/png',
    title: 'Pacotes semanais',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, at corrupti? Ipsam est recusandae quod, obcaecati impedit provident.',
  },
  {
    id: '6',
    imageUrl: 'https://placehold.co/384x224/png',
    title: 'Pacotes mensais',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, at corrupti? Ipsam est recusandae quod, obcaecati impedit provident.',
  },
];

export function Services() {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-gray-900 text-3xl font-bold">Nossos Serviços</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-8">
          {services.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
