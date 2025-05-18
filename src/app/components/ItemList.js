import ItemCard from './ItemCard';

const mockItems = [
  {
    id: 1,
    name: '아이폰15 128GB 팝니다',
    location: '행당동',
    timeAgo: '47분 전',
    price: 667917,
    comments: 42,
    likes: 39,
    imageUrl: 'https://via.placeholder.com/300x200?text=iPhone+15',
  },
  {
    id: 2,
    name: '아이폰14 Pro Max 256GB 팝니다',
    location: '서교동',
    timeAgo: '48분 전',
    price: 869260,
    comments: 48,
    likes: 47,
    imageUrl: 'https://via.placeholder.com/300x200?text=iPhone+14+Pro+Max',
  },
  {
    id: 3,
    name: '아이폰15 Pro 512GB 팝니다',
    location: '행당동',
    timeAgo: '45분 전',
    price: 1096045,
    comments: 40,
    likes: 27,
    imageUrl: 'https://via.placeholder.com/300x200?text=iPhone+15+Pro',
  },
  // 필요에 따라 더 많은 아이템 추가
];

const ItemList = () => {
  return (
    <div className="w-full max-w-md">
      {mockItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList; 