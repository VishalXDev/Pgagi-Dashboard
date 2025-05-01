import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Widget } from '../../types/widget';

const widgetMap: Record<string, Widget> = {
  weather: {
    id: 'weather',
    title: 'Weather',
    component: <div className="h-40">Weather Widget</div>,
  },
  news: {
    id: 'news',
    title: 'News',
    component: <div className="h-40">News Widget</div>,
  },
  stocks: {
    id: 'stocks',
    title: 'Stocks',
    component: <div className="h-40">Stock Widget</div>,
  },
};

const initialOrder = ['weather', 'news', 'stocks'];

export default function DraggableDashboard() {
  const [order, setOrder] = useState<string[]>(initialOrder);

  return (
    <Reorder.Group
      axis="y"
      values={order}
      onReorder={setOrder}
      className="space-y-6"
    >
      {order.map((id) => {
        const widget = widgetMap[id];
        return (
          <Reorder.Item
            key={widget.id}
            value={widget.id}
            as="div"
            className="bg-black/70 border border-purple-700 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-purple-500 text-white cursor-move transition-all"
          >
            <motion.div layout>
              <h3 className="text-xl font-bold mb-2 text-purple-400 neon-text">
                {widget.title}
              </h3>
              {widget.component}
            </motion.div>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
