import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// 予約データのバリデーションスキーマ
const bookingSchema = z.object({
  vehicleId: z.string(),
  userId: z.string(),
  startDate: z.string().transform((date) => new Date(date)),
  endDate: z.string().transform((date) => new Date(date)),
  departureTime: z.string(),
  arrivalTime: z.string(),
  userName: z.string().min(2),
  userEmail: z.string().email(),
  userPhone: z.string().regex(/^[0-9-]+$/),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("リクエストボディ:", body);

    // リクエストボディのバリデーション
    const validatedData = bookingSchema.parse(body);
    console.log("バリデーション成功:", validatedData);

    // データベースに予約情報を保存
    console.log("Prisma操作開始", validatedData);
    try {
      const booking = await prisma.booking.create({
        data: {
          userId: validatedData.userId,
          startDate: validatedData.startDate,
          endDate: validatedData.endDate,
          departureTime: validatedData.departureTime,
          arrivalTime: validatedData.arrivalTime,
          userName: validatedData.userName,
          userEmail: validatedData.userEmail,
          userPhone: validatedData.userPhone,
          status: "pending", // 初期ステータス
        },
      });

      console.log("予約作成成功:", booking);

      return NextResponse.json(
        {
          success: true,
          message: "予約が正常に作成されました",
          data: booking,
        },
        { status: 201 },
      );
    } catch (dbError: unknown) {
      console.error("データベース操作エラー:", dbError);
      console.error("エラーメッセージ:", (dbError as Error).message);
      console.error("エラー名:", (dbError as Error).name);

      throw dbError; // 元のエラーを再スロー
    }
  } catch (error: unknown) {
    console.error("予約作成中にエラーが発生しました:", error);
    console.error("エラータイプ:", (error as Error).constructor?.name);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "入力データが無効です",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    // エラーメッセージを詳細に表示
    return NextResponse.json(
      {
        success: false,
        message: "予約の作成中にエラーが発生しました",
        error: {
          type: (error as Error).constructor?.name || "Unknown",
          message: (error as Error).message,
          name: (error as Error).name,
        },
      },
      { status: 500 },
    );
  }
}

// 予約一覧を取得するGETエンドポイント（管理者用）
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("予約データの取得中にエラーが発生しました:", error);
    return NextResponse.json(
      {
        success: false,
        message: "予約データの取得中にエラーが発生しました",
      },
      { status: 500 },
    );
  }
}
