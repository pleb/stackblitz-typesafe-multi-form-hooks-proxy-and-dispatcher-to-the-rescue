// global.cache is needed before of how remix local dev works
// see https://remix.run/docs/en/v1/other-api/serve
declare module global {
  let db: TodoItem[]
  let idTracker: number
  let hasLoaded: boolean
}

export type TodoItem = {
  id: number
  completed?: boolean
  deleted?: boolean
  description: string
}

const newId = () => {
  global.idTracker = (global.idTracker ?? 0) + 1
  return global.idTracker
}

export const db = {
  load: () => global.db ?? [],
  save: function (
    items: (Omit<TodoItem, 'id'> & Partial<Pick<TodoItem, 'id'>>)[],
  ) {
    global.db = items.map(t => ({
      ...t,
      id: t.id ?? newId(),
    }))
    return global.db
  },
  patch: function (id: number, patch: Partial<Omit<TodoItem, 'id'>>) {
    global.db = global.db.map(t =>
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

if (!global.hasLoaded) {
  db.populateSample()
  global.hasLoaded = true
}
