// global.cache is needed because of how remix local dev works
// see https://remix.run/docs/en/v1/other-api/serve

export type TodoItem = {
  id: number
  completed?: boolean
  deleted?: boolean
  description: string
}

const getGlobal = () =>
  global as typeof global & {
    db: TodoItem[]
    idTracker?: number
    hasLoaded: boolean
  }
const state = getGlobal()

const newId = () => {
  state.idTracker = (state.idTracker ?? 0) + 1
  return state.idTracker
}

export const db = {
  load: () => state.db ?? [],
  save: function (
    items: (Omit<TodoItem, 'id'> & Partial<Pick<TodoItem, 'id'>>)[],
  ) {
    state.db = items.map(t => ({
      ...t,
      id: t.id ?? newId(),
    }))
    return state.db
  },
  patch: function (id: number, patch: Partial<Omit<TodoItem, 'id'>>) {
    state.db = state.db.map(t =>
      t.id !== id
        ? t
        : {
            ...t,
            ...patch,
          },
    )
  },
  append: (item: Omit<TodoItem, 'id'> & Partial<Pick<TodoItem, 'id'>>) =>
    db.save([...db.load(), item]),
  populateSample: () => {
    db.save([
      { description: 'Pet the cat' },
      { description: 'Bath the cat' },
      { description: 'Attend hospital due to cat related injuries' },
    ])
  },
}

if (!state.hasLoaded) {
  db.populateSample()
  state.hasLoaded = true
}
