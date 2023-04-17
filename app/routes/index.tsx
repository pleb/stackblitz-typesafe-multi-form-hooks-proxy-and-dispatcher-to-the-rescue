import { DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utilities/database'
import { z } from 'zod'
import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { useCallback, useState } from 'react'
import { randomDelayBetween } from '~/utilities/delay'
import { GlassButton } from '~/components/molecules/GlassButton'
import { Title } from '~/components/atoms/Title'
import { GlassPanel } from '~/components/molecules/GlassPanel'
import { Panel } from '~/components/atoms/Panel'
import { useLoadingContext } from '~/contexts/loadingContext'
import Loading from 'icon/LoadingIndicator'
import { zfd } from 'zod-form-data'
import {
  ValidatedCheckboxInput,
  ValidatedHiddenInput,
  ValidatedTextInput,
} from '~/components/atoms/ValidatedInput'
import { cn } from '~/utilities/cn'
import { IconButton } from '~/components/molecules/IconButton'
import Delete from '../../icon/Delete'
import Edit from '../../icon/Edit'
import { Button } from '~/components/atoms/Button'

const validator = withZod(
  z.discriminatedUnion('_action', [
    z.object({
      _action: z.literal('reset'),
    }),
    z.object({
      _action: z.literal('upsert'),
      description: z.string().min(2).max(50),
      id: zfd.numeric(z.number().optional()),
    }),
    z.object({
      _action: z.literal('delete'),
      id: zfd.numeric(),
    }),
    z.object({
      _action: z.literal('complete'),
      id: zfd.numeric(),
    }),
  ]),
)

export const loader = async () => {
  return db.load().filter(i => !i.completed && !i.deleted)
}

export const action = async (data: DataFunctionArgs) => {
  // Simulate network latency
  await randomDelayBetween(250, 1000)

  const formData = await data.request.formData()
  const result = await validator.validate(formData)

  if (result.error) return validationError(result.error)

  switch (result.data._action) {
    case 'reset': {
      await db.populateSample()
      break
    }
    case 'delete': {
      db.patch(Number(result.data.id), { deleted: true })
      break
    }
    case 'complete': {
      db.patch(Number(result.data.id), { completed: true })
      break
    }
    case 'upsert': {
      const isEdit = !isNaN(Number(result.data.id))
      if (isEdit) {
        db.patch(Number(result.data.id), {
          description: result.data.description,
        })
      } else {
        db.append({ description: result.data.description })
      }
      break
    }
  }
  return null
}

type Todo = Awaited<ReturnType<typeof loader>>[number]

export default function Index() {
  const todos = useLoaderData<typeof loader>()
  const [edit, setEdit] = useState<Todo>()
  const clearEdit = useCallback(() => setEdit(undefined), [setEdit])
  const loadingContext = useLoadingContext()

  return (
    <div
      className={
        'sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-[auto]'
      }
    >
      <ValidatedForm validator={validator} method='post' className='grid mb-2'>
        <GlassButton
          type='submit'
          name={'_action'}
          value={'reset'}
          className='place-self-end py-1 px-4'
          onClick={clearEdit}
          disabled={loadingContext.isLoading}
        >
          Reset
        </GlassButton>
      </ValidatedForm>
      <GlassPanel className='relative'>
        <Title aria-label='Simple to-do'>Simple Todo</Title>
        <Loading
          className='absolute right-2 top-5 animate-spin h-5 w-5 mr-3'
          hidden={!loadingContext.isLoading}
        />
        <Panel className='mt-2 px-4' aria-live='polite'>
          {todos.map((td, i) => (
            <ValidatedForm key={td.id} validator={validator} method='post'>
              <ValidatedHiddenInput name='id' value={td.id.toString()} />
              <Panel
                border='b'
                className={cn('p-3', 'hover:bg-glass/20', 'grid grid-flow-col')}
              >
                <div
                  aria-label={`To-do entry ${td.description}`}
                  aria-flowto={`delete-${td.id}`}
                >
                  {td.description}
                </div>
                {!Boolean(edit) && (
                  <div className='w-30 justify-self-end grid gap-2 grid-flow-col content-center'>
                    <IconButton
                      id={`delete-${td.id}`}
                      color='Red'
                      type='submit'
                      name='_action'
                      value='delete'
                      disabled={loadingContext.isLoading}
                      aria-label='Delete to-do entry'
                    >
                      <Delete aria-hidden={true} />
                    </IconButton>
                    <IconButton
                      color='Green'
                      onClick={() => setEdit(td)}
                      disabled={Boolean(edit)}
                      aria-label='Edit to-do entry'
                    >
                      <Edit aria-hidden={true} />
                    </IconButton>
                    <ValidatedCheckboxInput
                      className='ml-2'
                      name='_action'
                      label='Complete to-do entry'
                      value='complete'
                      submitOnChange={true}
                      disabled={loadingContext.isLoading}
                    />
                  </div>
                )}
              </Panel>
            </ValidatedForm>
          ))}
        </Panel>

        <ValidatedForm
          validator={validator}
          onSubmit={() => {
            setTimeout(clearEdit)
          }}
          resetAfterSubmit={true}
          method='post'
        >
          <ValidatedHiddenInput name='id' value={edit?.id.toString()} />
          <div className='mt-2 py-3 px-4 grid grid-flow-col auto-cols-[1fr_200px] gap-2 items-start'>
            <ValidatedTextInput
              className='p-2 border'
              label='To-do description'
              placeholder='Todo description'
              name='description'
              value={edit?.description}
              disabled={loadingContext.isLoading}
            />
            <Button
              className='text-black'
              type='submit'
              name='_action'
              value='upsert'
              disabled={loadingContext.isLoading}
            >
              {edit ? 'Edit' : 'Add'}
            </Button>
          </div>
        </ValidatedForm>
      </GlassPanel>
    </div>
  )
}
