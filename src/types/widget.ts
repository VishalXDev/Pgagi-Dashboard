export interface WidgetConfig {
  id: string;
  title: string;
}

export interface Widget extends WidgetConfig {
  component: React.ReactNode;
}
