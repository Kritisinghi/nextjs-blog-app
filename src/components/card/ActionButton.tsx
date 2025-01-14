'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

const ActionButton = ({ children, ...props }) => {
    const router = useRouter();
    const action = async () => {
        const d = await fetch('/api/blogs', { method: props.action, body: JSON.stringify({ id: props?.id }), headers: { 'Content-Type': 'application/json' } });
        if (d.ok) {
            router.push('/blogs/feeds')
        }
    }

    return (
        <button {...props} onClick={action}>{children}</button>

    )
}

export default ActionButton