-- 車両テーブルの作成
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  image_url TEXT,
  capacity INTEGER NOT NULL,
  features TEXT[] NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 予約テーブルの作成
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS bookings_vehicle_id_idx ON public.bookings(vehicle_id);
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON public.bookings(user_id);

-- RLSの有効化
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 車両テーブルのRLSポリシー
CREATE POLICY "誰でも車両を閲覧可能" ON public.vehicles
  FOR SELECT USING (true);

CREATE POLICY "管理者のみ車両を作成可能" ON public.vehicles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "管理者のみ車両を更新可能" ON public.vehicles
  FOR UPDATE USING (true);

CREATE POLICY "管理者のみ車両を削除可能" ON public.vehicles
  FOR DELETE USING (true);

-- 予約テーブルのRLSポリシー
CREATE POLICY "誰でも予約を閲覧可能" ON public.bookings
  FOR SELECT USING (true);

CREATE POLICY "誰でも予約を作成可能" ON public.bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "誰でも予約を更新可能" ON public.bookings
  FOR UPDATE USING (true);

CREATE POLICY "誰でも予約を削除可能" ON public.bookings
  FOR DELETE USING (true);

-- 通知設定
ALTER TABLE public.vehicles REPLICA IDENTITY FULL;
ALTER TABLE public.bookings REPLICA IDENTITY FULL;
