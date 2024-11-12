'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

// This would typically come from an API or database
const allCities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis",
  "Seattle", "Denver", "Washington", "Boston", "El Paso", "Detroit", "Nashville",
  "Portland", "Memphis", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore"
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCities, setFilteredCities] = useState(allCities)
  const [selectedCities, setSelectedCities] = useState<string[]>([])

  useEffect(() => {
    const filtered = allCities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCities(filtered)
  }, [searchTerm])

  const handleCityToggle = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city]
    )
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ScrollArea className="h-[300px] border rounded-md p-4">
        {filteredCities.map(city => (
          <div key={city} className="flex items-center space-x-2 py-2">
            <Checkbox
              id={city}
              checked={selectedCities.includes(city)}
              onCheckedChange={() => handleCityToggle(city)}
            />
            <Label htmlFor={city}>{city}</Label>
          </div>
        ))}
      </ScrollArea>
      <div>
        <h3 className="font-semibold">Selected Cities:</h3>
        <p>{selectedCities.join(', ')}</p>
      </div>
    </div>
  )
}