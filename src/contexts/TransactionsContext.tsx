import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface ITransaction {
  id: number,
  description: string,
  type: 'income' | 'outcome',
  category: string,
  price: number,
  createdAt: string
}

interface ICreateNewTransaction {
  description: string,
  type: 'income' | 'outcome',
  category: string,
  price: number
}
interface TransactionContextType {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createNewTransaction: (data: ICreateNewTransaction) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: { children: React.ReactNode }) {

  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })
    setTransactions(response.data)
  }

  async function createNewTransaction(data: ICreateNewTransaction) {
    const { category, description, price, type } = data

    const response = await api.post('transactions', {
      description, category, price, type, createdAt: new Date()
    });
    setTransactions(state => [response.data, ...state])
  }
  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createNewTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}