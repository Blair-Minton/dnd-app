// app/characters/[id]/page.tsx
import { supabaseFetch } from '../../../lib/supabase-api';
import Link from 'next/link';

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15+, params is a promise
  const { id } = await params;
  
  // Fetch only the specific character using a filter
  const data = await supabaseFetch(`characters?id=eq.${id}&select=*`);
  const char = data[0];

  if (!char) {
    return <div className="p-8">Character not found.</div>;
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        ← Back to Dashboard
      </Link>
      
      <div className="bg-black border rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">{char.name}</h1>
        <p className="text-xl text-gray-500 mb-6">
          Level {char.level} {char.species} {char.classes}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <section className="border p-4 rounded md:row-span-2 bg_gray-900/50">
            <h3 className="font-bold border-b mb-2">Ability Scores</h3>
            <p>Strength: {char.str_score}</p>
            <p>Dexterity: {char.dex_score}</p>
            <p>Constitution: {char.con_score}</p>
            <p>Intelligence: {char.int_score}</p>
            <p>Wisdom: {char.wis_score}</p>
            <p>Charisma: {char.cha_score}</p>
            <p className="pb-4"></p>
            <h3 className="font-bold border-b mb-2">Saves</h3>
            <p>Strength: {char.str_save}</p>
            <p>Dexterity: {char.dex_save}</p>
            <p>Constitution: {char.con_save}</p>
            <p>Intelligence: {char.int_save}</p>
            <p>Wisdom: {char.wis_save}</p>
            <p>Charisma: {char.cha_save}</p>
          </section>

          <section className="border p-4 rounded">
            <h3 className="font-bold border-b mb-2">Hit Points</h3>
            <p>Current: {char.hit_points_current}</p>
            <p>Total: {char.hit_points_total}</p>
            <p>Spent Hit Dice: {char.spent_hit_dice}</p>
            <p>Total Hit Dice: {char.hit_dice}</p>
          </section>

          <section className="border p-4 rounded">
            <h3 className="font-bold border-b mb-2">Stats</h3>
            <p>Armor Class: {char.armor_class}</p>
            <p>Speed: {char.speed}ft</p>
            <p>Initiative: {char.initiative}</p>
            <p>Proficiency Bonus: {char.proficiency_bonus}</p>
          </section>

          <section className="border p-4 rounded">
            <h3 className="font-bold border-b mb-2">Passive Skills</h3>
            <p>Passive Perecption: {char.passive_perception}</p>
            <p>Passive Investigation: {char.passive_investigation}</p>
            <p>Passive Insight: {char.passive_insight}</p>
          </section>

          <section className="border p-4 rounded">
            <h3 className="font-bold border-b mb-2">Proficiencies</h3>
            <p>Strength: {char.str_save}</p>
            <p>Dexterity: {char.dex_save}</p>
            <p>Constitution: {char.con_save}</p>
            <p>Intelligence: {char.int_save}</p>
            <p>Wisdom: {char.wis_save}</p>
            <p>Charisma: {char.cha_save}</p>
          </section>

        </div>
      </div>
    </main>
  );
}