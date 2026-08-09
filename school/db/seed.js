/**
 * 任務 5：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require('./data-source')
const eclass = require('../entities/Class');
const grade = require('../entities/Grade');
const student = require('../entities/Student');
const subject = require('../entities/Subject');

/** 清空：被 FK 指著的表最後刪（GRADE 先刪，CLASS / SUBJECT 最後刪）。
 *  不用 clear()（TRUNCATE 會被 FK 擋）、不用 delete({})（TypeORM 拒絕空條件）。 */
async function clearAll() {
  const ORDER = [
    // TODO: 按「你的」FK 依賴順序填 entity name（先刪 Grade，再 Student，最後 Class / Subject）
      grade,student,subject,eclass
  ]
  for (const name of ORDER) {
    if (dataSource.hasMetadata(name)) {
      await dataSource.createQueryBuilder().delete().from(name).execute()
    }
  }
}

async function main() {
  await dataSource.initialize()
  await clearAll()

  // ================================================================================
  // TODO：依照任務內容的規格種資料（至少 2 班、2 科目、幾位學生、幾筆成績）
  //   1. 先種 CLASS / SUBJECT
  //   2. 再種 STUDENT（記得接上 class）
  //   3. 最後種 GRADE（記得接上 student + subject）
  //      關聯的接法：relation 屬性直接放前面存好的物件（TypeORM 會自動取出 id 填進外鍵），例如：
  //      studentRepo.save({ name: '...', class: 班級物件 })
  //      gradeRepo.save({ score: 95, student: 學生物件, subject: 科目物件 })
  // ================================================================================

  const classRepo = dataSource.getRepository('class')
  const subjectRepo = dataSource.getRepository('subject')
  const studentRepo = dataSource.getRepository('student')
  const gradeRepo = dataSource.getRepository('grade')

  const [class1,class2] = await classRepo.save([
    {name:'class1'},
    {name:'class2'}
  ])

  const [ math,art ] = await subjectRepo.save([
    {name:'數學'},
    {name:'藝術'}
  ])
  const  [student1,student2,student3,student4] = await studentRepo.save([
    {name:'小明',class:class2},
    {name:'小王',class:class1},
    {name:'大頭',class:class1},
    {name:'大腳',class:class2}
  ])
  await gradeRepo.save([
    {
      score:99,
      student:student1,
      subject:math
    },
    {
      score:98,
      student:student2,
      subject:math
    },
    {
      score:82,
      student:student2,
      subject:art
    },
    {
      score:50,
      student:student1,
      subject:art
    },
    {
      score:40,
      student:student3,
      subject:art
    },
    {
      score:70,
      student:student4,
      subject:art
    },
  ])

  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
