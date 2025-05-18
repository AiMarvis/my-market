"use client";

import Link from 'next/link';
import { Home, MessageCircle, User } from 'lucide-react';

const BottomNavigationBar = () => {
  // 실제 페이지 이동 로직은 프로젝트의 라우팅 설정에 맞게 수정해야 합니다.
  // 예: Next.js App Router를 사용하는 경우 import { useRouter } from 'next/navigation'; const router = useRouter(); router.push(path);
  // 예: Next.js Pages Router를 사용하는 경우 import { useRouter } from 'next/router'; const router = useRouter(); router.push(path);
  const handleNavigate = (path) => {
    console.log(`Navigating to ${path}`);
    // 여기에 실제 라우팅 로직을 구현하세요.
    // 예시: router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t flex justify-around items-center h-16 z-50">
      <Link href="/" passHref>
        <button
          onClick={() => handleNavigate('/')}
          className="flex flex-col items-center justify-center text-gray-700 hover:text-blue-500 p-2 focus:outline-none"
          aria-label="Home"
        >
          <Home size={24} />
          <span className="text-xs mt-1">홈</span>
        </button>
      </Link>
      <Link href="/chat" passHref>
        <button
          onClick={() => handleNavigate('/chat')}
          className="flex flex-col items-center justify-center text-gray-700 hover:text-blue-500 p-2 focus:outline-none"
          aria-label="Chat"
        >
          <MessageCircle size={24} />
          <span className="text-xs mt-1">채팅</span>
        </button>
      </Link>
      <Link href="/profile" passHref>
        <button
          onClick={() => handleNavigate('/profile')}
          className="flex flex-col items-center justify-center text-gray-700 hover:text-blue-500 p-2 focus:outline-none"
          aria-label="Profile"
        >
          <User size={24} />
          <span className="text-xs mt-1">프로필</span>
        </button>
      </Link>
    </nav>
  );
};

export default BottomNavigationBar;

// Tailwind CSS를 사용하는 경우, 상단 그림자(shadow-t)를 위해 globals.css 또는 메인 CSS 파일에 다음을 추가할 수 있습니다:
/*
@layer utilities {
  .shadow-t {
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  }
}

// 또는 기존 CSS 클래스로 직접 추가:
// .shadow-t {
//   box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
// }
*/

// z-50 클래스는 다른 요소 위에 네비게이션 바가 오도록 합니다. 필요에 따라 조정하세요. 