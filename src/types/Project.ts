// types/Project.ts

export type ProjectStatus =
  | 'In Bearbeitung' // در حال اجرا
  | 'Abgeschlossen' // اتمام شده
  | 'Archiviert' // بایگانی شده
  | 'Geplant' // برنامه‌ریزی شده
  | 'Angehalten' // متوقف شده
  | 'Storniert' // لغو شده

export interface Project {
  id: number
  title: string
  description: string
  image: string
  status: ProjectStatus
  ideator: string
}
