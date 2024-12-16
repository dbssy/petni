import { Pet } from '@prisma/client';
import Link from 'next/link';

interface CustomerPetsProps {
  pets: Pet[];
}

export function CustomerPets({ pets }: CustomerPetsProps) {
  const hasPets = pets.length > 0;

  return (
    <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-800 text-xl font-bold flex items-center gap-2">
          <span>🐾</span>
          Pets
        </h3>
        {hasPets && (
          <span className="text-gray-500 text-sm">{pets.length} pet(s)</span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hasPets ? (
          pets.map((pet) => (
            <Link
              key={pet.id}
              href={`/admin/pets/${pet.id}`}
              className="group bg-gray-50 hover:bg-gray-100 border border-gray-300 shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105"
            >
              <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                🐕
              </div>

              <span className="text-gray-800 font-medium">{pet.name}</span>
              <span className="text-gray-500 text-sm">{pet.species}</span>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center text-center text-gray-500 space-y-2">
            <span className="text-4xl">😿</span>
            <span className="text-sm">
              Esse cliente ainda não possui pets cadastrados!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
