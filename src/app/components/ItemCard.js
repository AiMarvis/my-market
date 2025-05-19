import Image from 'next/image';

const ItemCard = ({ item }) => {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl mb-4">
      <figure className="relative h-48">
        {item.image_url && (
          <Image src={item.image_url} alt={item.name || 'Product-images'} layout="fill" objectFit="cover" />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm">{item.name}</h2>
        <p className="text-xs text-gray-500">{item.location} · {item.timeAgo}</p>
        <p className="text-sm font-bold">{item.price.toLocaleString()}원</p>
        <div className="card-actions justify-end text-xs text-gray-500 items-center">
          {typeof item.comments === 'number' && <span>댓글 {item.comments}</span>}
          {typeof item.likes === 'number' && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${item.likes > 0 ? 'text-red-500' : 'text-gray-400'}`} fill={item.likes > 0 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {item.likes}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard; 