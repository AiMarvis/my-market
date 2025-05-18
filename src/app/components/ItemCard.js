import Image from 'next/image';

const ItemCard = ({ item }) => {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl mb-4">
      <figure className="relative h-48">
        <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm">{item.name}</h2>
        <p className="text-xs text-gray-500">{item.location} · {item.timeAgo}</p>
        <p className="text-sm font-bold">{item.price.toLocaleString()}원</p>
        <div className="card-actions justify-end text-xs text-gray-500">
          <span>댓글 {item.comments}</span>
          <span>관심 {item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard; 