import type { HabitisValues } from "@models/models"
import { createContext, useCallback, useEffect, useState } from "react"

interface AppContextProps {
  saveData: (newItems: HabitisValues[]) => void
  getData: () => HabitisValues[]
  items: HabitisValues[] | []
}

type Props = {
  children?: React.ReactNode
}

export const AppContext = createContext<AppContextProps>({
  saveData: () => {},
  getData: () => [],
  items: [],
})

export const AppContextProvider = ({ children }: Props) => {
  const [items, setItems] = useState<HabitisValues[]>([])

  const saveData = useCallback((newItems: HabitisValues[]) => {
    localStorage.setItem("habitis", JSON.stringify(newItems))
    setItems(newItems)
  }, [])

  const getData = useCallback((): HabitisValues[] => {
    const storedData = localStorage.getItem("habitis")
    if (storedData) {
      return JSON.parse(storedData) as HabitisValues[]
    } else return []
  }, [])

  useEffect(() => {
    setItems(getData())
  }, [getData])

  return (
    <AppContext.Provider
      value={{
        saveData,
        getData,
        items,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
