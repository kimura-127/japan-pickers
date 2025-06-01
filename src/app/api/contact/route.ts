import { sendMail } from "@/lib/email";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // 入力バリデーション
    if (!name || !email || !message) {
      return NextResponse.json({ error: "必須項目が入力されていません" }, { status: 400 });
    }

    // Supabaseクライアントを作成
    const supabase = await createServerSupabaseClient();
    
    // データベースに保存
    const { data: contact, error } = await supabase
      .from('contact')
      .insert({
        name,
        email,
        phone: phone || "", // 電話番号が空の場合に対応
        message,
        status: 'PENDING', // デフォルトステータス
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log("お問い合わせが正常に保存されました:", contact);
    // 管理者へのメール送信
    await sendMail({
      to: "japan.pickers@gmail.com",
      subject: `新規お問い合わせ: ${name}様`,
      text: `お問い合わせ内容:
名前: ${name}
メール: ${email}
電話: ${phone || "-"}
メッセージ:
${message}
`,
    });
    console.log("メール送信成功");

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error("お問い合わせの保存中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "お問い合わせの保存中にエラーが発生しました" },
      { status: 500 },
    );
  }
}
