import { showText } from "./helpers/instructions"
import { locationInput } from './helpers/interactions'
import { hitKey, type } from './helpers/typing'
import { waitForSuggestions } from './helpers/waiting'
import { get, writable } from 'svelte/store'

export default writable([
  {
    name: `Type something, see suggestions, click on one`,
    setup: async () => await type('new').then(waitForSuggestions),
    go: () => showText('Please click on the first suggestion'),
    passed: () => get(locationInput).value === 'New York, NY, USA',
  },
  {
    name: `Type something, see suggestions, don't select any, hit Enter`,
    setup: async () => await type('atl').then(waitForSuggestions),
    go: () => hitKey('Enter', 0, 13),
    passed: () => get(locationInput).value === 'Atlanta, GA, USA',
  },
  {
    name: `Type something, see suggestions, don't select any, hit Tab`,
    setup: async () => await type('new').then(waitForSuggestions),
    go: () => hitKey('Tab', 0, 9),
    passed: () => get(locationInput).value === 'New York, NY, USA',
  },
  {
    name: `Type something, see suggestions, select one via Arrow keys, hit Enter`,
    setup: async () => {
      await type('atl')
      await waitForSuggestions()
      return hitKey('ArrowDown', 0, 40)
    },
    go: () => hitKey('Enter', 0, 13),
    passed: () => get(locationInput).value === 'Atlanta, GA, USA',
  },
  {
    name: `Type something, see suggestions, select one via Arrow keys, hit Tab`,
    setup: async () => {
      await type('new')
      await waitForSuggestions()
      return hitKey('ArrowDown', 0, 40)
    },
    go: () => hitKey('Tab', 0, 9),
    passed: () => get(locationInput).value === 'New York, NY, USA',
  },
])
