"use client";

import { Search, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    "합정동", "서교동", "망원동", "연남동",
    "역삼동", "삼성동", "논현동", "청담동",
    "서현동", "정자동", "수내동", "분당동",
    "판교동", "삼평동", "백현동", "운중동",
    "야탑동", "이매동", "서현1동", "서현2동"
  ];

  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    console.log(`Selected location: ${newLocation}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-base-100 shadow-md flex justify-between items-center p-4 h-16 z-50">
      <div className="flex items-center">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost normal-case text-lg font-bold">
            {selectedLocation || "동네 선택"}
            <ChevronDown size={20} className="ml-1" />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-30 max-h-60 overflow-y-auto">
            {locations.map((location) => (
              <li key={location}>
                <a 
                  onClick={() => handleLocationChange(location)} 
                  className="whitespace-nowrap overflow-hidden text-ellipsis block"
                  title={location}
                >
                  {location}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => console.log('Search button clicked')}
          className="btn btn-ghost btn-circle"
          aria-label="Search"
        >
          <Search size={24} />
        </button>
        <button
          onClick={() => console.log('Notification button clicked')}
          className="btn btn-ghost btn-circle"
          aria-label="Notifications"
        >
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;

// Tailwind CSS를 사용하는 경우, 하단 그림자(shadow-md)는 기본적으로 제공됩니다.
// z-50 클래스는 다른 요소 위에 헤더가 오도록 합니다. 필요에 따라 조정하세요.
// select 요소의 커스텀 드롭다운 화살표는 인라인 스타일로 SVG를 사용했습니다.
// 좀 더 정교한 스타일링이나 다른 드롭다운 라이브러리 사용을 고려할 수 있습니다. 