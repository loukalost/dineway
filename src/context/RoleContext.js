import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const RoleContext = createContext()

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem('userRole')
      if (storedRole) setRole(storedRole)
    }

    loadRole()
  }, [])

  const clearRole = async () => {
    await AsyncStorage.removeItem('userRole')
    setRole(null)
  }

  return (
    <RoleContext.Provider value={{ role, setRole, clearRole }}>
      {children}
    </RoleContext.Provider>
  )
}
