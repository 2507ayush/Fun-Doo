import { createContext, useContext, useState } from 'react'

const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const[click,setClick] = useState(true);
  const handlePattern = () => {
    setClick(prev => !prev)
  }

  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer,click,handlePattern }}>
      {children}
    </DrawerContext.Provider>
  )
}
export const useDrawer = () => {
  return useContext(DrawerContext)
}