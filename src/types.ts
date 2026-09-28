export type PageId = 'home' | 'page1' | 'page2' | 'page3' | 'page4' | 'page5';

export interface MagazineSpreadInfo {
  index: number;
  title: string;
  subtitle: string;
  leftPageNum?: number;
  rightPageNum?: number;
  category: string;
}

export type PesoType = 'paid' | 'earned' | 'shared' | 'owned';

export interface PesoDetail {
  id: PesoType;
  title: string;
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
  desc: string;
  details: string[];
  metrics: string;
}

export interface ProposalItem {
  id: string;
  city: string;
  street: string;
  description: string;
  votes: number;
  status: 'Đã duyệt khảo sát' | 'Đang chờ duyệt' | 'Đã lên lịch vá' | 'Mới tiếp nhận';
  createdAt: string;
  userVoted?: boolean;
}

export interface BoxPitfall {
  id: number;
  boxNum: string;
  emoji: string;
  title: string;
  color: string;
  bgColor: string;
  subtitle: string;
  detail: string;
  highlight: string;
}
