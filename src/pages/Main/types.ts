export interface FormattedChat {
  title: string;
  photo_50: string;
  type: 'chat' | 'user' | 'group';
  count: number;
  id: number;
}
