'use client';

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  productId: string;
  className?: string;
}

export default function DeleteButton({ 
  productId, 
  className = ""  
}: { 
  productId: string; 
  className?: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          // Refresh the page to show updated product list
          router.refresh();
        } else {
          const error = await res.json();
          alert(`Failed to delete product: ${error.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };
  return (
    <button onClick={handleDelete} className={className}>
      <Trash2 className="w-4 h-4" />
      <span>DELETE</span>
    </button>
  );
}