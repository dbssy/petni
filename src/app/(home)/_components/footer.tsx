import { Clock, PawPrint, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const serviceTitle = 'Desenvolvimento de Sites';
  const phoneNumber = '551949621048';

  const message = `Oi! Eu quero saber mais informações do serviço ${serviceTitle}, por favor!`;
  const encodedMessage = encodeURIComponent(message);

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  return (
    <div className="bg-gray-950 border-t border-gray-400 text-gray-400">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <PawPrint className="w-20 h-20 text-teal-500" />

            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
              ut, culpa sed voluptatem totam rem porro provident consequatur
              distinctio? Distinctio at delectus facere ullam quidem obcaecati
              cupiditate cum odit porro.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-gray-100 font-bold">Atendimento ao Cliente</h2>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />

              <span className="text-gray-50 text-sm font-semibold">
                Segunda a Sábado: 08h00 às 18h00
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />

              <span className="text-gray-50 text-sm font-semibold">
                (11) 94820-8519
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium">Pagamento Seguro</span>

              <span className="font-medium">Atendimento Humanizado</span>

              <span className="font-medium">Planos mensais e muito mais!</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-gray-100 font-bold">Onde nos encontrar!</h2>

            <div className="flex flex-col gap-1">
              <span className="text-gray-50 font-semibold">
                Rua José Cury Andere, 280
              </span>

              <span>Alto Ipiranga, Mogi das Cruzes</span>

              <span>08730-700</span>
            </div>

            <div className="relative w-full h-36 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.7359755392!2d-46.20348612388436!3d-23.541996760882512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cdd87ae1b73361%3A0xbfd512b737b6537f!2sR.%20Jos%C3%A9%20Cury%20Andere%2C%20280%20-%20Alto%20Ipiranga%2C%20Mogi%20das%20Cruzes%20-%20SP%2C%2008730-400!5e0!3m2!1spt-BR!2sbr!4v1732887416515!5m2!1spt-BR!2sbr"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>
          Feito com <span className="text-red-500">❤️</span> por{' '}
          <Link
            href={whatsappLink}
            target="_blank"
            className="text-teal-500 font-medium hover:text-teal-600 hover:underline"
          >
            João Debussy
          </Link>
        </p>
      </footer>
    </div>
  );
}
