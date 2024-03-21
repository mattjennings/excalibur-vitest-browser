import { resources } from 'vite-plugin-excalibur-resources/runtime'
import { DevLoader } from './loaders/dev'

export const loader =
  import.meta.env.MODE === 'development' || import.meta.env.MODE === 'test'
    ? new DevLoader(resources)
    : new ex.Loader(resources)
