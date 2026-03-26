export interface Option {
  text: string;
  score: number; // 0-10 for each dimension
}

export interface Question {
  id: number;
  section: 'basic' | 'income' | 'expense' | 'asset';
  text: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  // 一、基础信息（4 题）
  {
    id: 1,
    section: 'basic',
    text: '你的年龄区间',
    options: [
      { text: '18–25 岁', score: 10 },
      { text: '25–30 岁', score: 10 },
      { text: '30–40 岁', score: 10 },
      { text: '40 岁以上', score: 10 },
    ],
  },
  {
    id: 2,
    section: 'basic',
    text: '你的当前状态',
    options: [
      { text: '职场上班族', score: 5 },
      { text: '自由职业', score: 7 },
      { text: '企业主', score: 10 },
      { text: '学生', score: 3 },
      { text: '已退休 / 半退休', score: 8 },
    ],
  },
  {
    id: 3,
    section: 'basic',
    text: '家庭抚养人数（需你负担开支的人数）',
    options: [
      { text: '仅自己', score: 10 },
      { text: '1 人', score: 8 },
      { text: '2 人', score: 6 },
      { text: '3 人及以上', score: 4 },
    ],
  },
  {
    id: 4,
    section: 'basic',
    text: '居住类型',
    options: [
      { text: '租房', score: 4 },
      { text: '自有住房无房贷', score: 10 },
      { text: '自有住房有房贷', score: 6 },
      { text: '与父母同住', score: 8 },
    ],
  },
  // 二、收入模块（8 题）
  {
    id: 5,
    section: 'income',
    text: '你每月主动收入（工资 / 劳务 / 主业）约？',
    options: [
      { text: '＜5000 元', score: 2 },
      { text: '5000–10000 元', score: 5 },
      { text: '10000–20000 元', score: 8 },
      { text: '20000 元以上', score: 10 },
    ],
  },
  {
    id: 6,
    section: 'income',
    text: '你每月被动收入（房租 / 股息 / 利息 / 版权 / 躺赚）约？',
    options: [
      { text: '0 元', score: 0 },
      { text: '1–1000 元', score: 3 },
      { text: '1000–5000 元', score: 7 },
      { text: '5000 元以上', score: 10 },
    ],
  },
  {
    id: 7,
    section: 'income',
    text: '你的收入稳定性？',
    options: [
      { text: '极不稳定（经常断流）', score: 0 },
      { text: '一般（偶尔波动）', score: 5 },
      { text: '稳定（每月固定）', score: 10 },
    ],
  },
  {
    id: 8,
    section: 'income',
    text: '你是否有第二收入来源？',
    options: [
      { text: '无', score: 0 },
      { text: '有（副业 / 兼职 / 投资）', score: 10 },
    ],
  },
  {
    id: 9,
    section: 'income',
    text: '被动收入占你总收入比例？',
    options: [
      { text: '0%', score: 0 },
      { text: '1%–20%', score: 3 },
      { text: '20%–50%', score: 7 },
      { text: '50% 以上', score: 10 },
    ],
  },
  {
    id: 10,
    section: 'income',
    text: '过去一年被动收入是否增长？',
    options: [
      { text: '没有，甚至下降', score: 0 },
      { text: '基本持平', score: 5 },
      { text: '小幅增长', score: 8 },
      { text: '明显增长', score: 10 },
    ],
  },
  {
    id: 11,
    section: 'income',
    text: '你的收入主要属于？',
    options: [
      { text: '单纯劳动收入（干就有不干就无）', score: 0 },
      { text: '劳动 + 少量资产收入', score: 4 },
      { text: '资产收入明显', score: 8 },
      { text: '以资产 / 被动收入为主', score: 10 },
    ],
  },
  {
    id: 12,
    section: 'income',
    text: '若停止工作，你的收入能维持多久？',
    options: [
      { text: '立刻归零', score: 0 },
      { text: '1–3 个月', score: 3 },
      { text: '3–12 个月', score: 7 },
      { text: '1 年以上', score: 10 },
    ],
  },
  // 三、支出模块（9 题）
  {
    id: 13,
    section: 'expense',
    text: '每月固定总支出占收入比例？',
    options: [
      { text: '＞80%', score: 0 },
      { text: '60%–80%', score: 3 },
      { text: '40%–60%', score: 7 },
      { text: '＜40%', score: 10 },
    ],
  },
  {
    id: 14,
    section: 'expense',
    text: '是否有高息负债（信用卡 / 网贷 / 消费贷）？',
    options: [
      { text: '有，且金额很高', score: 0 },
      { text: '有，但压力不大', score: 5 },
      { text: '无', score: 10 },
    ],
  },
  {
    id: 15,
    section: 'expense',
    text: '非必要支出（娱乐 / 冲动消费）占比？',
    options: [
      { text: '＞30%', score: 0 },
      { text: '15%–30%', score: 5 },
      { text: '＜15%', score: 10 },
    ],
  },
  {
    id: 16,
    section: 'expense',
    text: '每月是否有稳定结余？',
    options: [
      { text: '入不敷出', score: 0 },
      { text: '几乎无结余', score: 3 },
      { text: '有少量结余', score: 7 },
      { text: '稳定高结余', score: 10 },
    ],
  },
  {
    id: 17,
    section: 'expense',
    text: '房贷 / 房租占月支出比例？',
    options: [
      { text: '＞50%', score: 0 },
      { text: '30%–50%', score: 4 },
      { text: '15%–30%', score: 7 },
      { text: '＜15%', score: 10 },
    ],
  },
  {
    id: 18,
    section: 'expense',
    text: '教育 / 养育支出占月支出？',
    options: [
      { text: '无', score: 10 },
      { text: '＜15%', score: 8 },
      { text: '15%–30%', score: 5 },
      { text: '＞30%', score: 2 },
    ],
  },
  {
    id: 19,
    section: 'expense',
    text: '医疗 / 保险支出占月支出？',
    options: [
      { text: '＜5%', score: 10 },
      { text: '5%–15%', score: 8 },
      { text: '15%–30%', score: 5 },
      { text: '＞30%', score: 2 },
    ],
  },
  {
    id: 20,
    section: 'expense',
    text: '交通 / 车辆相关月支出？',
    options: [
      { text: '无', score: 10 },
      { text: '＜10%', score: 8 },
      { text: '10%–25%', score: 5 },
      { text: '＞25%', score: 2 },
    ],
  },
  {
    id: 21,
    section: 'expense',
    text: '年度大额支出（旅行 / 家电 / 红包）是否会冲击现金流？',
    options: [
      { text: '经常导致透支', score: 0 },
      { text: '有一定压力', score: 4 },
      { text: '基本可承受', score: 8 },
      { text: '完全无压力', score: 10 },
    ],
  },
  // 四、资产与负债模块（9 题）
  {
    id: 22,
    section: 'asset',
    text: '应急金可覆盖几个月支出？',
    options: [
      { text: '完全没有', score: 0 },
      { text: '够 1–3 个月', score: 5 },
      { text: '够 6 个月以上', score: 10 },
    ],
  },
  {
    id: 23,
    section: 'asset',
    text: '是否拥有生钱资产（基金 / 股票 / 房租 / 理财等）？',
    options: [
      { text: '无', score: 0 },
      { text: '有，小额', score: 5 },
      { text: '有，大额且稳定', score: 10 },
    ],
  },
  {
    id: 24,
    section: 'asset',
    text: '是否拥有耗钱资产（车贷 / 奢侈品 / 持续贬值）？',
    options: [
      { text: '很多，压力大', score: 0 },
      { text: '一般', score: 5 },
      { text: '很少 / 无', score: 10 },
    ],
  },
  {
    id: 25,
    section: 'asset',
    text: '生钱资产占总资产比例？',
    options: [
      { text: '0%', score: 0 },
      { text: '1%–30%', score: 3 },
      { text: '30%–60%', score: 7 },
      { text: '60% 以上', score: 10 },
    ],
  },
  {
    id: 26,
    section: 'asset',
    text: '总负债占总资产比例？',
    options: [
      { text: '＞70%', score: 0 },
      { text: '40%–70%', score: 3 },
      { text: '10%–40%', score: 7 },
      { text: '＜10%/ 无负债', score: 10 },
    ],
  },
  {
    id: 27,
    section: 'asset',
    text: '你的负债主要是？',
    options: [
      { text: '高息消费贷 / 信用卡', score: 0 },
      { text: '车贷 / 消费贷', score: 4 },
      { text: '房贷（低息）', score: 8 },
      { text: '无负债', score: 10 },
    ],
  },
  {
    id: 28,
    section: 'asset',
    text: '生钱资产能否覆盖月度总支出？',
    options: [
      { text: '完全不能', score: 0 },
      { text: '覆盖部分支出', score: 5 },
      { text: '基本覆盖', score: 8 },
      { text: '完全覆盖且盈余', score: 10 },
    ],
  },
  {
    id: 29,
    section: 'asset',
    text: '是否有系统性的投资 / 存钱计划？',
    options: [
      { text: '完全没有', score: 0 },
      { text: '偶尔存钱', score: 3 },
      { text: '有计划但执行差', score: 6 },
      { text: '有计划且稳定执行', score: 10 },
    ],
  },
  {
    id: 30,
    section: 'asset',
    text: '财务自由目标是否清晰？',
    options: [
      { text: '完全没有概念', score: 0 },
      { text: '有想法但不清晰', score: 4 },
      { text: '有目标但无路径', score: 7 },
      { text: '目标清晰 + 有执行路径', score: 10 },
    ],
  },
];
