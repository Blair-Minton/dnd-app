import tkinter as tk
from tkinter import messagebox
import requests

SUPABASE_URL = "https://vstjjopqqtmtmbxtixiq.supabase.co/rest/v1/characters"
SUPABASE_KEY = "sb_publishable_Swcj_JW0SPa1KxZmeL_K0A_52Hi8u9H"

def send_to_supabase(name, species, level, classes, subclasses, background, proficiency_bonus, 
                     str_score, dex_score, con_score, int_score, wis_score, cha_score, 
                     str_save, dex_save, con_save, int_save, wis_save, cha_save, 
                     acrobatics, animal_handling, arcana, athletics, deception, history, 
                     insight, intimidation, investigation, medicine, nature, perception, 
                     performance, persuasion, religion, sleight_of_hand, stealth, survival, 
                     passive_perception, passive_investigation, passive_insight, 
                     armor_class, initiative, speed, hit_points, temp_hit_points, hit_dice, mode):
    
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }
    
    # Values updated to snake_case; Keys kept as-is for API compatibility
    payload = {
        "name": name,
        "species": species,
        "level": level,
        "classes": classes,
        "subclasses": subclasses,
        "background": background,
        "proficiency_bonus": proficiency_bonus,
        "str_score": str_score,
        "dex_score": dex_score,
        "con_score": con_score,
        "int_score": int_score,
        "wis_score": wis_score,
        "cha_score": cha_score,
        "str_save": str_save,
        "dex_save": dex_save,
        "con_save": con_save,
        "int_save": int_save,
        "wis_save": wis_save,
        "cha_save": cha_save,
        "acrobatics": acrobatics,
        "animal_handling": animal_handling,
        "arcana": arcana,
        "athletics": athletics,
        "deception": deception,
        "history": history,
        "insight": insight,
        "intimidation": intimidation,
        "investigation": investigation,
        "medicine": medicine,
        "nature": nature,
        "religion": religion,
        "perception": perception,
        "performance": performance,
        "persuasion": persuasion,
        "sleight_of_hand": sleight_of_hand,
        "stealth": stealth,
        "survival": survival,
        "passive_perception": passive_perception,
        "passive_investigation": passive_investigation,
        "passive_insight": passive_insight,
        "armor_class": armor_class,
        "initiative": initiative,
        "speed": speed,
        "hit_points": hit_points,
        "temp_hit_points": temp_hit_points,
        "hit_dice": hit_dice,
    }

    filtered_payload = {k: v for k, v in payload.items() if v is not None and str(v).strip() != ""}

    try:
        if mode == "add":
            
            response = requests.post(SUPABASE_URL, headers=headers, json=payload)
        else:
            
            update_url = f"{SUPABASE_URL}?name=eq.{name}"
            
            if not filtered_payload:
                messagebox.showwarning("Warning", "No changes detected to update.")
                return

            response = requests.patch(update_url, headers=headers, json=filtered_payload)

        if response.status_code in [200, 201, 204]:
            messagebox.showinfo("Success", f"Character '{name}' {'added' if mode == 'add' else 'updated'} successfully!")
        else:
            messagebox.showerror("Error", f"Failed: {response.status_code}\n{response.text}")
            
    except Exception as e:
        messagebox.showerror("Error", f"An error occurred: {str(e)}")

def open_form(mode):
    window = tk.Toplevel()
    window.title("Add New Character" if mode == "add" else "Update Existing Character")
    window.geometry("500x600")

    main_frame = tk.Frame(window)
    main_frame.pack(fill=tk.BOTH, expand=1)

    canvas = tk.Canvas(main_frame)
    canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=1)

    scrollbar = tk.Scrollbar(main_frame, orient=tk.VERTICAL, command=canvas.yview)
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    canvas.configure(yscrollcommand=scrollbar.set)
    canvas.bind('<Configure>', lambda e: canvas.configure(scrollregion=canvas.bbox("all")))

    scrollable_frame = tk.Frame(canvas)
    canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")

    fields = [
        "Character Name", "Species", "Level", "Classes", "Subclasses", "Background",
        "Proficiency Bonus", "Strength Score", "Dexterity Score", "Constitution Score",
        "Intelligence Score", "Wisdom Score", "Charisma Score", "Strength Save",
        "Dexterity Save", "Constitution Save", "Intelligence Save", "Wisdom Save",
        "Charisma Save", "Acrobatics", "Animal Handling", "Arcana", "Athletics",
        "Deception", "History", "Insight", "Intimidation", "Investigation",
        "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion",
        "Sleight of Hand", "Stealth", "Survival", "Passive Perception",
        "Passive Investigation", "Passive Insight", "Armor Class", "Initiative",
        "Speed", "Hit Points", "Temporary Hit Points", "Hit Dice"
    ]

    entries = {}
    for i, field in enumerate(fields):
        tk.Label(scrollable_frame, text=f"{field}:").grid(row=i, column=0, padx=10, pady=5, sticky="e")
        entry = tk.Entry(scrollable_frame, width=40)
        entry.grid(row=i, column=1, padx=10, pady=5)
        entries[field] = entry

    def handle_submit():
        data = {field: entries[field].get().strip() or None for field in fields}
        
        if data["Character Name"]:
            send_to_supabase(
                name=data["Character Name"],
                species=data["Species"],
                level=data["Level"],
                classes=data["Classes"],
                subclasses=data["Subclasses"],
                background=data["Background"],
                proficiency_bonus=data["Proficiency Bonus"],
                str_score=data["Strength Score"],
                dex_score=data["Dexterity Score"],
                con_score=data["Constitution Score"],
                int_score=data["Intelligence Score"],
                wis_score=data["Wisdom Score"],
                cha_score=data["Charisma Score"],
                str_save=data["Strength Save"],
                dex_save=data["Dexterity Save"],
                con_save=data["Constitution Save"],
                int_save=data["Intelligence Save"],
                wis_save=data["Wisdom Save"],
                cha_save=data["Charisma Save"],
                acrobatics=data["Acrobatics"],
                animal_handling=data["Animal Handling"],
                arcana=data["Arcana"],
                athletics=data["Athletics"],
                deception=data["Deception"],
                history=data["History"],
                insight=data["Insight"],
                intimidation=data["Intimidation"],
                investigation=data["Investigation"],
                medicine=data["Medicine"],
                nature=data["Nature"],
                perception=data["Perception"],
                performance=data["Performance"],
                persuasion=data["Persuasion"],
                religion=data["Religion"],
                sleight_of_hand=data["Sleight of Hand"],
                stealth=data["Stealth"],
                survival=data["Survival"],
                passive_perception=data["Passive Perception"],
                passive_investigation=data["Passive Investigation"],
                passive_insight=data["Passive Insight"],
                armor_class=data["Armor Class"],
                initiative=data["Initiative"],
                speed=data["Speed"],
                hit_points=data["Hit Points"],
                temp_hit_points=data["Temporary Hit Points"],
                hit_dice=data["Hit Dice"],
                mode=mode,
            )
            window.destroy()
        else:
            messagebox.showwarning("Input Error", "Character Name is required.")

    btn_text = "Create Character" if mode == "add" else "Update Character"
    tk.Button(scrollable_frame, text=btn_text, command=handle_submit, bg="#e1e1e1").grid(
        row=len(fields), column=0, columnspan=2, pady=20
    )

    def _on_mousewheel(event):
        canvas.yview_scroll(int(-1*(event.delta/120)), "units")
    
    canvas.bind_all("<MouseWheel>", _on_mousewheel)

def main_menu():
    root = tk.Tk()
    root.title("Character Manager")
    root.geometry("300x200")

    tk.Label(root, text="Select an Action", font=("Arial", 14, "bold")).pack(pady=20)

    tk.Button(root, text="Add New Character", width=25, 
              command=lambda: open_form("add")).pack(pady=10)
    
    tk.Button(root, text="Modify Existing Character", width=25, 
              command=lambda: open_form("modify")).pack(pady=10)

    root.mainloop()

if __name__ == "__main__":
    main_menu()