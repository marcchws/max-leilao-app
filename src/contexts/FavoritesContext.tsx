'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Favorite, Vehicle } from '@/lib/types'
import { mockVehicles } from '@/lib/mock-data'

interface FavoritesContextType {
  favorites: Favorite[]
  favoriteVehicles: Vehicle[]
  isFavorited: (vehicleId: string) => boolean
  addFavorite: (vehicleId: string) => void
  removeFavorite: (vehicleId: string) => void
  toggleFavorite: (vehicleId: string) => void
  clearAllFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

interface FavoritesProviderProps {
  children: React.ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error)
      }
    } else {
      // Initial demo favorites - matching RF-004 scenario with Civic and Ford Ranger interest
      const demoFavorites: Favorite[] = [
        {
          id: 'demo-1',
          userId: 'user1',
          vehicleId: '1', // Honda Civic
          createdAt: '2025-01-15T10:00:00Z'
        },
        {
          id: 'demo-2',
          userId: 'user1',
          vehicleId: '6', // Chevrolet Onix (similar compact car)
          createdAt: '2025-01-15T10:05:00Z'
        }
      ]
      setFavorites(demoFavorites)
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  // Get favorite vehicles by joining with mock vehicles data
  const favoriteVehicles = favorites
    .map(favorite => mockVehicles.find(vehicle => vehicle.id === favorite.vehicleId))
    .filter((vehicle): vehicle is Vehicle => vehicle !== undefined)

  const isFavorited = (vehicleId: string) => {
    return favorites.some(favorite => favorite.vehicleId === vehicleId)
  }

  const addFavorite = (vehicleId: string) => {
    if (!isFavorited(vehicleId)) {
      const newFavorite: Favorite = {
        id: Date.now().toString(),
        userId: 'user1', // TODO: Get from auth context
        vehicleId,
        createdAt: new Date().toISOString()
      }
      setFavorites(prev => [...prev, newFavorite])
    }
  }

  const removeFavorite = (vehicleId: string) => {
    setFavorites(prev => prev.filter(favorite => favorite.vehicleId !== vehicleId))
  }

  const toggleFavorite = (vehicleId: string) => {
    if (isFavorited(vehicleId)) {
      removeFavorite(vehicleId)
    } else {
      addFavorite(vehicleId)
    }
  }

  const clearAllFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteVehicles,
        isFavorited,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        clearAllFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}