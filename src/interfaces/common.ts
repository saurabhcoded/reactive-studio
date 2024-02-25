export interface Page {
  id: string
  name: string
}

export interface FontItem {
  name: string
  url: string
}

export interface FontItemLoad extends FontItem {
  options: { style: string; weight: number }
}
