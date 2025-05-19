'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';

export default function ProductDetailModal({ productId, closeModal }) {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLikes, setCurrentLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (fetchError) {
          throw fetchError;
        }
        setProduct(data);
        setCurrentLikes(data.likes || 0);
      } catch (err) {
        console.error('상품 정보 조회 오류:', err);
        setError(err.message || '상품 정보를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleLike = async () => {
    if (isLiking || !product) return;
    setIsLiking(true);
    try {
      const newLikes = (product.likes || 0) + 1;
      const { data, error: updateError } = await supabase
        .from('products')
        .update({ likes: newLikes })
        .eq('id', productId)
        .select('*')
        .single(); 

      if (updateError) {
        throw updateError;
      }

      if (data) {
        setProduct(prevProduct => ({ ...prevProduct, likes: data.likes }));
        setCurrentLikes(data.likes);
        queryClient.invalidateQueries({ queryKey: ['products'] });
        queryClient.invalidateQueries({ queryKey: ['products', productId] });
      } else {
        console.warn('좋아요 업데이트 후 데이터를 받지 못했습니다.');
        setCurrentLikes(newLikes);
        setProduct(prevProduct => ({ ...prevProduct, likes: newLikes }));
      }

    } catch (err) {
      console.error('좋아요 업데이트 오류:', err);
      alert(`좋아요 업데이트 오류: ${err.message}`);
    } finally {
      setIsLiking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-lg text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-lg">
          <h3 className="font-bold text-xl mb-4 text-center text-error">오류 발생</h3>
          <div role="alert" className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
          <div className="modal-action mt-6">
            <button onClick={closeModal} className="btn btn-ghost">
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-lg text-center">
          <p>상품 정보를 찾을 수 없습니다.</p>
          <div className="modal-action mt-6">
            <button onClick={closeModal} className="btn btn-ghost">
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-lg">
        <h3 className="font-bold text-2xl mb-4">{product.name}</h3>
        {product.image_url && (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        <p className="text-xl font-semibold mb-2">{product.price ? `${product.price.toLocaleString()}원` : '가격 정보 없음'}</p>
        <p className="text-gray-700 mb-1 whitespace-pre-wrap break-words"><strong>카테고리:</strong> {product.category || '미지정'}</p>
        <p className="text-gray-700 mb-1 whitespace-pre-wrap break-words"><strong>등록일:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-4 whitespace-pre-wrap break-words"><strong>상세 설명:</strong><br/>{product.description || '상세 설명이 없습니다.'}</p>
        
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleLike}
            className={`btn btn-ghost btn-sm ${isLiking ? 'loading' : ''}`}
            disabled={isLiking}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${currentLikes > 0 ? 'text-red-500' : 'text-gray-400'}`} fill={currentLikes > 0 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="ml-2 text-lg">{currentLikes}</span>
          </button>
        </div>

        <div className="modal-action mt-6">
          <button 
            type="button"
            onClick={closeModal} 
            className="btn btn-ghost"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
} 