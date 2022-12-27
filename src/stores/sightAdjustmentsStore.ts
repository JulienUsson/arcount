import AsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'
import create from 'zustand'
import { persist } from 'zustand/middleware'

export interface SightAdjustment {
  distance: number
  value: number
}

interface SightAdjustmentsState {
  adjustments: SightAdjustment[]
  set: (adjustment: SightAdjustment) => void
  remove: (index: number) => void
}

export const useSightAdjustmentsStore = create<SightAdjustmentsState>()(
  persist(
    (set) => ({
      adjustments: [],
      set: (adjustment) =>
        set(({ adjustments }) => ({
          adjustments: _.sortBy(
            [adjustment, ...adjustments.filter((adj) => adj.distance !== adjustment.distance)],
            (adjustment) => adjustment.distance,
          ),
        })),
      remove: (index) =>
        set(({ adjustments }) => ({
          adjustments: adjustments.filter((_adjustment, i) => i !== index),
        })),
    }),
    {
      name: '@sightAdjustments',
      getStorage: () => AsyncStorage,
    },
  ),
)
