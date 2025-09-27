'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProductForm({ 
  product 
}: { 
  product: any 
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product.name || '',
    description: product.description || '',
    price: product.price?.toString() || '',
  });

  const [currentImage, setCurrentImage] = useState(product.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = currentImage; // Keep current image by default

      // Upload new image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json();
          imageUrl = url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      // Update product with new or existing image URL
      const productResponse = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
        }),
      });

      if (productResponse.ok) {
        router.push('/admin/products');
      } else {
        const error = await productResponse.json();
        alert(`Failed to update product: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">
          PRODUCT NAME
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">
          DESCRIPTION
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">
          PRICE ($)
        </label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
      </div>

      {/* Product Image Section */}
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">
          PRODUCT IMAGE
        </label>
        
        {/* Current Image Display */}
        {currentImage && !imagePreview && (
          <div className="border-3 border-black p-4 mb-4">
            <p className="text-sm font-bold uppercase mb-2">CURRENT IMAGE:</p>
            <img
              src={currentImage}
              alt="Current product"
              className="w-full max-w-xs h-48 object-cover border-2 border-black"
            />
          </div>
        )}

        {/* New Image Upload */}
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-black file:bg-black file:text-white hover:file:bg-gray-800"
          />
          
          <p className="text-xs font-mono text-gray-600 uppercase">
            Leave empty to keep current image
          </p>
          
          {/* New Image Preview */}
          {imagePreview && (
            <div className="border-3 border-black p-4">
              <p className="text-sm font-bold uppercase mb-2">NEW IMAGE PREVIEW:</p>
              <img
                src={imagePreview}
                alt="New preview"
                className="w-full max-w-xs h-48 object-cover border-2 border-black"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white p-4 font-black uppercase border-3 border-black hover:bg-white hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'UPDATING...' : 'UPDATE PRODUCT'}
        </button>
        
        <Link
          href="/admin/products"
          className="flex-1 bg-gray-500 text-white p-4 font-black uppercase border-3 border-black hover:bg-white hover:text-gray-500 transition-colors flex items-center justify-center"
        >
          CANCEL
        </Link>
      </div>
    </form>
  );
}