'use client'

import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

/**
 * @description Alert dialog to confirm or cancel the execution of an action
 * @param {React.ReactNode} children - Component that triggers the alert dialog
 * @param {string} text - Text to display in the alert dialog. Describes the action to execute
 * @param {() => void} action - Function to execute when the action is confirmed
 */
export interface Props {
  children: React.ReactNode
  text: string
  action: (close: () => void) => void
}

export const ConfirmActionAlertDialog = ({ children, text, action }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const close = () => {
    if (cancelRef.current) {
      cancelRef.current.click()
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className='border-primary'>
        <AlertDialogHeader>
          <AlertDialogTitle>Desea realizar la siguiente acción?</AlertDialogTitle>
          <AlertDialogDescription className='warning'>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            ref={cancelRef}
            className='w-16'
          >
            No
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => action(close)}
            className='w-16'
          >
            Si
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
