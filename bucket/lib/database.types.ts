export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      items: {
        Row: {
          id: number
          created_at: string
          text: string
          completed: boolean
          user_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          text: string
          completed?: boolean
          user_id: string
        }
        Update: {
          id?: number
          created_at?: string
          text?: string
          completed?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      share_keys: {
        Row: {
          id: number
          created_at: string
          user_id: string
          share_key: string
        }
        Insert: {
          id?: number
          created_at?: string
          user_id: string
          share_key?: string
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          share_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "share_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_list_by_key: {
        Args: {
          key_to_check: string
        }
        Returns: {
          id: number
          created_at: string
          text: string
          completed: boolean
          user_id: string
          owner_email: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
