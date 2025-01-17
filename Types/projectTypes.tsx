export type projectListData = {
  id?: number;
  title: string;
  badge: string;
  img: string;
  sites: string;
  desc: string;
  issue: string;
  resolved: string;
  comment: string;
  like: string;
  progress: string;
  customers_img1: string;
  customers_img2: string;
  customers_img3: string;
};

export interface ProjectListPropsType {
  allData: projectListData[];
}

export interface commonProjectInterFace {
  item: projectListData;
}

export interface projectListNavPropsType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export interface projectListTabContentType {
  activeTab: string;

}