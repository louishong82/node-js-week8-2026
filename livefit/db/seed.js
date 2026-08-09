/**
 * 任務 4：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require('./data-source')

/** 清空：被 FK 指著的表最後刪（先刪 COURSE，再 USER / SKILL）。
 *  不用 clear()（TRUNCATE 會被 FK 擋）、不用 delete({})（TypeORM 拒絕空條件）。 */
async function clearAll() {
  for (const name of ['Course', 'User', 'Skill']) {
    if (dataSource.hasMetadata(name)) {
      await dataSource.createQueryBuilder().delete().from(name).execute()
    }
  }
}

async function main() {
  await dataSource.initialize()
  await clearAll()

  // ======================================================================
  // TODO：依照任務內容的規格寫入資料
  //   1. SKILL 三筆：重訓、瑜珈、飛輪
  //   2. USER 兩位教練，role 都為 'COACH'：
  //      海格教練（coach1@livefit.tw）、小美教練（coach2@livefit.tw）
  //   3. COURSE 四堂課：肌力入門班、週末飛輪、晨間瑜珈、核心特訓
  //      每堂課記得接上教練跟技能
  //      關聯的接法：user / skill 直接放前面存好的教練、技能物件
  //     （TypeORM 會自動取出它的 id 填進外鍵），寫法範例：
  //      courseRepo.save({ name: '...', user: 教練物件, skill: 技能物件 })
  // ======================================================================
  const courseRepo = dataSource.getRepository('Course')
  const userRepo = dataSource.getRepository('User')
  const skillRepo = dataSource.getRepository('Skill')

  const [weightTraining, yoga , cycling] = await skillRepo.save([
    {name:'重訓'},
    {name:'瑜珈'},
    {name:'飛輪'}
  ])

  const [coach1,coach2]=await userRepo.save([
    {
      name:'海格教練',
      email:'coach1@livefit.tw',
      role:'COACH',
    },
    {
      name:'小美教練',
      email:'coach2@livefit.tw',
      role:'COACH',
    }
  ])
  await courseRepo.save([
    {
      name:'肌力入門班',
      description:'適合新手的基礎訓練課程，教你正確姿勢與肌肉的運用',
      start_at:'2026-08-12 18:00:00',
      end_at:'2026-08-12 19:00:00',
      max_participants:8,
      user:coach1,
      skill:weightTraining
    },
    {
      name:'週末飛輪',
      description:'高速有氧，揮灑汗水',
      start_at:'2026-08-12 19:00:00',
      end_at:'2026-08-12 20:00:00',
      max_participants:22,
      user:coach2,
      skill:cycling
    },
    {
      name:'晨間瑜珈',
      description:'喚醒身體的晨間伸展與呼吸練習',
      start_at:'2026-08-12 06:00:00',
      end_at:'2026-08-12 07:00:00',
      max_participants:5,
      user:coach2,
      skill:yoga
    },
    {
      name:'核心特訓',
      description:'針對核心肌群加強訓練',
      start_at:'2026-08-12 21:00:00',
      end_at:'2026-08-12 22:00:00',
      max_participants:12,
      user:coach1,
      skill:weightTraining
    }
  ])

  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
