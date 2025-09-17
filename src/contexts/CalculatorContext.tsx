'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CalculatorSimulation, MaintenanceItem, CalculatorResult } from '@/lib/types'

interface CalculatorContextType {
  simulations: CalculatorSimulation[]
  currentSimulation: CalculatorSimulation | null
  createSimulation: (name: string) => void
  updateSimulation: (simulation: Partial<CalculatorSimulation>) => void
  deleteSimulation: (id: string) => void
  selectSimulation: (id: string) => void
  clearCurrentSimulation: () => void
  addMaintenanceItem: (description: string, cost: number) => void
  updateMaintenanceItem: (id: string, description: string, cost: number) => void
  removeMaintenanceItem: (id: string) => void
  calculateResults: () => CalculatorResult
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined)

export function useCalculator() {
  const context = useContext(CalculatorContext)
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider')
  }
  return context
}

interface CalculatorProviderProps {
  children: React.ReactNode
}

export function CalculatorProvider({ children }: CalculatorProviderProps) {
  const [simulations, setSimulations] = useState<CalculatorSimulation[]>([])
  const [currentSimulation, setCurrentSimulation] = useState<CalculatorSimulation | null>(null)

  // Load simulations from localStorage on mount
  useEffect(() => {
    const savedSimulations = localStorage.getItem('calculator-simulations')
    if (savedSimulations) {
      try {
        setSimulations(JSON.parse(savedSimulations))
      } catch (error) {
        console.error('Error loading simulations from localStorage:', error)
      }
    } else {
      // Demo simulation matching RF-005 scenario
      const demoSimulation: CalculatorSimulation = {
        id: 'demo-1',
        userId: 'user1',
        name: 'Honda Civic Azul 2019',
        purchasePrice: 20000,
        auctioneerCommissionPercent: 5,
        maintenanceItems: [
          { id: '1', description: 'Troca de Pneus', cost: 1200 },
          { id: '2', description: 'Funilaria porta', cost: 500 }
        ],
        estimatedSalePrice: 30000,
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
      }
      setSimulations([demoSimulation])
    }
  }, [])

  // Save simulations to localStorage whenever simulations change
  useEffect(() => {
    localStorage.setItem('calculator-simulations', JSON.stringify(simulations))
  }, [simulations])

  // Save current simulation to localStorage
  useEffect(() => {
    if (currentSimulation) {
      localStorage.setItem('current-simulation', JSON.stringify(currentSimulation))
    } else {
      localStorage.removeItem('current-simulation')
    }
  }, [currentSimulation])

  const createSimulation = (name: string) => {
    const newSimulation: CalculatorSimulation = {
      id: Date.now().toString(),
      userId: 'user1', // TODO: Get from auth context
      name,
      purchasePrice: 0,
      auctioneerCommissionPercent: 5, // Default 5%
      maintenanceItems: [],
      estimatedSalePrice: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setSimulations(prev => [newSimulation, ...prev])
    setCurrentSimulation(newSimulation)
  }

  const updateSimulation = (updates: Partial<CalculatorSimulation>) => {
    if (!currentSimulation) return

    const updatedSimulation = {
      ...currentSimulation,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    setCurrentSimulation(updatedSimulation)
    setSimulations(prev =>
      prev.map(sim => sim.id === currentSimulation.id ? updatedSimulation : sim)
    )
  }

  const deleteSimulation = (id: string) => {
    setSimulations(prev => prev.filter(sim => sim.id !== id))
    if (currentSimulation?.id === id) {
      setCurrentSimulation(null)
    }
  }

  const selectSimulation = (id: string) => {
    const simulation = simulations.find(sim => sim.id === id)
    if (simulation) {
      setCurrentSimulation(simulation)
    }
  }

  const clearCurrentSimulation = () => {
    setCurrentSimulation(null)
  }

  const addMaintenanceItem = (description: string, cost: number) => {
    if (!currentSimulation) return

    const newItem: MaintenanceItem = {
      id: Date.now().toString(),
      description,
      cost
    }

    updateSimulation({
      maintenanceItems: [...currentSimulation.maintenanceItems, newItem]
    })
  }

  const updateMaintenanceItem = (id: string, description: string, cost: number) => {
    if (!currentSimulation) return

    updateSimulation({
      maintenanceItems: currentSimulation.maintenanceItems.map(item =>
        item.id === id ? { ...item, description, cost } : item
      )
    })
  }

  const removeMaintenanceItem = (id: string) => {
    if (!currentSimulation) return

    updateSimulation({
      maintenanceItems: currentSimulation.maintenanceItems.filter(item => item.id !== id)
    })
  }

  const calculateResults = (): CalculatorResult => {
    if (!currentSimulation) {
      return {
        totalMaintenanceCost: 0,
        totalVehicleCost: 0,
        profitMargin: 0,
        profitPercentage: 0
      }
    }

    const { purchasePrice, auctioneerCommissionPercent, maintenanceItems, estimatedSalePrice } = currentSimulation

    const totalMaintenanceCost = maintenanceItems.reduce((sum, item) => sum + item.cost, 0)
    const commissionCost = (purchasePrice * auctioneerCommissionPercent) / 100
    const totalVehicleCost = purchasePrice + commissionCost + totalMaintenanceCost
    const profitMargin = estimatedSalePrice - totalVehicleCost
    const profitPercentage = totalVehicleCost > 0 ? (profitMargin / totalVehicleCost) * 100 : 0

    return {
      totalMaintenanceCost,
      totalVehicleCost,
      profitMargin,
      profitPercentage
    }
  }

  return (
    <CalculatorContext.Provider
      value={{
        simulations,
        currentSimulation,
        createSimulation,
        updateSimulation,
        deleteSimulation,
        selectSimulation,
        clearCurrentSimulation,
        addMaintenanceItem,
        updateMaintenanceItem,
        removeMaintenanceItem,
        calculateResults
      }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}