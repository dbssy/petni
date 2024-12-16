import Image from 'next/image';
import Link from 'next/link';

interface ServicesCardProps {
  service: {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
  };
}

export function ServicesCard({ service }: ServicesCardProps) {
  const phoneNumber = '5511948208519';

  const message = `Oi! Eu quero saber mais informações do serviço ${service.title}, por favor!`;
  const encodedMessage = encodeURIComponent(message);

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  return (
    <div className="group bg-gray-200 rounded-xl p-2 relative space-y-4 overflow-hidden">
      <div className="relative">
        <Image
          src={service.imageUrl}
          alt={`Foto do serviço ${service.title}`}
          width="0"
          height="0"
          unoptimized
          className="w-full h-56 rounded-2xl object-cover"
        />

        <div className="absolute bottom-3 left-2.5 z-10">
          <div className="bg-white shadow-md rounded-lg flex items-center gap-2 p-2.5">
            <div className="relative flex items-center justify-center w-4 h-4 rounded-full bg-orange-200 animate-pulse">
              <div className="absolute w-2 h-2 rounded-full bg-orange-500"></div>
            </div>

            <span className="text-gray-800 font-semibold">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">{service.description}</div>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:-translate-y-4 transition-transform duration-300 ease-in-out flex justify-center">
        <Link
          href={whatsappLink}
          className="px-4 py-2 bg-teal-500 text-white font-semibold text-center rounded-lg hover:bg-teal-600"
        >
          Contratar agora
        </Link>
      </div>
    </div>
  );
}
