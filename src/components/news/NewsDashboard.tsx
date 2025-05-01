import { useState } from 'react';
import { useGetTopHeadlinesQuery } from '../../services/newsApi';
import NewsCard from './NewsCard';
import { NewsArticle } from '../../types/news';

const categories = ['technology', 'business', 'sports', 'health', 'entertainment'];

export default function NewsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('technology');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetTopHeadlinesQuery({
    category: selectedCategory,
    page,
  }) as {
    data: {
      articles: NewsArticle[];
      totalResults: number;
    } | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
  };

  return (
    <div className="p-6 bg-black/60 backdrop-blur rounded-xl shadow-lg text-white">
      <div className="flex gap-4 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
              refetch();
            }}
            className={`px-4 py-2 rounded-full border transition font-medium text-sm tracking-wide ${
              cat === selectedCategory
                ? 'bg-purple-700 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-purple-900 hover:text-purple-300'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-gray-400">Loading...</p>}
      {isError && <p className="text-red-400">Error loading news.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.articles?.map((article) => (
          <NewsCard key={article.url} {...article} />
        ))}
      </div>

      {data && data.totalResults && data.totalResults > page * 10 && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg transition"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
