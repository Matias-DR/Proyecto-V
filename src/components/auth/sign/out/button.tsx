'use client'

import { ConfirmActionAlertDialog } from '@/components/shared/confirm-action-alert-dialog'
import { usePostSignOut } from '@/hooks/auth'

export const SignOutButton = () => {
  const { mutate } = usePostSignOut()

  return (
    <ConfirmActionAlertDialog
      action={() => mutate()}
      text='Cerrar Sesión. Tendrá que ingresar a la aplicación nuevamente a través de la página de inicio de sesión para poder visualizar y administrar publicaciones.'
    >
      <span className='size-full hover:cursor-pointer'>Cerrar Sesión</span>
    </ConfirmActionAlertDialog>
  )
}
