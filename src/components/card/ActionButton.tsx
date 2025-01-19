'use client';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

type ActionButtonProps = {
    children: ReactNode
    method: string | '',
    id: string,
    className: string
}
const ActionButton = ({ children, ...props }:ActionButtonProps) => {
    const router = useRouter();
    const action = async () => {
        const data = await fetch('/api/blogs', { method: props.method, body: JSON.stringify({ id: props?.id }), headers: { 'Content-Type': 'application/json' } });
        if (data.ok) {
            router.push('/blogs/feeds')
        }
    }

    return (
        <button {...props} onClick={action}>{children}</button>

    )
}

export default ActionButton