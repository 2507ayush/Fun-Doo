import { createContext, useContext, useState } from 'react'

const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(true)

  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  return useContext(DrawerContext)
}