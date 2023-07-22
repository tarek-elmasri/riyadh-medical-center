const CTA = () => {
  return (
    <div className="bg-indigo-800 p-20 text-center flex flex-col items-center gap-6">
      <h4 className="text-3xl text-white font-bold">احجز موعدك الآن</h4>
      <p className="text-white">لنقدم لك الرعاية الصحية المناسبة</p>
      <a
        href="/appointments"
        className="block p-3 bg-neutral-100 rounded-lg shadow-sm font-bold text-indigo-950 hover:bg-white"
      >
        حجز موعد
      </a>
    </div>
  );
};

export default CTA;
