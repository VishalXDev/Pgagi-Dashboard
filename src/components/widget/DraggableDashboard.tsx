import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Widget } from '../../types/widget';

// Static widget definitions
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
      className="space-y-4"
    >
      {order.map((id) => {
        const widget = widgetMap[id];
        return (
          <Reorder.Item
            key={widget.id}
            value={widget.id}
            as="div"
            className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-move"
          >
            <motion.div layout>
              <h3 className="font-semibold mb-2">{widget.title}</h3>
              {widget.component}
            </motion.div>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
