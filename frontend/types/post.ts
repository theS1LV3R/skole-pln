export interface IContentDocument extends Record<string, any> {
  dir: string
  path: string
  extension: '.md' | '.json' | '.yaml' | '.xml' | '.csv' | string
  slug: string
  createdAt: Date
}

export interface Post extends IContentDocument {
  title: string
  date: string
  tags?: Array<string>
  image?: string
}
