'use client';

import { useState } from 'react';
import ProductFormModal from './ProductFormModal'; // 모달 컴포넌트 임포트 예정

export default function FloatingActionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-primary btn-circle fixed bottom-24 right-6 shadow-lg z-50 w-16 h-16 text-lg" // DaisyUI 버튼 스타일 및 위치, 크기 수정
        aria-label="물건 등록하기"
      >
        판매
      </button>
      {isModalOpen && <ProductFormModal closeModal={closeModal} />}
    </>
  );
} 