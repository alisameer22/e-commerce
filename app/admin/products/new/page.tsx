'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = '';

      // Upload image if selected
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

      // Create product with uploaded image URL
      const productResponse = await fetch('/api/products', {
        method: 'POST',
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
        throw new Error('Product creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create product. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-200 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-black uppercase">ADD PRODUCT</h1>
            <Link 
              href="/admin/products" 
              className="bg-gray-500 text-white px-4 py-2 font-black uppercase border-3 border-black hover:bg-white hover:text-gray-500 transition-colors"
            >
              BACK
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
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

            {/* Description */}
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

            {/* Price */}
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

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                PRODUCT IMAGE
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-black file:bg-black file:text-white hover:file:bg-gray-800"
                  required
                />
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="border-3 border-black p-4">
                    <p className="text-sm font-bold uppercase mb-2">PREVIEW:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-xs h-48 object-cover border-2 border-black"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-red-500 text-white p-4 font-black uppercase border-3 border-black hover:bg-white hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'UPLOADING...' : 'CREATE PRODUCT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}