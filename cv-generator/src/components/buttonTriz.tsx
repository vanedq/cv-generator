interface iAddButtonProps {
  action?: () => void
  customText?: string
  isNavButton?: boolean
}
export default function AddButton({ action, customText, isNavButton }: iAddButtonProps) {
  return (
    <button
      onClick={action}
      className={`button-triz px-3 py-2 rounded text-sm  ${isNavButton ? "shadow-border-sm" : ""}`}
    >
      {/* se nao for declarado custom text ele bota o de adicionar */}
      {customText || "+ Adicionar"}
    </button>
  )
}


interface iSmallAddButtonProps {
  action?: () => void
  customText?: string
}


export function SmallAddButton({ action, customText }: iSmallAddButtonProps) {
  return (
    <button
      onClick={action}
      className="bg-emerald-800 hover:bg-emerald-900 text-emerald-300 hover:text-emerald-400 px-2 py-1 rounded text-xs"
    >
      {customText || "+ Item"}
    </button>
  )
}

interface iDeleteButtonProps {
  action?: () => void
  customText?: string
  disabled?: boolean
}

export function DeleteButton({ action, customText, disabled }: iDeleteButtonProps) {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className="shadow-border-sm bg-red-800 hover:bg-red-900 text-red-300 hover:text-red-400 px-3 py-2 rounded text-sm"
    >
      {customText || "Excluir"}
    </button>
  )
}

interface iSmallDeleteButtonProps {
  action?: () => void
  customText?: string
  disabled?: boolean
}

export function SmallDeleteButton({ action, customText, disabled }: iSmallDeleteButtonProps) {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className=" bg-red-800 hover:bg-red-900 text-red-300 hover:text-red-400 px-2 py-1 rounded text-xs"
    >
      {customText || "Remover"}
    </button>
  )
}

interface iSecondaryButton {
  action?: () => void
  customText?: string
}

export function SecondaryButton({ action, customText }: iSecondaryButton) {
  return (
    <button
      onClick={action}
      className="shadow-border-sm bg-gray-800 hover:bg-gray-900 text-gray-300 hover:gray-400 px-3 py-2 rounded text-sm"
    >
      {customText || "Duplicar"}
    </button>
  )
}