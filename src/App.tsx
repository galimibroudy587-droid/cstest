/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft,
  Trophy,
  AlertCircle,
  Zap,
  Target
} from 'lucide-react';
import { QUESTIONS, Question } from './data/questions';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AppState = 'welcome' | 'quiz' | 'result';

export default function App() {
  const [state, setState] = useState<AppState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleStart = () => setState('quiz');

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setState('result');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setState('welcome');
    }
  };

  const results = useMemo(() => {
    if (state !== 'result') return null;

    const sections = {
      basic: { total: 0, count: 0 },
      income: { total: 0, count: 0 },
      expense: { total: 0, count: 0 },
      asset: { total: 0, count: 0 },
    };

    QUESTIONS.forEach(q => {
      const score = answers[q.id] || 0;
      sections[q.section].total += score;
      sections[q.section].count += 1;
    });

    const radarData = [
      { subject: '基础稳健', A: (sections.basic.total / (sections.basic.count * 10)) * 100 },
      { subject: '收入结构', A: (sections.income.total / (sections.income.count * 10)) * 100 },
      { subject: '支出管理', A: (sections.expense.total / (sections.expense.count * 10)) * 100 },
      { subject: '资产质量', A: (sections.asset.total / (sections.asset.count * 10)) * 100 },
    ];

    const totalScore = Object.values(sections).reduce((acc, s) => acc + s.total, 0);
    const maxScore = QUESTIONS.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    // Determine Level
    let level = '赛跑层';
    let levelDesc = '你正在为金钱工作，虽然有收入，但一旦停止工作，生活将面临挑战。';
    let emotionalValue = '保持耐心，你已经意识到了财务结构的重要性，这是跳出老鼠赛跑的第一步。';
    
    const passiveIncomeCoverage = answers[28]; // Q28: 生钱资产能否覆盖月度总支出

    if (passiveIncomeCoverage === 10) {
      level = '顺流层';
      levelDesc = '恭喜！你已实现财务自由。你的被动收入完全覆盖了生活支出，你可以自由选择生活方式。';
      emotionalValue = '你是财务自由的先行者，金钱已经成为你的仆人而非主人。';
    } else if (passiveIncomeCoverage >= 8 || percentage > 80) {
      level = '平稳层';
      levelDesc = '你的财务状况非常稳健，被动收入已能覆盖大部分支出，距离自由仅一步之遥。';
      emotionalValue = '你已经掌握了财富的密码，现在的你充满了掌控感和安全感。';
    } else if (percentage < 40 || answers[14] === 0) {
      level = '逆流层';
      levelDesc = '警报！你的财务状况正处于逆流中。高负债或极低结余让你在风险面前非常脆弱。';
      emotionalValue = '暂时的困境是成长的契机。正视负债，重新梳理现金流，你一定能逆流而上。';
    }

    return { radarData, percentage, level, levelDesc, emotionalValue, sections };
  }, [state, answers]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <AnimatePresence mode="wait">
        {state === 'welcome' && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md glass-card rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="rich-dad-gradient p-12 text-center text-white">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="inline-block p-4 bg-white/10 rounded-2xl mb-6"
              >
                <TrendingUp size={48} className="text-rich-gold" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2 tracking-tight">财富流财商测试</h1>
              <p className="text-white/70 text-sm">3分钟完成个人财务健康体检</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Wallet size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="输入你的昵称" 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rich-purple focus:border-transparent outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-center text-gray-400">
                  * 本测试严格遵循《穷爸爸富爸爸》核心逻辑
                </p>
              </div>

              <button 
                onClick={handleStart}
                className="w-full rich-dad-gradient text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                开启财商体检 <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {state === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="h-2 bg-gray-100">
              <motion.div 
                className="h-full bg-rich-purple"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="text-sm font-bold text-rich-purple bg-rich-purple/10 px-3 py-1 rounded-full">
                  {currentQuestionIndex + 1} / {QUESTIONS.length}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-tight">
                {QUESTIONS[currentQuestionIndex].text}
              </h2>

              <div className="grid gap-4">
                {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(QUESTIONS[currentQuestionIndex].id, option.score)}
                    className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-rich-purple hover:bg-rich-purple/5 transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-rich-purple group-hover:text-white flex items-center justify-center text-sm font-bold transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-rich-purple transition-colors">
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {state === 'result' && results && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="rich-dad-gradient p-10 text-center text-white relative">
              <div className="absolute top-6 right-6 opacity-20">
                <Trophy size={120} />
              </div>
              <h2 className="text-xl font-medium text-white/70 mb-2">你的财商体检报告</h2>
              <div className="text-6xl font-black mb-4 tracking-tighter">
                {Math.round(results.percentage)}<span className="text-2xl ml-1 opacity-50">分</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                <Zap size={18} className="text-rich-gold" />
                <span className="font-bold">当前等级：{results.level}</span>
              </div>
            </div>

            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <section>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                    <PieChart size={20} className="text-rich-purple" />
                    思维雷达
                  </h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results.radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          name="FQ"
                          dataKey="A"
                          stroke="#4c1d95"
                          fill="#4c1d95"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <section className="bg-rich-purple/5 p-6 rounded-3xl border border-rich-purple/10">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-rich-purple mb-3">
                    <ShieldCheck size={20} />
                    情绪价值评价
                  </h3>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{results.emotionalValue}"
                  </p>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target size={20} className="text-rich-purple" />
                    维度深度解析
                  </h3>
                  <div className="grid gap-4">
                    <DimensionCard 
                      title="收入结构" 
                      score={results.radarData[1].A} 
                      desc={results.radarData[1].A > 70 ? '被动收入占比高，具备初步自由基因。' : '高度依赖主动收入，需警惕断流风险。'} 
                    />
                    <DimensionCard 
                      title="支出管理" 
                      score={results.radarData[2].A} 
                      desc={results.radarData[2].A > 70 ? '现金流管控极佳，结余率高。' : '固定支出过重，非必要消费需精简。'} 
                    />
                    <DimensionCard 
                      title="资产质量" 
                      score={results.radarData[3].A} 
                      desc={results.radarData[3].A > 70 ? '生钱资产占比大，财富正在自动增值。' : '耗钱资产过多，资产负债表需瘦身。'} 
                    />
                  </div>
                </section>

                <section className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle size={20} className="text-rich-purple" />
                    总结性建议
                  </h3>
                  <div className="text-gray-600 text-sm space-y-4 leading-relaxed">
                    <p>{results.levelDesc}</p>
                    <div className="p-4 bg-white rounded-xl border border-gray-200">
                      <p className="font-bold text-rich-purple mb-1">实操建议：</p>
                      {results.level === '逆流层' && (
                        <p>立刻停止任何非必要消费，优先偿还高息负债。例如：将每月的奶茶、外卖支出转化为应急金储备。</p>
                      )}
                      {results.level === '赛跑层' && (
                        <p>开始构建你的“生钱资产”。例如：每月固定将结余的20%投入到低风险指数基金或学习一项能产生版权收入的技能。</p>
                      )}
                      {results.level === '平稳层' && (
                        <p>优化资产配置，提高生钱资产的收益率。例如：将闲置资金从低息存款转向更具成长性的资产组合。</p>
                      )}
                      {results.level === '顺流层' && (
                        <p>关注财富传承与社会价值。例如：通过设立家族信托或参与公益事业，让财富流向更有意义的地方。</p>
                      )}
                    </div>
                  </div>
                </section>

                <button 
                  onClick={() => window.location.reload()}
                  className="w-full py-4 rounded-2xl border-2 border-rich-purple text-rich-purple font-bold hover:bg-rich-purple hover:text-white transition-all"
                >
                  重新测试
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DimensionCard({ title, score, desc }: { title: string, score: number, desc: string }) {
  return (
    <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-700">{title}</span>
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-md",
          score > 70 ? "bg-green-100 text-green-700" : score > 40 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
        )}>
          {Math.round(score)}%
        </span>
      </div>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}
