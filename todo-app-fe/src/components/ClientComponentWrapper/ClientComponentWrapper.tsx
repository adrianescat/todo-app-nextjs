import React, { useEffect, useState } from 'react'

export interface Props {
  children: JSX.Element
}

export default function ClientComponentWrapper({ children, ...delegated }: Props) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}
