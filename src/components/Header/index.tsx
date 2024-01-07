import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from "../NewTransactionModal";
import logoImg from '../../logo.svg';
import { useState } from "react";


export function Header() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState<boolean>(false)

  function handleTransactionModalOpenChange(value: boolean) {
    setIsTransactionModalOpen(value)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root
          open={isTransactionModalOpen}
          onOpenChange={handleTransactionModalOpenChange}
        >

          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal handleTransactionModalOpenChange={setIsTransactionModalOpen} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}