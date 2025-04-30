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
    <div>
      <div className="flex gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
              refetch();
            }}
            className={`px-4 py-2 rounded-md ${
              cat === selectedCategory
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading news.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.articles?.map((article) => (
          <NewsCard key={article.url} {...article} />
        ))}
      </div>

      {data && data.totalResults && data.totalResults > page * 10 && (
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
