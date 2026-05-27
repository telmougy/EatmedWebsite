'use client';

import { useState } from 'react';
import { QuoteDialog } from './quote-dialog';

export function QuoteButton({
  prefillProduct,
  className,
  children,
}: {
  prefillProduct?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <QuoteDialog
        open={open}
        onClose={() => setOpen(false)}
        prefillProduct={prefillProduct}
      />
    </>
  );
}
