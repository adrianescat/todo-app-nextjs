import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: JSX.Element
  rootPortalId?: string
  onAfterClose?: () => void
}

const Portal = ({ children, onAfterClose, rootPortalId }: PortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => {
      onAfterClose && onAfterClose()
      setMounted(false)
    }
  }, [onAfterClose])

  const rootPortalEl = document.querySelector(rootPortalId || '#root-portal')

  return mounted && rootPortalEl ? createPortal(children, rootPortalEl) : null
}

export default Portal
