'use client';

import React from 'react'
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';

const IssuesPage = () => {
  return (
    <div>
      <Link href='/issues/new'>
        <Button>New Issues</Button>
      </Link>
    </div>
  )
}

export default IssuesPage