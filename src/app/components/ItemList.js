'use client';

import { useState } from 'react';
import ItemCard from './ItemCard';
import ProductDetailModal from './ProductDetailModal';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../lib/supabaseClient';

const ItemList = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleItemClick = (productId) => {
    setSelectedProductId(productId);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProductId(null);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md text-center py-10">
        <span className="loading loading-lg loading-spinner text-primary"></span>
        <p className="mt-4">물품 목록을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md text-center py-10">
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>오류가 발생했습니다: {error.message}</span>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full max-w-md text-center py-10">
        <p>등록된 물품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {products.map((item) => (
        <div key={item.id} onClick={() => handleItemClick(item.id)} className="cursor-pointer mb-4">
          <ItemCard item={item} />
        </div>
      ))}

      {isDetailModalOpen && selectedProductId && (
        <ProductDetailModal 
          productId={selectedProductId} 
          closeModal={closeDetailModal} 
        />
      )}
    </div>
  );
};

export default ItemList; 