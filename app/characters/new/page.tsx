import { redirect } from "next/navigation";
import { supabaseFetch } from "@/lib/supabase-api";

export default async function NewCharacter() {
    async function createCharacter(formData: FormData) {
        'use server';

        const characterData = {
            // Character Details
            name: formData.get('name'),
            species: formData.get('species'),
            level: formData.get('level'),
            class: formData.get('class'),
            subclass: formData.get('subclass'),
            background: formData.get('background'),
            proficiency_bonus: formData.get('proficiency_bonus'),

            // Ability Scores
            strength: formData.get('strength'),
            dexterity: formData.get('dexterity'),
            constitution: formData.get('constitution'),
            intelligence: formData.get('intelligence'),
            wisdom: formData.get('wisdom'),
            charisma: formData.get('charisma'),
            
            // Save Scores
            strength_save: formData.get('strength_save'),
            dexterity_save: formData.get('dexterity_save'),
            constitution_save: formData.get('constitution_save'),
            intelligence_save: formData.get('intelligence_save'),
            wisdom_save: formData.get('wisdom_save'),
            charisma_save: formData.get('charisma_save'),
            
            // Skills
            acrobatics: formData.get('acrobatics'),
            animal_handling: formData.get('animal_handling'),
            arcana: formData.get('arcana'),
            athletics: formData.get('athletics'),
            deception: formData.get('deception'),
            history: formData.get('history'),
            insight: formData.get('insight'),
            intimidation: formData.get('intimidation'),
            investigation: formData.get('investigation'),
            medicine: formData.get('medicine'),
            nature: formData.get('nature'),
            perception: formData.get('perception'),
            performance: formData.get('performance'),
            persuasion: formData.get('persuasion'),
            religion: formData.get('religion'),
            sleight_of_hand: formData.get('sleight_of_hand'),
            stealth: formData.get('stealth'),
            survival: formData.get('survival'),
            
            // Passive Scores
            passive_perception: formData.get('passive_perception'),
            passive_investigation: formData.get('passive_investigation'),
            passive_insight: formData.get('passive_insight'),
            
            // Combat Stats
            armor_class: formData.get('armor_class'),
            initiative: formData.get('initiative'),
            speed: formData.get('speed'),
            hit_points: formData.get('hit_points'),
            temporary_hit_points: formData.get('temporary_hit_points'),
            hit_dice: formData.get('hit_dice'),
            
            // Other Details

        };

        await supabaseFetch('characters', {
            method: 'POST',
            body: JSON.stringify(characterData),
        });

        redirect('/');
    }

    return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Forge a New Hero</h1>
      <form action={createCharacter} className="flex flex-col gap-4">
        {/* <input name="" placeholder="" className="border p-2" /> */}

        {/* Character Stats */}
        <input name="name" placeholder="Character Name" className="border p-2" required />
        <input name="species" placeholder="Species" className="border p-2" />
        <input name="level" type="number" defaultValue="1" className="border p-2" />
        <input name="classes" placeholder="Classes" className="border p-2" />
        <input name="subclasses" placeholder="Subclasses" className="border p-2" />
        <input name="background" placeholder="Background" className="border p-2" />
        <input name="proficiency_bonus" placeholder="Proficiency Bonus" className="border p-2" />
        
        {/* Ability Scores */}
        <input name="str_score" placeholder="Strength" className="border p-2" />
        <input name="dex_score" placeholder="Dexterity" className="border p-2" />
        <input name="con_score" placeholder="Constitution" className="border p-2" />
        <input name="int_score" placeholder="Intelligence" className="border p-2" />
        <input name="wis_score" placeholder="Wisdom" className="border p-2" />
        <input name="cha_score" placeholder="Charisma" className="border p-2" />
        
        {/* Save Scores */}
        <input name="str_save" placeholder="Strength Save" className="border p-2" />
        <input name="dex_save" placeholder="Dexterity Save" className="border p-2" />
        <input name="con_save" placeholder="Constitution Save" className="border p-2" />
        <input name="int_save" placeholder="Intelligence Save" className="border p-2" />
        <input name="wis_save" placeholder="Wisdom Save" className="border p-2" />
        <input name="cha_save" placeholder="Charisma Save" className="border p-2" />
        
        {/* Skills */}
        <input name="acrobatics" placeholder="Acrobatics" className="border p-2" />
        <input name="animal_handling" placeholder="Animal Handling" className="border p-2" />
        <input name="arcana" placeholder="Arcana" className="border p-2" />
        <input name="athletics" placeholder="Athletics" className="border p-2" />
        <input name="deception" placeholder="Deception" className="border p-2" />
        <input name="history" placeholder="History" className="border p-2" />
        <input name="insight" placeholder="Insight" className="border p-2" />
        <input name="intimidation" placeholder="Intimidation" className="border p-2" />
        <input name="investigation" placeholder="Investigation" className="border p-2" />
        <input name="medicine" placeholder="Medicine" className="border p-2" />
        <input name="nature" placeholder="Nature" className="border p-2" />
        <input name="perception" placeholder="Perception" className="border p-2" />
        <input name="performance" placeholder="Performance" className="border p-2" />
        <input name="persuasion" placeholder="Persuasion" className="border p-2" />
        <input name="religion" placeholder="Religion" className="border p-2" />
        <input name="sleight_of_hand" placeholder="Sleight of Hand" className="border p-2" />
        <input name="stealth" placeholder="Stealth" className="border p-2" />
        <input name="survival" placeholder="Survival" className="border p-2" />        
        
        {/* Passive Skills */}
        <input name="passive_perception" placeholder="Passive Perception" className="border p-2" />
        <input name="passive_investigation" placeholder="Passive Investigation" className="border p-2" />
        <input name="passive_insight" placeholder="Passive Insight" className="border p-2" />
        
        {/* Statistics */}
        <input name="armor_class" placeholder="Armor Class" className="border p-2" />
        <input name="initiative" placeholder="Initiative" className="border p-2" />
        <input name="speed" placeholder="Speed" className="border p-2" />
        <input name="hit_points" placeholder="Hit Points" className="border p-2" />
        <input name="temp_hit_points" placeholder="Temporary Hit Points" className="border p-2" />
        <input name="hit_dice" placeholder="Hit Dice" className="border p-2" />
        


        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Save Character
        </button>
      </form>
    </main>
    );
}
