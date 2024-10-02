export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      cron_log: {
        Row: {
          created_at: string;
          totals_sum: number | null;
        };
        Insert: {
          created_at?: string;
          totals_sum?: number | null;
        };
        Update: {
          created_at?: string;
          totals_sum?: number | null;
        };
        Relationships: [];
      };
      items: {
        Row: {
          created_at: string;
          item_id: number;
          name: string | null;
          price: number | null;
          stock: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          item_id?: number;
          name?: string | null;
          price?: number | null;
          stock?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          item_id?: number;
          name?: string | null;
          price?: number | null;
          stock?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          item_id: number;
          order_number: number;
          quantity: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          item_id: number;
          order_number: number;
          quantity?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          item_id?: number;
          order_number?: number;
          quantity?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["item_id"];
          },
          {
            foreignKeyName: "order_items_order_number_fkey";
            columns: ["order_number"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["order_number"];
          },
          {
            foreignKeyName: "order_items_order_number_fkey";
            columns: ["order_number"];
            isOneToOne: false;
            referencedRelation: "orders_data";
            referencedColumns: ["order_number"];
          },
          {
            foreignKeyName: "order_items_order_number_fkey";
            columns: ["order_number"];
            isOneToOne: false;
            referencedRelation: "orders_data2";
            referencedColumns: ["order_number"];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string;
          order_number: number;
          profile_id: string | null;
          recipient_name: string | null;
          shipping_address: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          order_number?: number;
          profile_id?: string | null;
          recipient_name?: string | null;
          shipping_address?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          order_number?: number;
          profile_id?: string | null;
          recipient_name?: string | null;
          shipping_address?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["profile_id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          name: string | null;
          password_hash: string | null;
          profile_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          name?: string | null;
          password_hash?: string | null;
          profile_id?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          name?: string | null;
          password_hash?: string | null;
          profile_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      orders_data: {
        Row: {
          item_list: Json[] | null;
          order_number: number | null;
          recipient_name: string | null;
          shipping_address: string | null;
        };
        Relationships: [];
      };
      orders_data2: {
        Row: {
          item_list: Json | null;
          order_number: number | null;
          recipient_name: string | null;
          shipping_address: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (
      & Database[PublicTableNameOrOptions["schema"]]["Tables"]
      & Database[PublicTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[PublicTableNameOrOptions["schema"]]["Tables"]
    & Database[PublicTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : PublicTableNameOrOptions extends keyof (
    & PublicSchema["Tables"]
    & PublicSchema["Views"]
  ) ? (
      & PublicSchema["Tables"]
      & PublicSchema["Views"]
    )[PublicTableNameOrOptions] extends {
      Row: infer R;
    } ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  } ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  } ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    } ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
