"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CategoryFilterProps = {
  functionFilter: string
  setFunctionFilter: (value: string) => void
  rangeFilter: string
  setRangeFilter: (value: string) => void
  functions?: string[]
  bodyPart: string
}

export function CategoryFilter({
  functionFilter,
  setFunctionFilter,
  rangeFilter,
  setRangeFilter,
  functions = [],
  bodyPart,
}: CategoryFilterProps) {
  return (
    <div className="flex space-x-4">
      <Select value={functionFilter} onValueChange={setFunctionFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Function" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {bodyPart} Functions</SelectItem>
          {functions.map((func) => (
            <SelectItem key={func} value={func}>
              {func}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={rangeFilter} onValueChange={setRangeFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ranges</SelectItem>
          <SelectItem value="short">Short Range</SelectItem>
          <SelectItem value="long">Long Range</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

