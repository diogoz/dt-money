import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { useForm, Controller } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type newTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>


export function NewTransactionModal() {
  const { createNewTransaction } = useContext(TransactionsContext)
  const { handleSubmit, register, formState: { isSubmitting }, control, reset } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    await createNewTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input type="text" placeholder="Descrição" required {...register('description')} />
          <input type="number" placeholder="Preço" required {...register('price', { valueAsNumber: true })} />
          <input type="text" placeholder="Categoria" required {...register('category')} />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType onValueChange={field.onChange}
                  value={field.value}>
                  <TransactionTypeButton variant="income" value="income" defaultChecked={true}>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />


          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}