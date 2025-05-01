interface NewsCardProps {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
}

export default function NewsCard({
  title,
  description,
  url,
  urlToImage,
  source,
}: NewsCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-black/70 border border-purple-700 rounded-xl overflow-hidden shadow-md hover:shadow-purple-500 transition backdrop-blur"
    >
      {urlToImage && (
        <img
          src={urlToImage}
          alt={title || 'News image'}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold text-purple-300 mb-1 neon-text">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
        <span className="text-xs font-medium text-purple-500">{source.name}</span>
      </div>
    </a>
  );
}
