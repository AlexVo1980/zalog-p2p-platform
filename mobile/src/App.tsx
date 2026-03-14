import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  Wallet, 
  User, 
  TrendingUp, 
  MapPin, 
  Sparkles, 
  ArrowUpRight, 
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState(1280450);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setBalance(prev => prev + Math.floor(Math.random() * 5));
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(val);
  };

  const deals = [
    { 
      id: 1, 
      loc: 'Хамовники, ЖК "Остоженка"', 
      rate: 22.5, 
      amount: '15.5M', 
      collected: 85,
      risk: 'Низкий',
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 2, 
      loc: 'Пресня, ул. 1905 года', 
      rate: 24.0, 
      amount: '8.2M', 
      collected: 45,
      risk: 'Средний',
      img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 3, 
      loc: 'Сочи, Морской порт', 
      rate: 21.5, 
      amount: '25M', 
      collected: 15,
      risk: 'Низкий',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' 
    },
  ];

  const isEmulatorMode = new URLSearchParams(window.location.search).get('mode') === 'emulator';

  const appContent = (
    <div className={`flex flex-col relative overflow-hidden bg-anthracite-dark pb-24 ${isEmulatorMode ? 'h-screen w-full' : 'h-full'}`}>
      
      {/* Header & Investor Profile */}
      <header className="px-6 pt-16 pb-6 space-y-6 bg-white/[0.02]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold to-gold-light p-[1px]">
               <div className="w-full h-full rounded-2xl bg-anthracite-dark flex items-center justify-center text-gold font-black text-lg">AV</div>
            </div>
            <div>
              <h2 className="text-white font-bold text-base leading-tight">Александр В.</h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gold/10 rounded-full border border-gold/20">
                <ShieldCheck className="w-2.5 h-2.5 text-gold" />
                <span className="text-[9px] text-gold font-bold uppercase tracking-wider">Квал. Инвестор</span>
              </div>
            </div>
          </div>
          <button className="p-3 bg-white/10 rounded-2xl">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 space-y-8 scrollbar-hide pt-4">
        
        {/* Main Balance Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 relative overflow-hidden bg-white/[0.05] border-white/20 shadow-2xl"
        >
          <div className="relative z-10 space-y-6">
            <div>
              <div className="text-[11px] text-white/80 uppercase font-bold tracking-[0.1em] mb-2">Общий капитал</div>
              <div className="text-4xl font-mono font-black text-white">{formatCurrency(balance)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
               <div>
                  <div className="text-[10px] text-white/60 uppercase font-bold mb-1 tracking-wider">Доход (YTD)</div>
                  <div className="text-xl font-mono font-bold text-emerald-400">+21.4%</div>
               </div>
               <div>
                  <div className="text-[10px] text-white/60 uppercase font-bold mb-1 tracking-wider">Сделок</div>
                  <div className="text-xl font-mono font-bold text-white">12</div>
               </div>
            </div>
            <button className="w-full py-4 bg-gold text-anthracite-dark rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-glow hover:scale-[1.02] transition-transform">Инвестировать</button>
          </div>
        </motion.div>

        {/* Neural Insights */}
        <div className="flex items-center gap-4 p-4 bg-gold/10 rounded-[1.5rem] border border-gold/20">
           <div className="p-2 bg-gold rounded-xl"><Sparkles className="w-4 h-4 text-anthracite-dark" /></div>
           <p className="text-[10px] text-white leading-tight font-bold">Нейронный интеллект Залог Про подтвердил 3 новых объекта с высокой ликвидностью.</p>
        </div>

        {/* Smart Feed: New Deals */}
        <section className="space-y-5">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-white">Лучшие предложения</h3>
            <div className="flex items-center gap-1 text-gold text-[10px] font-bold uppercase tracking-widest">
              Все <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
          
          <div className="space-y-4 pb-4">
            {deals.map(deal => (
              <motion.div 
                key={deal.id}
                whileTap={{ scale: 0.98 }}
                className="glass-card overflow-hidden border-white/10 bg-white/[0.04] shadow-lg"
              >
                <div className="flex p-4 gap-4">
                   <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                      <img src={deal.img} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-black/30" />
                   </div>
                   <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/70 uppercase font-bold tracking-tight">
                        <MapPin className="w-3 h-3 text-gold" /> {deal.loc}
                      </div>
                      <div className="text-xl font-mono font-bold text-white leading-none">{deal.amount}</div>
                      <div className="flex justify-between items-center">
                         <div className="text-base font-black text-gold">+{deal.rate}%</div>
                         <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${deal.risk === 'Низкий' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gold bg-gold/10 border border-gold/20'}`}>
                            {deal.risk} риск
                         </div>
                      </div>
                      {/* Progress bar */}
                      <div className="pt-1">
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${deal.collected}%` }} />
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* Bottom Navigation (Tab Bar) */}
      <nav className={`absolute bottom-6 inset-x-6 h-18 bg-[#1a1a1a]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] px-8 flex justify-between items-center z-[100] shadow-2xl ${isEmulatorMode ? 'bottom-8' : ''}`}>
        {[
          { id: 'home', icon: Home, label: 'Обзор' },
          { id: 'deals', icon: Search, label: 'Сделки' },
          { id: 'portfolio', icon: BarChart3, label: 'Активы' },
          { id: 'user', icon: User, label: 'Кабинет' },
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-gold scale-110' : 'text-white/40'}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[8px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );

  if (isEmulatorMode) {
    return appContent;
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-0 sm:p-8 font-sans">
      
      {/* Phone Frame Emulator */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-anthracite-dark sm:rounded-[3.5rem] shadow-[0_0_0_12px_#1a1a1a,0_0_0_14px_#2a2a2a,0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden sm:border-[8px] border-anthracite-dark">
        
        {/* iOS Status Bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex justify-between items-center px-8 z-[60] pointer-events-none">
           <div className="text-[12px] font-bold text-white">
             {currentTime.getHours()}:{currentTime.getMinutes().toString().padStart(2, '0')}
           </div>
           <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5 text-white" />
              <Wifi className="w-3.5 h-3.5 text-white" />
              <Battery className="w-4 h-4 text-white" />
           </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-3xl z-50 flex items-center justify-center">
           <div className="w-8 h-1 bg-white/10 rounded-full" />
        </div>

        {appContent}
      </div>

      {/* Floating Info Desk */}
      <div className="hidden xl:block fixed right-12 bottom-12 max-w-xs text-right">
         <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4 font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-white font-bold uppercase tracking-widest">Нейронный интеллект</span>
         </div>
         <h4 className="text-white font-black text-xl uppercase tracking-wider leading-tight">Mobile Interface <br/><span className="text-gold font-bold text-sm">ZALOG.PRO Technology</span></h4>
         <p className="text-sm text-white/60 mt-4 leading-relaxed font-medium">
           Полный контроль залоговых активов на базе нашей уникальной нейросети.
         </p>
      </div>

    </div>
  );
};

export default MobileApp;
