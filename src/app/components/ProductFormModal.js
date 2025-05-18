'use client';

import { useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ProductFormModal({ closeModal }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !price || !description) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError(null);

    let imageUrl = null;
    try {
      if (selectedFile) {
        const fileName = `${Date.now()}_${selectedFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, selectedFile);

        if (uploadError) {
          throw uploadError;
        }
        const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const { data, error: insertError } = await supabase
        .from('products')
        .insert([
          {
            name: productName,
            price: parseFloat(price),
            description: description,
            image_url: imageUrl,
          },
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      console.log('Supabase에 저장된 데이터:', data);
      alert('물건이 성공적으로 등록되었습니다!');
      setProductName('');
      setPrice('');
      setDescription('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      closeModal();
    } catch (err) {
      console.error('오류 발생:', err);
      setError(err.message || '데이터 처리 중 오류가 발생했습니다.');
      alert(`오류 발생: ${err.message || '데이터 처리 중 오류가 발생했습니다.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-lg">
        <h3 className="font-bold text-xl mb-6 text-center">물건 등록하기</h3>
        {error && <div role="alert" className="alert alert-error mb-4"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{error}</span></div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="productName">
              <span className="label-text">상품명</span>
            </label>
            <input
              type="text"
              id="productName"
              placeholder="상품명을 입력하세요"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input input-bordered w-full"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="label" htmlFor="price">
              <span className="label-text">가격</span>
            </label>
            <input
              type="number"
              id="price"
              placeholder="가격을 입력하세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input input-bordered w-full"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="label" htmlFor="description">
              <span className="label-text">상세설명</span>
            </label>
            <textarea
              id="description"
              placeholder="상품 설명을 입력하세요"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              required
              disabled={isLoading}
            ></textarea>
          </div>
          <div>
            <label className="label" htmlFor="image">
              <span className="label-text">상품 이미지</span>
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
              accept="image/*"
              disabled={isLoading}
            />
          </div>
          <div className="modal-action mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-ghost"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner"></span> : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 