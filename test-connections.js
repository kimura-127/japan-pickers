// PostgreSQL接続テストスクリプト
const { PrismaClient } = require("@prisma/client");

// 接続設定1：シェアードコネクションプーラー
async function testConnection1() {
  console.log("テスト1: シェアードコネクションプーラー接続");
  const url =
    "postgresql://postgres.spdbplpiuonxajhcsmjy:MjG5cDOWpp6oh3Qz@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres";

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      },
    });

    await prisma.$connect();
    console.log("接続成功！");
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error("接続エラー:", error.message);
    return false;
  }
}

// 接続設定2：シェアードプーラー直接接続
async function testConnection2() {
  console.log("テスト2: シェアードプーラー直接接続");
  const url =
    "postgresql://postgres.spdbplpiuonxajhcsmjy:MjG5cDOWpp6oh3Qz@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres";

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      },
    });

    await prisma.$connect();
    console.log("接続成功！");
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error("接続エラー:", error.message);
    return false;
  }
}

// 接続設定3：IPv4接続
async function testConnection3() {
  console.log("テスト3: IPv4接続");
  const url =
    "postgres://postgres:MjG5cDOWpp6oh3Qz@db.spdbplpiuonxajhcsmjy.supabase.co:5432/postgres";

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      },
    });

    await prisma.$connect();
    console.log("接続成功！");
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error("接続エラー:", error.message);
    return false;
  }
}

// 接続設定4：IPv4接続 (pgbouncer)
async function testConnection4() {
  console.log("テスト4: IPv4接続 (pgbouncer)");
  const url =
    "postgres://postgres:MjG5cDOWpp6oh3Qz@db.spdbplpiuonxajhcsmjy.supabase.co:6543/postgres";

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      },
    });

    await prisma.$connect();
    console.log("接続成功！");
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error("接続エラー:", error.message);
    return false;
  }
}

// 全ての接続をテスト
async function runTests() {
  console.log("Supabase接続テスト開始...\n");

  const results = [];

  results.push(await testConnection1());
  console.log("----------------------------\n");

  results.push(await testConnection2());
  console.log("----------------------------\n");

  results.push(await testConnection3());
  console.log("----------------------------\n");

  results.push(await testConnection4());
  console.log("----------------------------\n");

  console.log("テスト結果サマリー:");
  console.log("1. シェアードコネクションプーラー接続:", results[0] ? "成功" : "失敗");
  console.log("2. シェアードプーラー直接接続:", results[1] ? "成功" : "失敗");
  console.log("3. IPv4接続:", results[2] ? "成功" : "失敗");
  console.log("4. IPv4接続 (pgbouncer):", results[3] ? "成功" : "失敗");

  // 成功した接続がある場合、推奨設定を表示
  const successIndex = results.findIndex((result) => result === true);
  if (successIndex !== -1) {
    console.log("\n推奨設定:");
    switch (successIndex) {
      case 0:
        console.log(
          'DATABASE_URL="postgresql://postgres.spdbplpiuonxajhcsmjy:MjG5cDOWpp6oh3Qz@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"',
        );
        console.log(
          'DIRECT_URL="postgresql://postgres.spdbplpiuonxajhcsmjy:MjG5cDOWpp6oh3Qz@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"',
        );
        break;
      case 1:
        console.log(
          'DATABASE_URL="postgresql://postgres.spdbplpiuonxajhcsmjy:MjG5cDOWpp6oh3Qz@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"',
        );
        console.log(
          'DIRECT_URL="postgresql://postgres.spdbplpiuonxajhcsmjy:MjG5cDOWpp6oh3Qz@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"',
        );
        break;
      case 2:
        console.log(
          'DATABASE_URL="postgres://postgres:MjG5cDOWpp6oh3Qz@db.spdbplpiuonxajhcsmjy.supabase.co:5432/postgres"',
        );
        console.log(
          'DIRECT_URL="postgres://postgres:MjG5cDOWpp6oh3Qz@db.spdbplpiuonxajhcsmjy.supabase.co:5432/postgres"',
        );
        break;
      case 3:
        console.log(
          'DATABASE_URL="postgres://postgres:MjG5cDOWpp6oh3Qz@db.spdbplpiuonxajhcsmjy.supabase.co:6543/postgres"',
        );
        console.log(
          'DIRECT_URL="postgres://postgres:MjG5cDOWpp6oh3Qz@db.spdbplpiuonxajhcsmjy.supabase.co:5432/postgres"',
        );
        break;
    }
  } else {
    console.log(
      "\n全ての接続テストが失敗しました。Supabaseダッシュボードで接続情報を確認してください。",
    );
  }
}

runTests().catch((e) => {
  console.error("テスト実行エラー:", e);
});
