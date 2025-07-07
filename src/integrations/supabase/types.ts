export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      dynasties: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          founding_year: string | null
          id: string
          location: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          founding_year?: string | null
          id?: string
          location?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          founding_year?: string | null
          id?: string
          location?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      dynasty_creation_tokens: {
        Row: {
          amount: number | null
          created_at: string | null
          email: string | null
          expires_at: string | null
          id: string
          is_temp_user: boolean | null
          is_used: boolean | null
          log: Json | null
          phone: string | null
          status: string | null
          stripe_session_id: string | null
          token: string
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          email?: string | null
          expires_at?: string | null
          id?: string
          is_temp_user?: boolean | null
          is_used?: boolean | null
          log?: Json | null
          phone?: string | null
          status?: string | null
          stripe_session_id?: string | null
          token: string
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          email?: string | null
          expires_at?: string | null
          id?: string
          is_temp_user?: boolean | null
          is_used?: boolean | null
          log?: Json | null
          phone?: string | null
          status?: string | null
          stripe_session_id?: string | null
          token?: string
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      family_members: {
        Row: {
          created_at: string | null
          dynasty_id: string | null
          id: string
          profile_id: string | null
          role: string | null
          tree_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dynasty_id?: string | null
          id?: string
          profile_id?: string | null
          role?: string | null
          tree_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dynasty_id?: string | null
          id?: string
          profile_id?: string | null
          role?: string | null
          tree_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_members_tree_id_fkey"
            columns: ["tree_id"]
            isOneToOne: false
            referencedRelation: "family_trees"
            referencedColumns: ["id"]
          },
        ]
      }
      family_trees: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          dynasty_id: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          dynasty_id?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          dynasty_id?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invites: {
        Row: {
          affiliation: string | null
          created_at: string | null
          dynasty_id: string
          email: string | null
          expires_at: string
          id: string
          invited_by: string | null
          token: string
          used: boolean | null
          user_role: string
        }
        Insert: {
          affiliation?: string | null
          created_at?: string | null
          dynasty_id: string
          email?: string | null
          expires_at?: string
          id?: string
          invited_by?: string | null
          token: string
          used?: boolean | null
          user_role: string
        }
        Update: {
          affiliation?: string | null
          created_at?: string | null
          dynasty_id?: string
          email?: string | null
          expires_at?: string
          id?: string
          invited_by?: string | null
          token?: string
          used?: boolean | null
          user_role?: string
        }
        Relationships: []
      }
      medias: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          duration: number | null
          id: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_url: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_url: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_url?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_admin_message: boolean | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_admin_message?: boolean | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_admin_message?: boolean | null
          sender_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          dynasty_id: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          dynasty_id?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          dynasty_id?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          affiliated_member: Json | null
          affiliation: string | null
          avatar_url: string | null
          birth_date: string | null
          birth_place: string | null
          civilite: string | null
          civility: string | null
          created_at: string | null
          current_location: string | null
          dynasty_id: string | null
          email: string | null
          father_id: string | null
          father_name: string | null
          first_name: string | null
          id: string
          is_admin: boolean | null
          is_parent: boolean | null
          is_patriarch: boolean | null
          last_name: string | null
          mother_id: string | null
          mother_name: string | null
          parent_id: string | null
          phone: string | null
          photo_url: string | null
          profession: string | null
          relationship_type: string | null
          role: string | null
          role_radio: string | null
          situation: string | null
          updated_at: string | null
          user_id: string
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          affiliated_member?: Json | null
          affiliation?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          birth_place?: string | null
          civilite?: string | null
          civility?: string | null
          created_at?: string | null
          current_location?: string | null
          dynasty_id?: string | null
          email?: string | null
          father_id?: string | null
          father_name?: string | null
          first_name?: string | null
          id: string
          is_admin?: boolean | null
          is_parent?: boolean | null
          is_patriarch?: boolean | null
          last_name?: string | null
          mother_id?: string | null
          mother_name?: string | null
          parent_id?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          relationship_type?: string | null
          role?: string | null
          role_radio?: string | null
          situation?: string | null
          updated_at?: string | null
          user_id: string
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          affiliated_member?: Json | null
          affiliation?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          birth_place?: string | null
          civilite?: string | null
          civility?: string | null
          created_at?: string | null
          current_location?: string | null
          dynasty_id?: string | null
          email?: string | null
          father_id?: string | null
          father_name?: string | null
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          is_parent?: boolean | null
          is_patriarch?: boolean | null
          last_name?: string | null
          mother_id?: string | null
          mother_name?: string | null
          parent_id?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          relationship_type?: string | null
          role?: string | null
          role_radio?: string | null
          situation?: string | null
          updated_at?: string | null
          user_id?: string
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      relationships: {
        Row: {
          created_at: string | null
          dynasty_id: string | null
          id: string
          person1_id: string | null
          person2_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dynasty_id?: string | null
          id?: string
          person1_id?: string | null
          person2_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dynasty_id?: string | null
          id?: string
          person1_id?: string | null
          person2_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          family_tree_title: string | null
          id: number
          members_page_title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          family_tree_title?: string | null
          id?: number
          members_page_title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          family_tree_title?: string | null
          id?: number
          members_page_title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_tokens: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_invitation: {
        Args: {
          p_dynasty_id: string
          p_user_role: string
          p_expires_at?: string
        }
        Returns: {
          id: string
          token: string
        }[]
      }
      get_invitation_data: {
        Args: { invite_token: string }
        Returns: {
          id: string
          token: string
          dynasty_id: string
          dynasty_name: string
          user_role: string
          expires_at: string
          used: boolean
        }[]
      }
      mark_invitation_used: {
        Args: { invite_id: string }
        Returns: boolean
      }
    }
    Enums: {
      civilite: "M." | "Mme"
      family_title:
        | "M."
        | "Mme"
        | "Patriarche"
        | "Matriarche"
        | "Père"
        | "Mère"
        | "Fils"
        | "Fille"
        | "Grand-père"
        | "Grand-mère"
        | "Petit-fils"
        | "Petite-fille"
        | "Oncle"
        | "Tante"
        | "Neveu"
        | "Nièce"
        | "Cousin"
        | "Cousine"
        | "Époux"
        | "Épouse"
        | "Beau-père"
        | "Belle-mère"
        | "Beau-fils"
        | "Belle-fille"
        | "Frère"
        | "Sœur"
      relationship_type:
        | "patriarche"
        | "matriarche"
        | "fils"
        | "fille"
        | "père"
        | "mère"
        | "cousin"
        | "cousine"
        | "tante"
        | "oncle"
        | "neveu"
        | "nièce"
        | "petit-fils"
        | "petite-fille"
        | "grand-père"
        | "grand-mère"
        | "époux"
        | "épouse"
        | "beau-père"
        | "belle-mère"
        | "beau-fils"
        | "belle-fille"
        | "frère"
        | "sœur"
      user_role:
        | "Administrateur"
        | "Patriarche"
        | "Matriarche"
        | "Membre"
        | "Visiteur"
        | "Invité"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      civilite: ["M.", "Mme"],
      family_title: [
        "M.",
        "Mme",
        "Patriarche",
        "Matriarche",
        "Père",
        "Mère",
        "Fils",
        "Fille",
        "Grand-père",
        "Grand-mère",
        "Petit-fils",
        "Petite-fille",
        "Oncle",
        "Tante",
        "Neveu",
        "Nièce",
        "Cousin",
        "Cousine",
        "Époux",
        "Épouse",
        "Beau-père",
        "Belle-mère",
        "Beau-fils",
        "Belle-fille",
        "Frère",
        "Sœur",
      ],
      relationship_type: [
        "patriarche",
        "matriarche",
        "fils",
        "fille",
        "père",
        "mère",
        "cousin",
        "cousine",
        "tante",
        "oncle",
        "neveu",
        "nièce",
        "petit-fils",
        "petite-fille",
        "grand-père",
        "grand-mère",
        "époux",
        "épouse",
        "beau-père",
        "belle-mère",
        "beau-fils",
        "belle-fille",
        "frère",
        "sœur",
      ],
      user_role: [
        "Administrateur",
        "Patriarche",
        "Matriarche",
        "Membre",
        "Visiteur",
        "Invité",
      ],
    },
  },
} as const
