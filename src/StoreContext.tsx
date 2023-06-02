import React, { createContext, useContext, useState } from 'react'

type StoreNameType = {
  storeName: string
  setStoreName: React.Dispatch<React.SetStateAction<string>>
}

const iStoreNameState = {
  storeName: '',
  setStoreName: () => {},
}

const StoreContext = createContext<StoreNameType>(iStoreNameState)

export function StoreContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [storeName, setStoreName] = useState<string>('')
  return (
    <StoreContext.Provider value={{ storeName, setStoreName }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStoreContext() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('Cannot find StoreProvider')
  return store
}
