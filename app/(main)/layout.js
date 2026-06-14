import React from 'react';

export default function MainLayout({ children }) {
  return (
    <div className='container mx-auto mt-24 mb-20 px-4'>
      {children}
    </div>
  );
}