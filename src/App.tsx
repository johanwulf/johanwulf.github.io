import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skull, Trash2, Crosshair, Swords } from "lucide-react";

interface Character {
  id: number;
  name: string;
  race: string;
  class: string;
  damage: number;
  hit: number;
  miss: number;
  dps: number;
}

const classes = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];
const races = [
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Gnome",
  "Half-Elf",
  "Half-Orc",
  "Halfling",
  "Human",
  "Tiefling",
];

const App = () => {
  const [characters, setCharacters] = useState<Character[]>(
    JSON.parse(localStorage.getItem("characters") ?? "[]") || []
  );

  const [selectedName, setSelectedName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedDamage, setSelectedDamage] = useState(0);

  const handleClassChange = (e: string) => {
    setSelectedClass(e);
  };

  const handleRaceChange = (e: string) => {
    setSelectedRace(e);
  };

  const handleNameChange = (e: any) => {
    setSelectedName(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  const handleAddCharacter = () => {
    const newCharacter: Character = {
      id: Date.now(),
      name: selectedName,
      race: selectedRace,
      class: selectedClass,
      damage: 0,
      hit: 0,
      miss: 0,
      dps: 0,
    };

    setCharacters([...characters, newCharacter]);
    setSelectedName("");
    setSelectedRace("");
    setSelectedClass("");
  };

  const handleDamageChange = (id: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id
          ? {
              ...character,
              damage: character.damage + selectedDamage,
            }
          : character
      )
    );
    setSelectedDamage(0);
  };

  const handleHitAction = (id: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id
          ? { ...character, hit: character.hit + 1 }
          : character
      )
    );
  };

  const handleMissAction = (id: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id
          ? { ...character, miss: character.miss + 1 }
          : character
      )
    );
  };

  const handleRemoveCharacter = (id: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.id !== id)
    );
  };

  const calculateHitPercentage = (character: Character): number => {
    const totalActions = character.hit + character.miss;
    if (totalActions === 0) return 0;
    return (character.hit / totalActions) * 100;
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-2 max-w-screen-sm overflow-hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Add character</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add new character</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col gap-2">
                <Input
                  id="character-name"
                  placeholder="Name"
                  onChange={handleNameChange}
                />
                <Select onValueChange={handleClassChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Classes</SelectLabel>
                      {classes.map((classOption) => (
                        <SelectItem value={classOption} key={classOption}>
                          {classOption}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select onValueChange={handleRaceChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Race" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Races</SelectLabel>
                      {races.map((raceOption) => (
                        <SelectItem value={raceOption} key={raceOption}>
                          {raceOption}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <SheetClose asChild>
                  <Button
                    onClick={handleAddCharacter}
                    disabled={
                      selectedClass === "" ||
                      selectedRace === "" ||
                      selectedName === ""
                    }
                  >
                    Add Character
                  </Button>
                </SheetClose>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <ul className="list-none p-0">
        {characters.map((character) => (
          <Card
            key={character.id}
            className="bg-gray-900 rounded-lg p-4 mb-4 shadow-md w-full overflow-auto"
          >
            <div className="flex flex-row justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">
                  {character.name}
                </h4>
                <div className="flex h-5 items-center space-x-4 text-sm text-muted-foreground">
                  <div>{character.race}</div>
                  <Separator orientation="vertical" />
                  <div>{character.class}</div>
                </div>
              </div>
              <Button
                size="icon"
                onClick={() => handleRemoveCharacter(character.id)}
              >
                <Trash2 />
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-row gap-2 justify-between">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1">
                    <Button onClick={() => handleHitAction(character.id)}>
                      <Crosshair className="mr-2" /> Hit
                    </Button>

                    <Button onClick={() => handleMissAction(character.id)}>
                      <Skull className="mr-2" /> Miss
                    </Button>
                  </div>

                  <p className="text-white">
                    Hit Percentage:{" "}
                    {calculateHitPercentage(character).toFixed(2)}%
                  </p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-20" />
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1">
                    <Input
                      type="number"
                      value={selectedDamage}
                      onChange={(e: any) =>
                        setSelectedDamage(parseInt(e.target.value))
                      }
                    />

                    <Button onClick={() => handleDamageChange(character.id)}>
                      <Swords className="mr-2" /> Damage
                    </Button>
                  </div>

                  <p className="text-white">Total DPS: {character.damage}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default App;
