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
      className="block border rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white dark:bg-gray-800"
    >
      {urlToImage && (
        <img
          src={urlToImage}
          alt={title || 'News image'}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
        <span className="text-xs font-medium text-secondary">{source.name}</span>
      </div>
    </a>
  );
}
