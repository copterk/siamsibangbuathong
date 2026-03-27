import React, { useState, useEffect } from 'react';

// Fortune Data with Categories and Assets — ใช้รูปจริงจาก Links/
const fortuneData = [
  { id: 1, title: "บัวพ้นน้ำ", category: "การงาน", color: "bg-[#FF007A]", textColor: "text-white", asset: "https://lh3.googleusercontent.com/d/1SsR29vLzX1IXSU09mar-_50U2JEH7I7n", text: "ชีวิตช่วงนี้เปรียบเหมือนดอกบัวพ้นน้ำรับอรุณ ผลให้การเงินไหลมาเทมาไม่ขาดสาย อีกทั้งมีการงานราบรื่นเพราะมีผู้ใหญ่เอ็นดูคอยประคองส่ง เกณฑ์พบคนใจบุญเข้ามาเกื้อกูลกันในด้านความรัก" },
  { id: 2, title: "บัวคู่บุญ", category: "การเงิน", color: "bg-[#FFEA00]", textColor: "text-ci-dark", asset: "https://lh3.googleusercontent.com/d/1s0WhclSGVj__sYpiPjcpRZqwmrkHR2BG", text: "พลังแห่งมิตรภาพนำพาความสำเร็จมาให้ งานที่ต้องร่วมแรงร่วมใจจะเสร็จไวและได้ผลดีเกินคาด การเงินมีโชคลาภจากคนใกล้ชิด ส่วนความรักหวานชื่นเหมือนน้ำเย็นรดตัวช้าง คนโสดมีเกณฑ์พบคนจริงใจ" },
  { id: 3, title: "บัวรออรุณ", category: "สุขภาพ", color: "bg-[#0070FF]", textColor: "text-white", asset: "https://lh3.googleusercontent.com/d/10OiN0dNEP-1uD41xIcVefu-j15f-iIh7", text: "ช่วงนี้ต้องใช้ความอดทนรอคอยเหมือนบัวที่ค่อยๆ เติบโต แม้การงานจะดูนิ่งไปบ้างแต่ขอให้ใจเย็นและประหยัดอดออมไว้ก่อน เพราะลาภใหญ่กำลังเดินทางมาหา ในด้านความรักต้องใช้ความเข้าใจสยบความใจร้อน" },
  { id: 4, title: "บัวกลางแกร่ง", category: "ความรัก", color: "bg-[#FF007A]", textColor: "text-white", asset: "https://lh3.googleusercontent.com/d/1FM1sf7I_ejrbhipZ6Cc5FlnCpjlyA4Hr", text: "แม้งานในช่วงนี้จะหนักและเหนื่อยแต่ผลลัพธ์คุ้มค่าแน่นอน ความพยายามส่งผลให้การเงินหมุนเวียนได้ทันท่วงที ส่วนความรักต้องอาศัยการจับมือกันให้แน่นเพื่อก้าวผ่านอุปสรรคไปสู่ความมั่นคงร่วมกัน" },
  { id: 5, title: "บัวรับโชค", category: "มิตรสหาย", color: "bg-[#FFEA00]", textColor: "text-ci-dark", asset: "https://lh3.googleusercontent.com/d/1GzF5rHX1AeUqsnA9TPq3nRNh5VhjvziT", text: "เป็นช่วงเวลาแห่งวาสนา ใหญ่พูนทวีเข้ากระเป๋า การงานได้รับโอกาสทองแบบไม่คาดฝันส่งผลให้มีเกณฑ์ได้รับเงินก้อน ในด้านเสน่ห์เปี่ยมเมตตาจนมีคนอยากเข้ามาอาสาดูแลหัวใจให้พองโต" },
  { id: 6, title: "บัวใสกระจ่าง", category: "การเดินทาง", color: "bg-[#0070FF]", textColor: "text-white", asset: "https://lh3.googleusercontent.com/d/1_DVisW-DagWa-s-0q9hg6UqkLZLImQii", text: "เรื่องร้ายกำลังจะกลายเป็นดี ปัญหางานที่ค้างคาคลี่คลายเพราะมีคนดีเข้ามาช่วยชี้ทาง การเงินเริ่มฟื้นตัวมีกำไรให้ชื่นใจ ส่วนความรักที่เคยขุ่นมัวจะกลับมาใสสะอาดและเข้าใจกันดีเหมือนน้ำในสระบัว" },
  { id: 7, title: "บัวนิ่งสงบ", category: "การงาน", color: "bg-[#FF007A]", textColor: "text-white", asset: "https://lh3.googleusercontent.com/d/1gJM1Cu0fg_k1dePdtodZxnqlIzXP9Q6I", text: "ความสำเร็จขึ้นอยู่กับสติและการวางตัว การงานต้องรอบคอบไม่หลงเชื่อข่าวลือ การเงินประคองตัวไปได้ด้วยความพอดี ส่วนเรื่องความรักต้องหนักแน่นในคำสัญญา ไม่ปล่อยให้เสียงรอบข้างมาสั่นคลอนความเชื่อใจ" },
  { id: 8, title: "บัวบารมี", category: "การเงิน", color: "bg-[#FFEA00]", textColor: "text-ci-dark", asset: "https://lh3.googleusercontent.com/d/1T4pCVtLktunCEFXsXkvBAW-JSk9ed-8B", text: "การเงินมั่นคงมีกินมีใช้ บุญกุศลหนุนนำให้ชื่อเสียงโดดเด่นและมีคนยอมรับในฝีมือการทำงาน ครอบครัวมีความรักความเข้าใจและเหลือเฟือแบบไม่ขัดสน ในด้านหัวใจเป็นที่รักของคนรอบข้าง อยู่กันพร้อมหน้าพร้อมตา" },
  { id: 9, title: "บัวเปลี่ยนกระถาง", category: "สุขภาพ", color: "bg-[#0070FF]", textColor: "text-white", asset: "https://lh3.googleusercontent.com/d/19w3Vdw2pviGl1m0sY75QoUqm2uTULjl9", text: "เตรียมรับการเปลี่ยนแปลงที่ดี มีเกณฑ์โยกย้ายงานไปสู่ตำแหน่งที่สูงขึ้นหรือที่ที่ดีกว่าเดิม การเงินมีช่องทางใหม่ๆ ให้เก็บเกี่ยวรายได้ ส่วนความรักจะได้เริ่มต้นความสัมพันธ์ที่สดใสและทำให้หัวใจกลับมามีความสุข" },
  { id: 10, title: "บัวสวรรค์", category: "ความรัก", color: "bg-[#FF007A]", textColor: "text-white", asset: "https://lh3.googleusercontent.com/d/1rIsarN9gQdrj_B-F3rK2EUvaGhG2o19_", text: "ชีวิตถึงจุดที่สมบูรณ์พูนสุข การงานสำเร็จเส็จสิ้นตามที่หวังไว้ทุกประการส่งผลให้มั่งคั่งร่ำรวยเป็นเศรษฐี ผู้ใจบุญ ส่วนความรักลงตัวและมีความสุขที่สุด เปรียบเหมือนได้พักผ่อนในสวนบัวที่เงียบสงบและงดงาม" }
];

const App = () => {
  const [appState, setAppState] = useState('LOADING'); // LOADING, SELECTION, SHAKING, RESULT
  const [selectedId, setSelectedId] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);

  const handleSelect = (id) => {
    setSelectedId(id);
    setAppState('SHAKING');
  };

  // Preload all images on app start
  useEffect(() => {
    if (appState === 'LOADING') {
      const imagesToPreload = [
        'https://lh3.googleusercontent.com/d/1j3XybSC-7DXS9afm9APi0NX8mlDntkS-',
        'https://lh3.googleusercontent.com/d/1Alk7LL2R7LT-B2QmGbGbX4_MPVlCAAE8',
        'https://lh3.googleusercontent.com/d/1BXcEu8enzbjqVDk8bUs3ZtptKKm6TXp2',
        ...fortuneData.map(f => f.asset),
      ];
      let loaded = 0;
      const promises = imagesToPreload.map(src =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => { loaded++; setLoadProgress(Math.round((loaded / imagesToPreload.length) * 100)); resolve(); };
          img.onerror = () => { loaded++; setLoadProgress(Math.round((loaded / imagesToPreload.length) * 100)); resolve(); };
          img.src = src;
        })
      );
      Promise.all(promises).then(() => {
        // Ensure minimum 2 seconds of loading animation for UX
        setTimeout(() => setAppState('SELECTION'), 1500);
      });
    }
  }, []);

  useEffect(() => {
    if (appState === 'SHAKING') {
      const timer = setTimeout(() => {
        setAppState('RESULT');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const resetGame = () => {
    setSelectedId(null);
    setAppState('SELECTION');
  };

  const currentFortune = fortuneData.find(f => f.id === selectedId);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#FF007A] flex flex-col shadow-2xl relative overflow-hidden select-none" style={{ fontFamily: "'Sao Chingcha', sans-serif" }}>

      {/* Background Image - พื้นหลังยับๆ สีชมพู (หน้าแรก) */}
      {(appState === 'SELECTION' || appState === 'LOADING') && (
        <div className="absolute inset-0 z-0">
          <img src="https://lh3.googleusercontent.com/d/1j3XybSC-7DXS9afm9APi0NX8mlDntkS-" alt="background" className="w-full h-full object-cover" />
        </div>
      )}

      {/* State 0: Loading / Splash Screen — same style as SHAKING */}
      {appState === 'LOADING' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-[#FF007A] animate-fade-in relative overflow-hidden z-10" style={{ background: 'linear-gradient(180deg, #CC0062 0%, #FF007A 40%, #CC0062 100%)' }}>
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,234,0,0.3)_0%,transparent_60%)] animate-pulse"></div>
          {/* Thai pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `repeating-conic-gradient(from 45deg, transparent 0deg 90deg, rgba(255,234,0,0.3) 90deg 180deg)`,
            backgroundSize: '30px 30px'
          }}></div>

          {/* Sparkle particles */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="sparkle" style={{
                position: 'absolute',
                left: `${15 + Math.random() * 70}%`,
                top: `${10 + Math.random() * 60}%`,
                width: '6px', height: '6px',
                background: '#FFEA00',
                borderRadius: '50%',
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 8px 2px rgba(255,234,0,0.6)'
              }}></div>
            ))}
          </div>

          {/* กระบอกเซียมซี + ไม้ */}
          <div className="relative z-20 siamsi-container">
            {/* ไม้เซียมซีที่โผล่ออกมา */}
            <div className="absolute -top-16 left-1/2 flex gap-[3px] -translate-x-1/2">
              <div className="siamsi-stick" style={{ height: '100px', animationDelay: '0s', transform: 'rotate(-12deg)' }}>
                <div className="w-[6px] h-full bg-gradient-to-b from-[#F5DEB3] via-[#DEB887] to-[#D2B48C] rounded-t-full shadow-md relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="siamsi-stick" style={{ height: '120px', animationDelay: '0.1s', transform: 'rotate(-5deg)' }}>
                <div className="w-[6px] h-full bg-gradient-to-b from-[#F5DEB3] via-[#DEB887] to-[#D2B48C] rounded-t-full shadow-md relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="siamsi-stick" style={{ height: '140px', animationDelay: '0.15s', transform: 'rotate(-1deg)' }}>
                <div className="w-[7px] h-full bg-gradient-to-b from-[#FFEA00] via-[#FFD700] to-[#DAA520] rounded-t-full shadow-lg relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/30 rounded-full"></div>
                </div>
              </div>
              <div className="siamsi-stick" style={{ height: '110px', animationDelay: '0.05s', transform: 'rotate(6deg)' }}>
                <div className="w-[6px] h-full bg-gradient-to-b from-[#F5DEB3] via-[#DEB887] to-[#D2B48C] rounded-t-full shadow-md relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="siamsi-stick" style={{ height: '95px', animationDelay: '0.2s', transform: 'rotate(10deg)' }}>
                <div className="w-[6px] h-full bg-gradient-to-b from-[#F5DEB3] via-[#DEB887] to-[#D2B48C] rounded-t-full shadow-md relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* กระบอกเซียมซี */}
            <div className="w-36 h-56 relative animate-shake">
              {/* ตัวกระบอก */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] via-[#CC0000] to-[#8B0000] rounded-t-[20px] rounded-b-[60px] border-4 border-[#D4AF37] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-r from-[#D4AF37] via-[#FFEA00] to-[#D4AF37] rounded-t-[16px] border-b-2 border-[#8B6914]"></div>
                <div className="absolute inset-x-0 bottom-8 h-3 bg-gradient-to-r from-[#D4AF37] via-[#FFEA00] to-[#D4AF37] opacity-80"></div>
                <div className="absolute top-8 right-4 w-4 h-[60%] bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#FFEA00]/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#D4AF37]/50 mt-4">
                    <span className="text-[#FFEA00] text-lg font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wider">เซียมซี</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <h2 className="mt-12 text-4xl font-black text-[#FFEA00] drop-shadow-[0_4px_0_#8B0000] tracking-[0.15em] relative z-20">🙏 เซียมซี 🙏</h2>
          <p className="mt-3 text-white/90 text-lg font-bold relative z-20">กำลังเตรียมใบเซียมซี...</p>

          {/* Loading dots */}
          <div className="flex gap-2 mt-4 z-20">
            <div className="w-3 h-3 bg-[#FFEA00] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-[#FFEA00] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-3 h-3 bg-[#FFEA00] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      )}

      {/* State 1: Selection */}
      {appState === 'SELECTION' && (
        <div className="flex-grow flex flex-col relative animate-fade-in overflow-y-auto z-10">

          {/* Thai Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `repeating-conic-gradient(from 45deg, transparent 0deg 90deg, rgba(255,234,0,0.3) 90deg 180deg)`,
            backgroundSize: '30px 30px'
          }}></div>

          {/* Hero Character Section */}
          <div className="relative z-10 flex flex-col items-center pt-8 pb-4 px-6">
            <div className="w-72 h-72 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,234,0,0.3)_0%,transparent_70%)] animate-pulse rounded-full"></div>
              <img
                src="https://lh3.googleusercontent.com/d/1Alk7LL2R7LT-B2QmGbGbX4_MPVlCAAE8"
                alt="ช้างบัวบุญ"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          {/* Title Banner */}
          <div className="relative z-20 mx-auto w-[260px] -mt-10 mb-6">
            <div
              className="bg-[#2755B8] p-[6px] relative"
              style={{ clipPath: 'polygon(18px 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 18px 100%, 0 50%)' }}
            >
              <div
                className="bg-[#FFF200] p-[4px]"
                style={{ clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0 50%)' }}
              >
                <div
                  className="bg-[#E91D63] px-3 py-2 pb-3 flex flex-col items-center justify-center"
                  style={{ clipPath: 'polygon(11px 0, calc(100% - 11px) 0, 100% 50%, calc(100% - 11px) 100%, 11px 100%, 0 50%)' }}
                >
                  <h1 className="text-3xl font-black text-[#FFE600] text-center leading-tight tracking-[0.05em]" style={{ textShadow: '2px 2px 0 #4a0000', fontFamily: "'Sao Chingcha', sans-serif" }}>
                    คำทำนาย
                  </h1>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <img src="https://lh3.googleusercontent.com/d/1BXcEu8enzbjqVDk8bUs3ZtptKKm6TXp2" alt="flower" className="w-[20px] h-[20px] object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                    <h2 className="text-[34px] font-black text-[#FFE600] text-center leading-none tracking-wide" style={{ textShadow: '2px 2px 0 #4a0000', fontFamily: "'Sao Chingcha', sans-serif" }}>
                      บัวบุญ
                    </h2>
                    <img src="https://lh3.googleusercontent.com/d/1BXcEu8enzbjqVDk8bUs3ZtptKKm6TXp2" alt="flower" className="w-[20px] h-[20px] object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Number Selection - Horizontal Bar Style (matching screenshot) */}
          <div className="px-6 pb-4 relative z-10 flex-grow">
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => handleSelect(num)}
                  className="w-full h-14 bg-gradient-to-r from-[#8B0000] via-[#CC0000] to-[#8B0000] rounded-lg flex items-center justify-center shadow-[0_4px_0_#4a0000,inset_0_1px_2px_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none transition-all border-2 border-[#D4AF37] relative overflow-hidden group">
                  {/* Decorative ends */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[#D4AF37] text-lg">❧</div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#D4AF37] text-lg scale-x-[-1]">❧</div>
                  <span className="text-2xl font-black text-[#FFEA00] group-hover:scale-110 transition-transform drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{num}</span>
                </button>
              ))}
            </div>
          </div>
          {/* 
          <footer className="p-6 text-center text-white/40 text-xs font-bold tracking-widest uppercase relative z-10">
            สถานีสุขที่บางบัวทอง © 2026
          </footer> */}
        </div>
      )}

      {/* State 2: เขย่าเซียมซี */}
      {appState === 'SHAKING' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-[#FF007A] animate-fade-in relative overflow-hidden z-10" style={{ background: 'linear-gradient(180deg, #CC0062 0%, #FF007A 40%, #CC0062 100%)' }}>
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,234,0,0.3)_0%,transparent_60%)] animate-pulse"></div>
          {/* Thai pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `repeating-conic-gradient(from 45deg, transparent 0deg 90deg, rgba(255,234,0,0.3) 90deg 180deg)`,
            backgroundSize: '30px 30px'
          }}></div>

          {/* Sparkle particles */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="sparkle" style={{
                position: 'absolute',
                left: `${15 + Math.random() * 70}%`,
                top: `${10 + Math.random() * 60}%`,
                width: '6px', height: '6px',
                background: '#FFEA00',
                borderRadius: '50%',
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 8px 2px rgba(255,234,0,0.6)'
              }}></div>
            ))}
          </div>

          {/* กระบอกเซียมซี + ไม้ */}
          <div className="relative z-20 siamsi-container">
            {/* ไม้เซียมซีที่โผล่ออกมา */}
            <div className="absolute -top-16 left-1/2 flex gap-[3px] -translate-x-1/2">
              {/* ไม้หลายอัน โผล่ออกมาจากกระบอก */}
              <div className="siamsi-stick" style={{ height: '100px', animationDelay: '0s', transform: 'rotate(-12deg)' }}>
                <div className="w-[6px] h-full bg-gradient-to-b from-[#F5DEB3] via-[#DEB887] to-[#D2B48C] rounded-t-full shadow-md relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="siamsi-stick" style={{ height: '120px', animationDelay: '0.1s', transform: 'rotate(-5deg)' }}>
                <div className="w-[6px] h-full bg-gradient-to-b from-[#F5DEB3] via-[#DEB887] to-[#D2B48C] rounded-t-full shadow-md relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="siamsi-stick siamsi-stick-pop" style={{ height: '150px', animationDelay: '0.15s', transform: 'rotate(-1deg)' }}>
                <div className="w-[7px] h-full bg-gradient-to-b from-[#FFEA00] via-[#FFD700] to-[#DAA520] rounded-t-full shadow-lg relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/30 rounded-full"></div>
                  {/* หมายเลข บนไม้ */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[#8B0000] text-[8px] font-black">{selectedId}</div>
                </div>
              </div>
              <div className="siamsi-stick" style={{ height: '110px', animationDelay: '0.05s', transform: 'rotate(6deg)' }}>
                <div className="w-[6px] h-full bg-gradient-to-b from-[#F5DEB3] via-[#DEB887] to-[#D2B48C] rounded-t-full shadow-md relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="siamsi-stick" style={{ height: '95px', animationDelay: '0.2s', transform: 'rotate(10deg)' }}>
                <div className="w-[6px] h-full bg-gradient-to-b from-[#F5DEB3] via-[#DEB887] to-[#D2B48C] rounded-t-full shadow-md relative">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* กระบอกเซียมซี */}
            <div className="w-36 h-56 relative animate-shake">
              {/* ตัวกระบอก - ทรงกระบอกไม้ไผ่ */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] via-[#CC0000] to-[#8B0000] rounded-t-[20px] rounded-b-[60px] border-4 border-[#D4AF37] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                {/* ลวดลายบนกระบอก */}
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-r from-[#D4AF37] via-[#FFEA00] to-[#D4AF37] rounded-t-[16px] border-b-2 border-[#8B6914]"></div>
                <div className="absolute inset-x-0 bottom-8 h-3 bg-gradient-to-r from-[#D4AF37] via-[#FFEA00] to-[#D4AF37] opacity-80"></div>
                {/* Shiny highlight */}
                <div className="absolute top-8 right-4 w-4 h-[60%] bg-white/10 rounded-full blur-sm"></div>
                {/* ตัวอักษร "เซียมซี" */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#FFEA00]/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#D4AF37]/50 mt-4">
                    <span className="text-[#FFEA00] text-lg font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wider">เซียมซี</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <h2 className="mt-12 text-4xl font-black text-[#FFEA00] drop-shadow-[0_4px_0_#8B0000] tracking-[0.15em] relative z-20">🙏 เขย่าเซียมซี 🙏</h2>
          <p className="mt-3 text-white/90 text-lg font-bold relative z-20">กำลังหาคำทำนายของท่าน...</p>

          {/* Loading dots */}
          <div className="flex gap-2 mt-4 z-20">
            <div className="w-3 h-3 bg-[#FFEA00] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-[#FFEA00] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-3 h-3 bg-[#FFEA00] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      )}

      {/* State 3: Result - แสดงรูปใบเซียมซีจริง */}
      {appState === 'RESULT' && currentFortune && (
        <div className="flex-grow flex flex-col bg-[#FF007A] animate-fade-in select-text z-10" style={{ background: 'linear-gradient(180deg, #FF007A 0%, #CC0062 50%, #FF007A 100%)' }}>

          {/* Thai Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: `repeating-conic-gradient(from 45deg, transparent 0deg 90deg, rgba(255,234,0,0.3) 90deg 180deg)`,
            backgroundSize: '30px 30px'
          }}></div>

          {/* Title Banner at top */}
          <div className="relative z-10 mx-4 mt-4 mb-3">
            <div className="bg-gradient-to-r from-[#D4AF37] via-[#FFEA00] to-[#D4AF37] px-6 py-2 rounded-xl border-3 border-[#8B6914] shadow-[0_4px_0_#8B6914] flex items-center justify-center gap-2">
              <span className="text-[#FF007A] text-lg font-black">❀ คำทำนายบัวบุญ ❀</span>
            </div>
          </div>

          {/* Fortune Card Image Frame */}
          <div className="px-4 relative z-10 flex-grow flex flex-col">
            <div className="border-[8px] border-[#FFEA00] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(0,0,0,0.2)] relative bg-[#FF007A] flex-grow flex flex-col">

              {/* Decorative corner ornaments */}
              <div className="absolute top-3 left-3 text-white/40 text-2xl z-20">✿</div>
              <div className="absolute top-3 right-3 text-white/40 text-2xl z-20">✿</div>
              <div className="absolute bottom-3 left-3 text-white/40 text-2xl z-20">✿</div>
              <div className="absolute bottom-3 right-3 text-white/40 text-2xl z-20">✿</div>

              {/* The actual fortune card image */}
              <div className="flex-grow flex items-center justify-center p-4">
                <img
                  src={currentFortune.asset}
                  alt={`ใบเซียมซี ${currentFortune.title}`}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-2xl shadow-2xl"
                />
              </div>

              {/* Fortune Text Section */}
              <div className="px-5 pb-5 pt-2 text-center">
                <h3 className="text-[#FFEA00] text-2xl font-black mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  " {currentFortune.title} "
                </h3>
                <p className="text-white text-sm font-bold leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  {currentFortune.text}
                </p>
              </div>

              {/* Card number badge */}
              <div className="flex justify-center pb-4">
                <div className="bg-[#FFEA00] px-5 py-1 rounded-full shadow-md">
                  <span className="text-[#FF007A] font-black text-xs tracking-widest">หมายเลข: {currentFortune.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons (Below Card) */}
          <div className="px-4 py-6 flex flex-col gap-3 relative z-10 mb-8">
            <button
              onClick={async () => {
                try {
                  // Fetch the image as a Blob to force download instead of open-in-tab
                  const response = await fetch(currentFortune.asset);
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);

                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `bua-boon-fortune-${currentFortune.id}.jpg`;
                  document.body.appendChild(link);
                  link.click();

                  // Cleanup
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                } catch (error) {
                  console.error("Download failed, using fallback", error);
                  const link = document.createElement('a');
                  link.href = currentFortune.asset;
                  link.download = `bua-boon-fortune-${currentFortune.id}.jpg`;
                  link.target = "_blank";
                  link.click();
                }
              }}
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#FFEA00] to-[#D4AF37] text-[#FF007A] py-4 rounded-2xl font-black text-xl shadow-[0_6px_0_#8B6914] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 border-2 border-[#8B6914] animate-pulse-slow"
            >
              📥 ดาวน์โหลดคำทำนาย
            </button>
          </div>
        </div>
      )}

      {/* Global CSS */}
      <style>{`
        @font-face {
          font-family: 'Sao Chingcha';
          src: url('/fonts/SaoChingcha-Regular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          15% { transform: rotate(-8deg) translateX(-8px); }
          30% { transform: rotate(6deg) translateX(6px); }
          45% { transform: rotate(-10deg) translateX(-12px); }
          60% { transform: rotate(8deg) translateX(10px); }
          75% { transform: rotate(-4deg) translateX(-5px); }
          90% { transform: rotate(3deg) translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out infinite;
        }
        /* ไม้เซียมซี กระดอนขึ้นลง */
        .siamsi-stick {
          animation: stickBounce 0.3s ease-in-out infinite alternate;
          transform-origin: bottom center;
        }
        @keyframes stickBounce {
          0% { transform: translateY(0) var(--stick-rotate, rotate(0deg)); }
          100% { transform: translateY(-12px) var(--stick-rotate, rotate(0deg)); }
        }
        .siamsi-stick:nth-child(1) { animation-delay: 0s; }
        .siamsi-stick:nth-child(2) { animation-delay: 0.08s; }
        .siamsi-stick:nth-child(3) { animation-delay: 0.16s; }
        .siamsi-stick:nth-child(4) { animation-delay: 0.04s; }
        .siamsi-stick:nth-child(5) { animation-delay: 0.12s; }
        /* ไม้ทอง โผล่ขึ้นมาเด่น */
        .siamsi-stick-pop {
          animation: stickPop 0.8s ease-out forwards, stickGlow 1s ease-in-out infinite alternate 0.8s;
        }
        @keyframes stickPop {
          0% { transform: translateY(80px) rotate(-1deg); opacity: 0; }
          60% { transform: translateY(-20px) rotate(-1deg); opacity: 1; }
          80% { transform: translateY(5px) rotate(-1deg); }
          100% { transform: translateY(0) rotate(-1deg); opacity: 1; }
        }
        @keyframes stickGlow {
          0% { filter: brightness(1) drop-shadow(0 0 4px rgba(255,234,0,0.5)); }
          100% { filter: brightness(1.3) drop-shadow(0 0 12px rgba(255,234,0,0.9)); }
        }
        /* Sparkle particles */
        .sparkle {
          animation: sparkleAnim 1.5s ease-in-out infinite;
        }
        @keyframes sparkleAnim {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0); }
          50% { opacity: 1; transform: scale(1.5) translateY(-10px); }
        }
        /* กระบอก เขย่า */
        .siamsi-container {
          animation: containerTilt 0.5s ease-in-out infinite alternate;
        }
        @keyframes containerTilt {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
      `}
      </style>

    </div>
  );
};

export default App;
