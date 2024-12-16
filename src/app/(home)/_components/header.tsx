import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <>
      <header className="bg-white border-b">
        <div className="container h-24 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <span className="text-teal-500">Pet</span>
            <span className="text-orange-500">Ni</span>
          </h2>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="https://api.whatsapp.com/send/?phone=5511948208519"
              target="_blank"
            >
              <Image
                src="/whatsapp.png"
                alt="Whatsapp logo"
                width={24}
                height={24}
              />
            </Link>

            <Link
              href="https://www.instagram.com/petni.com.br/"
              target="_blank"
            >
              <Image
                src="/instagram.png"
                alt="Instagram logo"
                width={24}
                height={24}
              />
            </Link>

            <Link href="/" target="_blank">
              <Image
                src="/facebook.png"
                alt="Facebook logo"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
