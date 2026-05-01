import Link from 'next/link';
import { supabaseFetch} from '../lib/supabase-api';

export default async function Dashboard() {
  const characters = await supabaseFetch('characters?select=*');

  return (
    <main className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Characters</h1>
        <Link href="/characters/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Character
        </Link>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {characters.map((char: any) => (
          <div key={char.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{char.name}</h2>
            <p className="text-gray-600">Level {char.level} {char.species} {char.classes}</p>
            <p className="text-gray-600">STR: {char.str_score} DEX: {char.dex_score} CON: {char.con_score}</p>
            <p className="text-gray-600">INT: {char.int_score} WIS: {char.wis_score} CHA: {char.cha_score}</p>
            <p className="text-gray-600">AC: {char.armor_class} HP: {char.hit_points}</p>
            <p className="text-gray-600">Speed: {char.speed} Initiative: {char.initiative}</p>
            <p className="text-gray-600">Proficiency Bonus: {char.proficiency_bonus}</p>
             {/* Add more character details as needed */}
          </div>
        ))}
      </div>
    </main>
    );
}
