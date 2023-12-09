export type Repo = {
  id: string;
  name: string;
  url: string;
  description?: string;
  stargazerCount: number;
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } }>;
  };
  languages: {
    nodes: Array<{ name: string }>;
  };
  rating?: number;
};
