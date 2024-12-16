import Image from 'next/image';

export function Hero() {
  return (
    <div className=" h-[51.7rem] md:h-[34rem] mt-10">
      <div className="bg-gradient-to-r from-teal-100 to-orange-100 md:rounded-3xl relative container">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/pattern.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '100%',
            opacity: 0.2,
            filter: 'blur(3px)',
          }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between container relative z-10">
          <div className="text-left max-w-md">
            <h1 className="text-5xl font-bold leading-tight text-gray-900">
              O melhor <br />
              cuidado <br />
              para seu <br />
              <span className="text-orange-500">melhor amigo</span>
            </h1>

            <p className="mt-4 text-gray-600 font-medium">
              Está esperando o que para fazer seu pet mais feliz? <br />
              Aqui você encontra o cuidado que seu pet merece. <br />
              Banho, tosa, rações e acessórios.
            </p>

            <button className="mt-6 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:cursor-pointer focus:outline-none">
              Agendar serviço
            </button>
          </div>

          <div className="md:absolute md:top-[2.59rem] md:right-20 z-10">
            <Image
              src="/dog.png"
              alt="Cachorro feliz"
              width={420}
              height={420}
              priority
              className="w-[28rem] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
